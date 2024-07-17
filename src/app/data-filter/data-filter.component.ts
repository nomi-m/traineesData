import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TraineeDataService } from '../trainee-data.service';
import { TraineeData } from '../trainee-data';

@Component({
  selector: 'app-data-filter',
  templateUrl: './data-filter.component.html',
  styleUrls: ['./data-filter.component.scss']
})
export class DataFilterComponent implements OnInit {
  @Input() fromMonitorPage = false;
  @Input() fromAnalysisPage = false;
  @Output() filtersApplied = new EventEmitter<any>();
  @Output() filtersReset = new EventEmitter<void>();
  filterForm!: FormGroup;
  trainees: TraineeData[] = [];

  //אתחול טופס הפילטרים בכניסה לעמוד
  constructor(private formBuilder: FormBuilder, private traineeDataService: TraineeDataService) {
    this.filterForm = this.formBuilder.group({
      ids: [[]],
      name: [''],
      dateFrom: [''],
      dateTo: [''],
      gradeMin: [''],
      gradeMax: [''],
      subject: [''],
      showPassed: [true],
      showFailed: [true],
      subjects: [[]]
    });
  }

  ngOnInit() {
    this.trainees = this.traineeDataService.getTraineeData();
  }

  // מופעל בלחיצה על סינון, שליחת אוביקט הסינון לאבא
  applyFilters() {
    this.filtersApplied.emit(this.filterForm.value);
  }

  // אתחול הפילטרים
  resetFilters() {
    this.filterForm.reset();
    this.filtersReset.emit();
  }

  //בדיקה אם התבצע שינוי בפילטרים, אם לא- כפתור הסינון יהיה לא זמין ללחיצה
  hasChanged(form: FormGroup): boolean {
    return Object.keys(form.controls).some(controlName => form.get(controlName)?.dirty);
  }
}
