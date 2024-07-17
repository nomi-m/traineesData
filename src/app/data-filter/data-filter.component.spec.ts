import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DataFilterComponent } from './data-filter.component';
import { TraineeDataService } from '../trainee-data.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const filters = {
  ids: ['1', '2'],
  name: 'aaa',
  dateFrom: new Date('2023-01-01'),
  dateTo: new Date('2023-12-31'),
  gradeMin: '80',
  gradeMax: '100',
  subject: 'Math',
  showPassed: true,
  showFailed: false,
  subjects: ['Math', 'Science']
}
 
describe('DataFilterComponent', () => {
  let component: DataFilterComponent;
  let fixture: ComponentFixture<DataFilterComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataFilterComponent ],
      imports: [ ReactiveFormsModule, MatFormFieldModule, MatSelectModule,
        MatCheckboxModule, BrowserAnimationsModule 
        ],
      providers: [ TraineeDataService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataFilterComponent);
    component = fixture.componentInstance;
    component.filterForm.setValue(filters);
    component.fromMonitorPage = true;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit filtersApplied event on applyFilters()', () => {
    spyOn(component.filtersApplied, 'emit');
    component.applyFilters();
    expect(component.filtersApplied.emit).toHaveBeenCalledWith(component.filterForm.value);
  });

  it('should return true if any form control is dirty', () => {
    component.filterForm.get('name')?.setValue('bbb');
    const result = component.hasChanged(component.filterForm);
    expect(result).toBeTrue();
  });

  it('should reset filter form and emit filtersReset event', () => {
    spyOn(component.filtersReset, 'emit');
    component.resetFilters();
    expect(component.filtersReset.emit).toHaveBeenCalled();
  });
})