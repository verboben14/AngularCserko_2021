import { Inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indexMapper'
})
export class IndexMapperPipe implements PipeTransform {

  constructor(
    @Inject(String) private valueMap: string[]
  ) {

  }

  transform(value: number, valueMap?: string[]): string | number {
    if (typeof value !== 'number') {
      return value;
    }
    valueMap = valueMap || this.valueMap;

    return valueMap[value];
  }

}
