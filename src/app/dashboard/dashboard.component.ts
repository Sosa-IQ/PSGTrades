import { Component } from '@angular/core';
import { AccountlistComponent } from '../accountlist/accountlist.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AccountlistComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
