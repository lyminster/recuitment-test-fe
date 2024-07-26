import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    if (this.authService.getAuthStatus()) {
      this.router.navigate(['/home']);
    }
  }

  onLogin() {
    if (!this.authService.login(this.username, this.password)) {
      this._snackBar.open('Username Or Password is Incorrect', 'Ok', {
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    }
  }
}
