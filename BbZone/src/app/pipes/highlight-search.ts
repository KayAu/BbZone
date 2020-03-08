import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'highlight'
})
export class HighlightSearchPipe implements PipeTransform {
  public transform(value: any, searchKey: string) {

    if (!searchKey) { return value; }
    var re = new RegExp(searchKey, 'gi'); //'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
    return value.replace(re, "<mark>" + searchKey + "</mark>");

  }
}
