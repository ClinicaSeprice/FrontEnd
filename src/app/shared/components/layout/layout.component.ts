import { Component, signal } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [FooterComponent, RouterOutlet, RouterModule, SidebarComponent, NavbarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isSidebarVisible = signal(false);

  toggleSidebar() {
      this.isSidebarVisible.update((SidebarVisible) => !SidebarVisible);
  }

}
