import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCustomerComponent } from './shared/customer/create-customer/create-customer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'techuplabs_assignment';

  constructor(private dialog : MatDialog){
    let customers = JSON.parse(localStorage.getItem('customers'));
    if(!customers){
      localStorage.setItem('customers', JSON.stringify([]));
    }
  }

  openAddCustomerDialog(){
    this.dialog.open(CreateCustomerComponent);
  }
}
