import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { TraineeData } from '../trainee-data';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Filter } from '../filter';
import { TraineeDataService } from '../trainee-data.service';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrl: './data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataComponent implements OnInit, AfterViewInit  {
  filter: string = '';
  displayedColumns: string[] = ['id', 'name', 'date', 'grade', 'subject'];
  trainees: TraineeData[] = [];
  dataSource = new MatTableDataSource<TraineeData>(this.trainees);
  showAddTrainee: boolean = false;
  traineeDetails?: TraineeData;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private traineeService: TraineeDataService) {    
  }

  ngOnInit() {
    this.trainees = this.traineeService.getTraineeData();
    this.dataSource = new MatTableDataSource<TraineeData>(this.trainees);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

//מעבר על רשימת החניכים ובדיקה האם עומדים בתנאי הפילטרים 
  applyFilters(filters: Filter) {
    this.dataSource.data = this.trainees.filter(trainee => {
      return (!filters.ids?.length || filters.ids?.includes(trainee.id)) &&
      (!filters.name || trainee.name.toLowerCase().includes(filters.name.toLowerCase())) &&
      (!filters.dateFrom || new Date(trainee.dateJoined) >= new Date(filters.dateFrom)) &&
      (!filters.dateTo || new Date(trainee.dateJoined) <= new Date(filters.dateTo)) &&
      (!filters.gradeMin || parseFloat(trainee.grade) >= parseFloat(filters.gradeMin)) &&
      (!filters.gradeMax || parseFloat(trainee.grade) <= parseFloat(filters.gradeMax)) &&
      (!filters.subject || trainee.subject.toLowerCase().includes(filters.subject.toLowerCase()));
    });
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //אתחול רשימת החניכים בלחיצה על אתחול הפילטרים
  resetFilters() {
    this.dataSource.data = this.trainees;
  }

  //הוספת חניך לרשימת החניכים ועדכון הטבלה
  addTrainee(trainee: TraineeData) {
    const index = this.trainees.findIndex(trainee => trainee.id === this.traineeDetails?.id);
    if (index !== -1) {
      this.trainees[index] = trainee;
    } else {
      this.trainees.push(trainee);
    }
    this.dataSource.data = this.trainees; // עדכון נתוני הטבלה
  }

  //הסתרה / הצגה של טופס הוספת חניך
  toggleAddForm() {
    this.showAddTrainee = !this.showAddTrainee;
    this.traineeDetails = undefined;
  }

  // פונקציה לטיפול באירוע הוספת ושמירת חניך מהטופס
  onTraineeAdded(trainee: TraineeData) {
    this.addTrainee(trainee);
    this.toggleAddForm(); // סגירת הטופס אחרי שמירה
  }

  //פתיחת פרטי שורה בטבלה
  openRowDetails(trainee: TraineeData) {
    this.traineeDetails = trainee;
    this.showAddTrainee = true;
  }

  //מחיקת חניך שפרטיו פתוחים
  removeTrainee() {
    const index = this.trainees.findIndex(trainee => trainee.id === this.traineeDetails?.id);
    index !== -1 && this.trainees.splice(index, 1);   
    this.dataSource.data = this.trainees;
    this.traineeDetails = undefined; 
    this.showAddTrainee = false;
  }
}
