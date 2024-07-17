import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TraineeData } from '../trainee-data';

@Component({
  selector: 'app-add-trainee',
  templateUrl: './add-trainee.component.html',
  styleUrl: './add-trainee.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddTraineeComponent implements OnInit {
  @Input() editTrainee?: TraineeData;
  @Output() traineeAdded = new EventEmitter<TraineeData>();
  traineeForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    //אתחול הטופס בערכי החניך לעריכה, במקרה שלחצנו על שורה בטבלה
    //במקרה שהגענו לטופס בלחיצה על הוספת חניך, הטופס יאותחל בערכים ריקים
    this.traineeForm = this.formBuilder.group({
      id: [this.editTrainee?.id, Validators.required],
      name: [this.editTrainee?.name, Validators.required],
      grade: [this.editTrainee?.grade, Validators.required],
      email: [this.editTrainee?.email, [Validators.required, Validators.email]],
      dateJoined: [this.editTrainee?.dateJoined, Validators.required],
      city: [this.editTrainee?.city, Validators.required],
      subject: [this.editTrainee?.subject, Validators.required]
    });
  }

  //בלחיצה על שמירה מופעל אירוע שמירת הטופס והטופס מאותחל
  onSubmit(): void {
    if (this.traineeForm.valid) {
      const newTrainee: TraineeData = this.traineeForm.value as TraineeData;
      this.traineeAdded.emit(newTrainee);
      this.traineeForm.reset();
    }
  }
}
