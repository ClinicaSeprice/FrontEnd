import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteInitComponent } from "./shared/components/flowbite-init.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FlowbiteInitComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Clinica';
}
