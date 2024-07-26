import { Component, effect } from '@angular/core';
import { IEmployee } from '../../shared/interfaces/employee.interface';
import { EmployeeService } from '../../shared/services/employee.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ComfirmComponent } from '../../shared/component/comfirm/comfirm.component';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSnackBarModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent {
  employees: IEmployee[] = [];
  pageNumbers: number[] = [];

  constructor(
    public employeeService: EmployeeService,
    private _auth: AuthService,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this.employees = this.employeeService
      .employeeState()
      .slice(
        this.employeeService.currentPage() * this.employeeService.totalRow(),
        this.employeeService.currentPage() * this.employeeService.totalRow() +
          this.employeeService.totalRow(),
      );
    this.pageNumbers = Array(
      Math.ceil(this.employeeService.employeeState().length / 10),
    )
      .fill(0)
      .map((x, i) => i + 1);
  }

  private _employeeListEffect = effect(() => {
    this.employees = this.employeeService
      .employeeState()
      .slice(
        this.employeeService.currentPage() * this.employeeService.totalRow(),
        this.employeeService.currentPage() * this.employeeService.totalRow() +
          this.employeeService.totalRow(),
      );
  });

  editEmployee(employee: IEmployee) {
    this._router.navigate(['/edit-employee', employee.username]);
  }

  viewEmployee(employee: IEmployee) {
    this._router.navigate(['/employee-detail', employee.username]);
  }

  deleteEmployee(employee: IEmployee) {
    this._dialog
      .open(ComfirmComponent)
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.employeeService.removeEmployee(employee);
          this._snackBar.open('Employee Deleted !', 'Ok', {
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        }
      });
  }

  setCurrentPage(pageNumber: number) {
    this.employeeService.changeCurrentPage(pageNumber);
  }

  logout() {
    this._auth.logout();
  }
}
