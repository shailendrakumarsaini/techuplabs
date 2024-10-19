import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePinComponent } from './create-pin/create-pin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSelectModule } from 'ngx-select-ex';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    CreatePinComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSelectModule,
    FileUploadModule
  ],
  exports:[
    CreatePinComponent
  ]
})
export class PinModule { }
