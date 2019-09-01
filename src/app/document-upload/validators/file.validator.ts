import { AbstractControl, ValidatorFn } from '@angular/forms';
const allowedExtensions = ['png', 'jpg', 'jpe', 'jpeg', 'tiff', 'pdf', 'bmp'];

const some = Array.prototype.some;
const map = Array.prototype.map;
export class FileValidator {
    constructor() { }
    public static extensions(extensions = allowedExtensions): ValidatorFn {
        return (control: AbstractControl) => {
            const files = control.value;
            const fileExtensions = files && files.length
                ? map.call(files, file => file.name.split('.').pop())
                : '';
            if (
                fileExtensions &&
                fileExtensions.some(ext => extensions.indexOf(ext.toLowerCase()) === -1
            )) {
                return { invalidExtension: true };
            }
            return null;
        };
    }
    public static maxSize(maxSize = 9): ValidatorFn {
        return (control: AbstractControl) => {
            const files = control.value;
            const allowedSize = maxSize * 1024 * 1024;
            if (
                files &&
                files.length &&
                some.call(files, file => file.size > allowedSize)
            ) {
                return {
                    invalidSize: {
                        size: maxSize
                    }
                };
            }
            return null;
        };
    }
}
