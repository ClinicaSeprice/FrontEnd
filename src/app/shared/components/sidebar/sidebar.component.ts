import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../../auth/services/auth.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() isVisible = true;
  @Output() closeSidebar = new EventEmitter<void>();
  //@Output() userLogin = new EventEmitter<void>();

  buttonText = "Iniciar Sesión";
  private destroy$ = new Subject<void>();//para descruscripcion

  constructor(private authService: AuthService) { 
    //this.updateButtonText();
  }

  ngOnInit() {
    //this.updateButtonText();
    // this.authSubscription = this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
    //   this.buttonText = isAuthenticated ? 'Cerrar Sesión' : 'Iniciar Sesión'
    // });
    this.authService.isAuthenticated$.pipe(takeUntil(this.destroy$))
    .subscribe((isAuthenticated) => {
      this.buttonText = isAuthenticated ? 'Cerrar Sesión' : 'Iniciar Sesión';
    });
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

  // updateButtonText() {
  //   this.buttonText = this.authService.isAuthenticated() ? 'Cerrar sesión' : 'Iniciar sesión';
  //   //this.userLogin.emit();
  // }

  logout() {
    if (this.authService.isAuthenticated()) {
      this.authService.logout();
    }
    //this.updateButtonText();
    return this.closeSidebar.emit();
  }
}