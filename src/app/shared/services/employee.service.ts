import { Injectable, signal } from '@angular/core';
import { IEmployee } from '../interfaces/employee.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employees: IEmployee[] = [];
  public employeeState = signal<IEmployee[]>([]);

  public totalRow = signal<number>(10);
  public currentPage = signal<number>(0);

  constructor() {
    this.generateDummyData();
  }

  resetEmployeeState() {
    this.employeeState.set([]);
  }

  changeCurrentPage(currentPage: number) {
    this.currentPage.set(currentPage);
  }

  generateDummyData() {
    for (let i = 0; i < 100; i++) {
      this.employees.push({
        username: `user${i}`,
        firstName: `First${i}`,
        lastName: `Last${i}`,
        email: `user${i}@example.com`,
        birthDate: new Date(),
        basicSalary: 10000 + i,
        status: 'Active',
        group: `Group 1`,
        description: new Date(),
      });
    }
    this.employeeState.set(this.employees);
  }

  addEmployee(employee: IEmployee) {
    this.employeeState.update((state) => {
      return [...state, employee];
    });
  }

  updateEmployee(employee: IEmployee) {
    this.employeeState.update((state) => {
      return [
        ...state.map((x) => (x.username === employee.username ? employee : x)),
      ];
    });
  }

  removeEmployee(employee: IEmployee) {
    this.employeeState.update((state) => {
      return [...state.filter((x) => x.username != employee.username)];
    });
  }
}
