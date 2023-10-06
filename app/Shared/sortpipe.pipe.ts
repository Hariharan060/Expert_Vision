import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(array: any[], sortOrder: string = 'asc', property: string = 'id'): any[] {
    if (!Array.isArray(array)) {
      return array;
    }

    const sortedArray = array.slice(); // Create a copy of the array to avoid modifying the original

    sortedArray.sort((a, b) => {
      const valueA = a[property];
      const valueB = b[property];

      if (valueA === valueB) {
        return 0;
      }
      if (sortOrder === 'asc') {
        return valueA < valueB ? -1 : 1; // Ascending order
      } else if (sortOrder === 'desc') {
        return valueA > valueB ? -1 : 1; // Descending order
      } else {
        return 0; // Invalid sort order, return unsorted array
      }
    });

    return sortedArray;
  }

}
