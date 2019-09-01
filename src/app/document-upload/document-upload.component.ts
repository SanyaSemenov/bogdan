import {
  Component,
  OnInit,
  Input,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { DocumentEventListener } from './document-event-listener';
import { ControlValueAccessor } from '@angular/forms';
import { NgControl } from '@angular/forms';
import { AdditionalDocumentType } from './additional-docvument-type';
import { Subject } from 'rxjs';
const noop = () => { };
@Component({
  selector: 'document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.less']
})
export class DocumentUploadComponent implements OnInit, OnDestroy, ControlValueAccessor {
  public isDragOver: boolean = false;
  public fileNames: string[];
  private _files: File[];
  get files(): File[] {
    return this._files;
  }
  set files(value: File[]) {
    this._files = value;
    this.onChange(this._files);
    if (this._files) {
      this.fileNames = [].map.call(this._files, x => x.name);
      this.onTouched();
    } else {
      this.fileNames = null;
    }
  }
  @Input() public type: AdditionalDocumentType;
  constructor(
    private docListener: DocumentEventListener,
    public ngControl: NgControl
  ) {
    ngControl.valueAccessor = this;
  }
  private ngUnsubscribe = new Subject<void>();
  private onChange = _ => noop;
  private onTouched = () => noop;
  public ngOnInit() {
    this.docListener.setDragListener();
    if (!this.type) {
      throw ReferenceError('type attribute is required');
    }
  }
  public onDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.isDragOver) {
      return;
    }
    this.isDragOver = true;
  }
  public onDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver = false;
  }
  public ondrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver = false;
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      this.uploadFiles({ target: { files } });
      this.fileNames = [].map.call(files, x => x.name);
    }
  }
  public uploadFiles(event = { target: { files: this._files } }) {
    if (!event) {
      return;
    }
    this.files = event.target.files;
  }
  public clearFile() {
    this.files = null;
    this.fileNames = null;
  }
  public writeValue(obj: any): void {
    this._files = obj;
    if (!this._files) {
      this.clearFile();
      return;
    }
    this.uploadFiles();
  }
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
