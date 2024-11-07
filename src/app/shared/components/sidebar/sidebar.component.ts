import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @Input() isVisible = true;
  @Output() closeSidebar = new EventEmitter<void>();
  
  buttonText: string | undefined;

  constructor(private authService: AuthService) { 
    this.updateButtonText();
  }

  ngOnInit() {
    this.updateButtonText();
  }

  updateButtonText() {
    this.buttonText = this.authService.isAuthenticated() ? 'Cerrar sesión' : 'Iniciar sesión';
  }

  logout() {
    if (this.authService.isAuthenticated()) {
      this.authService.logout();
    }
    this.updateButtonText();
    return this.closeSidebar.emit();
  }
}
