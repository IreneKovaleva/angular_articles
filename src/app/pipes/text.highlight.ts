import { Pipe, PipeTransform } from '@angular/core';

@Pipe({standalone: true, name: 'highlight'})
export class HighlightPipe implements PipeTransform {
  transform(value: string, searchValue: string): string {
    if (!searchValue || searchValue=== '') {
      return value;
    }

    const searchWords = searchValue.trim().split(/\s+/);
    let replacedValue = value;

    searchWords.forEach(word => {
      if (word !== '') {
        const regex = new RegExp(`\\b${word}\\b`, 'gi');
        replacedValue = replacedValue.replace(regex, match => `<mark>${match}</mark>`);
      }
    });
    return replacedValue;
  }
}
