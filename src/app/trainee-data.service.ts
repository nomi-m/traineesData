import { Injectable } from '@angular/core';
import { TraineeData } from './trainee-data';

@Injectable({
  providedIn: 'root'
})
export class TraineeDataService {
  traineeData: TraineeData[] = [
    {id: '1', name: 'nomi', grade: '100', email: 'nomi@gmail.com', dateJoined: new Date(2023, 11, 12), city: 'jerusalem', subject: 'Math'},
    {id: '2', name: 'david', grade: '98', email: 'david@gmail.com', dateJoined: new Date(2024, 1, 23), city: 'tel aviv', subject: 'Science'},
    {id: '3', name: 'nomi', grade: '90', email: 'nomi@gmail.com', dateJoined: new Date(2023, 7, 1), city: 'modiin', subject: 'Math'},
    {id: '4', name: 'efi', grade: '70', email: 'efi@gmail.com', dateJoined: new Date(2023, 7, 5), city: 'tel aviv', subject: 'sport'},
    {id: '5', name: 'shaul', grade: '53', email: 'shaul@gmail.com', dateJoined: new Date(2022, 12, 29), city: 'haifa', subject: 'sport'},
    {id: '6', name: 'sara', grade: '99', email: 'sara@gmail.com', dateJoined: new Date(2023, 9, 4), city: 'raanana', subject: 'music'},
    {id: '7', name: 'yosi', grade: '100', email: 'yosi@gmail.com', dateJoined: new Date(2024, 2, 21), city: 'jerusalem', subject: 'algabra'},
    {id: '8', name: 'efi', grade: '99', email: 'efi@gmail.com', dateJoined: new Date(2024, 6, 6), city: 'modiin', subject: 'geometric'},
    {id: '9', name: 'sara', grade: '89', email: 'sara@gmail.com', dateJoined: new Date(2021, 4, 14), city: 'beer sheva', subject: 'Math'},
    {id: '10', name: 'david', grade: '88', email: 'david@gmail.com', dateJoined: new Date(2024, 6, 28), city: 'lapid', subject: 'history'},
    {id: '11', name: 'nomi', grade: '91', email: 'nomi@gmail.com', dateJoined: new Date(2022, 10, 10), city: 'ofakim', subject: 'geographic'},
    {id: '12', name: 'tamar', grade: '98', email: 'tamar@gmail.com', dateJoined: new Date(2023, 9, 19), city: 'sderot', subject: 'algabra'},
  ];

  constructor() {}

  getTraineeData(): TraineeData[] {
    return this.traineeData;
  }
}
