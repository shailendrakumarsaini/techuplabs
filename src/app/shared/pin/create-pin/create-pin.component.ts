import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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
    collaboratory : ['',[Validators.required]],
    privacy: ['', [Validators.required]],
  });

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
    let pins : any[] = JSON.parse(localStorage.getItem('pin'));
    pins.push(formData);
    localStorage.setItem('pin', JSON.stringify(pins));
    this.dialogRef.close();
  } 
}
