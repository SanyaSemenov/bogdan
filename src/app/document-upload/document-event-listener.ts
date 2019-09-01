import { Injectable, NgZone } from '@angular/core';
@Injectable()
export class DocumentEventListener {
    public isDragEventSet: boolean;
    constructor(private ngZone: NgZone) {
    }
    private _preventHandler(event): void {
        event.preventDefault();
    }
    public setDragListener() {
        if (this.isDragEventSet) {
            return;
        }
        this.ngZone.runOutsideAngular(() => {
            document.addEventListener('dragover', this._preventHandler, false);
            document.addEventListener('drop', this._preventHandler);
        });
        this.isDragEventSet = true;
    }
    public unsetDragListener() {
        this.ngZone.runOutsideAngular(() => {
            document.removeEventListener('dragover', this._preventHandler, false);
            document.removeEventListener('drop', this._preventHandler);
        });
        this.isDragEventSet = false;
    }
}
