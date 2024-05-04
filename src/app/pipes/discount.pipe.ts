import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount',
  standalone: true
})
export class DiscountPipe implements PipeTransform {

  transform(value:any, ...args: unknown[]):number {
    if (value.discountPercentage)
      { 
            return Math.round(value.price - (value.price * value.discountPercentage / 100)) 
      }else{ 
         return value.price
      }
  }

}
