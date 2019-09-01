import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileName'
})
export class FileNamePipe implements PipeTransform {

  transform(files: File[]): any {
    if (!files || !files.length) {
      return null;
    }

    return Array.prototype.map.call(files, x => x.name);
  }

}
