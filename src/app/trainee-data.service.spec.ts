import { TestBed } from '@angular/core/testing';
import { TraineeDataService } from './trainee-data.service';
import { TraineeData } from './trainee-data';

describe('TraineeDataService', () => {
  let service: TraineeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraineeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct trainee data', () => {
    const traineeData: TraineeData[] = service.getTraineeData();
    expect(traineeData.length).toBe(12);
    expect(traineeData[0].id).toBe('1');
    expect(traineeData[0].name).toBe('nomi');
    expect(traineeData[1].grade).toBe('98');
  });
});
