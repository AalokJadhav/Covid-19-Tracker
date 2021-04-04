import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit {

  @Input('TotalConfirmed')
  TotalConfirmed;
  @Input('TotalRecovered')
  TotalRecovered;
  @Input('TotalDeaths')
  TotalDeaths;
  @Input('TotalActive')
  TotalActive;
  constructor() { }

  ngOnInit() {
  }

}
