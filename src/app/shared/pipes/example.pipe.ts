import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'example',
  standalone: true
})
export class ExamplePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
