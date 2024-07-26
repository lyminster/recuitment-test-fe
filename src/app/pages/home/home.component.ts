import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private authService: AuthService, private router: Router) {
    if (!this.authService.getAuthStatus()) {
      this.router.navigate(['/login']);
    }
  }
}
