import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-create-pin',
  templateUrl: './create-pin.component.html',
  styleUrls: ['./create-pin.component.scss']
})
export class CreatePinComponent {

  /* collaborators list shown in multi select control*/
  collaborators : string[] = [];
  /* fromControl object to handle multiple selection*/
  public collaboration = new FormControl(); // created this because 'ngx-select-ex' library support on fromControl object

  pinForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    image: ['', [Validators.required]],
    collaboratory : ['',[Validators.required]],
    privacy: ['', [Validators.required]],
  });

  uploader:FileUploader;
  base64textString;

  createControl(){
    return new FormControl('',Validators.required)
  }
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<CreatePinComponent>){
    /* listing valueChanges event and updating in pinForm formGroup*/
    this.collaboration.valueChanges.subscribe(value => {
      this.pinForm.controls['collaboratory'].setValue(value);
    });

    let customers = JSON.parse(localStorage.getItem('customers'));
    /* below line is performing the following operations that gives array of customer title like this`['xyx',..]` */
    this.collaborators = customers.map(e => e['title']);
  }

  ngOnInit(): void {}

  /**
  * The onSubmit function adds form data to the 'pin' property in localStorage and closes a dialog.
  */
  onSubmit(formData){
    let parsedPins = JSON.parse(localStorage.getItem('pin'))
    let pins : any[] = parsedPins || [];
    pins.push(formData);
    localStorage.setItem('pin', JSON.stringify(pins));
    this.dialogRef.close();
  } 

    public onFileSelected(event) {
      if(event && event[0]){
        let file = event[0];
        if (file) {
          let reader = new FileReader();

          reader.onload = this.handleReaderLoaded.bind(this);

          reader.readAsBinaryString(file);
        }
      }
    }

    handleReaderLoaded(readerEvt) {
      let binaryString = readerEvt.target.result;
      this.base64textString = btoa(binaryString);
      this.pinForm.controls['image'].setValue(btoa(binaryString));
    }
}
