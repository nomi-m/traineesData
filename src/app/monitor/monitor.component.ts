import { Component, OnInit } from '@angular/core';
import { TraineeDataService } from '../trainee-data.service';
import { TraineeData } from '../trainee-data';
import { Filter } from '../filter';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent implements OnInit {
  trainees: TraineeData[] = [];
  dataSource = new MatTableDataSource<TraineeData>(this.trainees);
  displayedColumns: string[] = ['id', 'name', 'grade'];

  constructor(private traineeDataService: TraineeDataService) {}

  ngOnInit() {
    this.trainees = this.traineeDataService.getTraineeData();
    this.dataSource = new MatTableDataSource<TraineeData>(this.trainees);
  }

  //בדיקה אם הציון עובר, כדי לתת חיווי מתאים לשורה בטבלה
  isPassed(grade: string): boolean {
    return parseFloat(grade) >= 65;
  }

  //עדכון הטבלה בהתאם לפילטרים שנבחרו בלחיצה על סינון
  applyFilters(filters: Filter) {   
    this.dataSource.data = this.trainees.filter(trainee => {
      const idPassesFilter = !filters.ids?.length || filters.ids?.includes(trainee.id);
      const passedPassesFilter = filters.showPassed && parseFloat(trainee.grade) >= 65;
      const failedPassesFilter = filters.showFailed && parseFloat(trainee.grade) < 65;
      return idPassesFilter && (passedPassesFilter || failedPassesFilter);
    });
  }

  //אתחול הטבלה בלחיצה על אתחול הפילטרים
  resetFilters() {
    this.dataSource.data = this.trainees;
  }
}
