import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentUploadComponent } from './document-upload.component';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { DocumentEventListener } from './document-event-listener';
import { FileNamePipe } from './pipes/file-name.pipe';

@NgModule({
  declarations: [DocumentUploadComponent, FileNamePipe],
  exports: [DocumentUploadComponent],
  imports: [
    CommonModule,
    PdfJsViewerModule
  ],
  providers: [DocumentEventListener]
})
export class DocumentUploadModule { }
