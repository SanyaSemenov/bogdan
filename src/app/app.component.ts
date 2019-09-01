import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileValidator } from './document-upload/validators/file.validator';
import { AdditionalDocumentType } from './document-upload/additional-docvument-type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      file: [
        null,
        [Validators.required, FileValidator.maxSize(9), FileValidator.extensions()]
      ]
    });

    this.form.valueChanges.subscribe(x => console.log(this.form));
  }

  public form: FormGroup;
  public type: AdditionalDocumentType = {
    type: 'passport',
    description: 'Загрузите паспорт'
  };
}
