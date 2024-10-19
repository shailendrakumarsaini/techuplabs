import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCustomerComponent } from './shared/customer/create-customer/create-customer.component';
import { CreatePinComponent } from './shared/pin/create-pin/create-pin.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'techuplabs_assignment';
  pins : any[] = [];

  constructor(private dialog : MatDialog){
    let customers = JSON.parse(localStorage.getItem('customers'));
    let pins = JSON.parse(localStorage.getItem('pin'));
    if(!customers){
      localStorage.setItem('customers', JSON.stringify([]));
    }
    if(!pins){
      localStorage.setItem('pin', JSON.stringify([]));
    }

    this.pins = JSON.parse(localStorage.getItem('pin'));
    console.log(this.pins);
  }

  openAddCustomerDialog(){
    this.dialog.open(CreateCustomerComponent,{
      minWidth: '700px'
    });
  }

  openAddPinDialog(){
    this.dialog.open(CreatePinComponent,{
      minWidth: '700px'
    }).afterClosed().subscribe(res=>{
      this.pins = JSON.parse(localStorage.getItem('pin'));
    });
  }

}
