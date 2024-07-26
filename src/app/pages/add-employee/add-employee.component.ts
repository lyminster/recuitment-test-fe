import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EmployeeService } from '../../shared/services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from '../../shared/interfaces/employee.interface';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent {
  employeeForm!: FormGroup;
  groups: string[] = [
    'Group 1',
    'Group 2',
    'Group 3',
    'Group 4',
    'Group 5',
    'Group 6',
    'Group 7',
    'Group 8',
    'Group 9',
    'Group 10',
  ];

  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.employeeForm = this.fb.group({
      username: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      birthDate: [''],
      basicSalary: [0],
      status: [''],
      group: [''],
      description: [''],
    });
  }

  ngOnInit(): void {
    const username = this.route.snapshot.paramMap.get('username') ?? '';
    if (username) {
      this.isEditMode = true;
      const emp = this.employeeService
        .employeeState()
        .find((emp) => emp.username === username)!;

      console.log(emp);
      if (emp) {
        this.employeeForm.patchValue({
          ...emp,
          birthDate: new Date(emp.birthDate).toISOString().substring(0, 10), // format for date input
        });
      }
    }
  }

  onSave() {
    if (this.isEditMode) {
      this.employeeService.updateEmployee(this.employeeForm.getRawValue());
    } else {
      this.employeeService.addEmployee(this.employeeForm.getRawValue());
    }

    this.router.navigate(['/employee-list']);
  }

  onCancel() {
    this.router.navigate(['/employee-list']);
  }
}
