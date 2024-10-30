// src/app/services/flowbite.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FlowbiteService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  loadFlowbite(callback: (flowbite: any) => void) {
    if (isPlatformBrowser(this.platformId)) {
      import('flowbite').then(flowbite => {
        callback(flowbite);
      });
    }
  }
}

