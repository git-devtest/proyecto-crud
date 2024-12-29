//shared/navbar/navbar.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpen = false;
  userName: string = '';
  private userSubscription?: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();
    if (user) {
      this.userName = user.nombre;
    }

    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user) {
        this.userName = user.nombre;
      }
    });
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}