import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.scss']
})
export class CreateCustomerComponent {

  regionList :any [] = [];
  countryList :any [] = [];
  countryAndRegionList :any [] = [];

  customerForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    region: ['', [Validators.required]],
    country: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private apiService: ApiService, public dialogRef: MatDialogRef<CreateCustomerComponent>){}

  ngOnInit(): void {
    this.apiService.fetchRegions().subscribe((res:any) => {
      if(res?.data){
        this.countryAndRegionList = res?.data;

        /* below line is performing the following operations that gives output like`['Africa', 'Antarctic', 'Asia', 'Central America']` */
        this.regionList = [...new Set(Object.values(res?.data).map(item => item['region']))];
      }
    })
  }

 /**
  * The onSubmit function adds form data to the 'customers' property in localStorage and closes a dialog.
  */
  onSubmit(formData){
    let parsedCustomers = JSON.parse(localStorage.getItem('customers'));
    let customers : any[] = parsedCustomers || [];
    customers.push(formData);
    localStorage.setItem('customers', JSON.stringify(customers));
    this.dialogRef.close();
  }

  onRegionChange(event){
    let region = event.target.value;
    /* filtering the country list alone with countryCode based on selected region */
    /* below line is performing the following operations that gives output like `[{countryCode: 'AF', country: 'Afghanistan'}, ...]`*/
    this.countryList = Object.entries(this.countryAndRegionList).filter(([code, { region: countryRegion }]) => countryRegion === region).map(([code, { country }]) => ({ countryCode: code, country }));

    //  sort countries name in ascending order based on the `country`
    this.countryList.sort((a,b) => a.country > b.country ? 1: b.country > a.country ? -1 : 0);

    this.customerForm.controls['country'].setValue('');
  }

}
