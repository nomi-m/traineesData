import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TraineeData } from '../trainee-data';
import { TraineeDataService } from '../trainee-data.service';
import { Filter } from '../filter';
import { Chart } from 'chart.js/auto';
import { CdkDragDrop, moveItemInArray, CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {
  trainees!: TraineeData[];
  filteredTrainees: TraineeData[] = [];
  showBottomChart = false;
  visibleCharts = [
    { id: 'averageGradesOverTime', title: 'Average Grades Over Time' },
    { id: 'studentGrades', title: 'Student Grades' },
    { id: 'averageGradesBySubject', title: 'Average Grades By Subject' }
  ];
  @ViewChild('chartElement') chartElement!: ElementRef;
  
  constructor(private traineeDataService: TraineeDataService) {}

  ngOnInit() {
    this.trainees = this.traineeDataService.getTraineeData();
    this.filteredTrainees = [...this.trainees];
    this.initCharts();
  }

  //הפעלת סינון ועדכון התרשימים לאחר הסינון
  applyFilters(filters: Filter) {
    this.filteredTrainees = this.trainees.filter(trainee => {
      return (!filters.ids?.length || filters.ids?.includes(trainee.id)) && 
             (!filters.subjects?.length || filters.subjects?.includes(trainee.subject));
    });
    this.updateCharts();
  }

  //אתחול הסינון ועדכון התרשימים לאחר מכן
  resetFilters() {
    this.filteredTrainees = [...this.trainees];
    this.updateCharts();
  }

  //אתחול התרשימים לפי ספריית chart.js
  initCharts() {
    this.initChart1();
    this.initChart2();
    this.initChart3();
    this.updateCharts();
  }

  initChart1() {
     // תרשים 1: ציונים לפי תאריכים
     new Chart('averageGradesOverTime', {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Average Grade Over Time',
          data: [],
          borderColor: 'blue',
          fill: false
        }]
      }
    });
  }

  initChart2() {
    // תרשים 2: ציונים לפי תלמידים
    new Chart('studentGrades', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Grades',
          data: [],
          backgroundColor: 'green'
        }]
      }
    });
  }

  initChart3() {
    // תרשים 3: ממוצע ציונים לפי מקצוע
    new Chart('averageGradesBySubject', {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          label: 'Average Grade by Subject',
          data: [],
          backgroundColor: 'orange'
        }]
      }
    });
  }

  //עדכון התרשימים וחיושב הלוגיקות לכל תרשים לפי התוצאות שחזרו מהסינון
  updateCharts() {
    const chart1 = Chart.getChart('averageGradesOverTime');
    const chart2 = Chart.getChart('studentGrades');
    const chart3 = Chart.getChart('averageGradesBySubject');
    // חישוב הציונים לכל תלמיד לפי התאריכים 
    if (chart1) {
      const dates: string[] = [];
      const grades: number[] = [];
      this.filteredTrainees.forEach(trainee => {
        dates.push(trainee.dateJoined.toISOString().split('T')[0]);
        grades.push(parseFloat(trainee.grade));
      });
      chart1.data.labels = dates;
      chart1.data.datasets[0].data = grades;
      chart1.update();
    }
    // הצגת ציונים של כל תלמיד
    if (chart2) {
      const names: string[] = [];
      const grades: number[] = [];
      this.filteredTrainees.forEach(trainee => {
        names.push(trainee.name);
        grades.push(parseFloat(trainee.grade));
      });
      chart2.data.labels = names;
      chart2.data.datasets[0].data = grades;
      chart2.update();
    }
    // חישוב ממוצע ציונים עבור כל מקצוע
    if (chart3) {
      const subjectGrades: { [key: string]: number[] } = {};
      this.filteredTrainees.forEach(trainee => {
        if (!subjectGrades[trainee.subject]) {
          subjectGrades[trainee.subject] = [];
        }
        subjectGrades[trainee.subject].push(parseFloat(trainee.grade));
      });
      const subjects = Object.keys(subjectGrades);
      const averageGrades = subjects.map(subject => {
        const grades = subjectGrades[subject];
        const total = grades.reduce((sum, grade) => sum + grade, 0);
        return total / grades.length;
      });
      chart3.data.labels = subjects;
      chart3.data.datasets[0].data = averageGrades;
      chart3.update();
    }
  }

  //פעולת הגרירה והחלפת מיקומי התרשימים
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.visibleCharts, event.previousIndex, event.currentIndex);
  }
}
