import { Component } from '@angular/core';
import { CalendarComponent } from "../calendar/calendar.component";

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent {

}
