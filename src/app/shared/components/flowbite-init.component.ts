import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../services/flowbite.service';

@Component({
  selector: 'app-flowbite-init',
  standalone: true,
  imports: [],
  template: ``,
  styles: ``,
  providers: [FlowbiteService] 
})
export class FlowbiteInitComponent implements OnInit {
  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(flowbite => {
      console.log('Flowbite loaded globally', flowbite);
    });
  }
}
