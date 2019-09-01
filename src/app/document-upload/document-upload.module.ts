import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentUploadComponent } from './document-upload.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { DocumentEventListener } from './document-event-listener';

@NgModule({
  declarations: [DocumentUploadComponent],
  exports: [DocumentUploadComponent],
  imports: [
    CommonModule,
    PdfJsViewerModule
  ],
  providers: [DocumentEventListener]
})
export class DocumentUploadModule { }
