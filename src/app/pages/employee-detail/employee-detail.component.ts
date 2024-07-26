import { Component } from '@angular/core';
import { IEmployee } from '../../shared/interfaces/employee.interface';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EmployeeService } from '../../shared/services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss',
})
export class EmployeeDetailComponent {
  employee!: IEmployee;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
  ) {}

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username');
    this.employee = this.employeeService
      .employeeState()
      .find((emp) => emp.username === username)!;
  }
}
