import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from '../models/global-data';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  updatedDate;
  pie = 'Pie Chart';
  column = 'Column Chart';
  TotalConfirmed = 0;
  TotalActive = 0;
  TotalDeaths = 0;
  TotalRecovered = 0;
  globalData: GlobalDataSummary[];
  datatable = [];
  // loading = false;

  chart = {
    PieChart: 'PieChart' ,
    ColumnChart: 'ColumnChart' ,
    height: 350,
    options: {
      animation: {
        duration: 1000,
        easing: 'out',
      },
      is3D: true,
      backgroundColor: { fill: 'transparent' }

    }
  };
  constructor(private dataservice: DataServiceService) { }

  ngOnInit() {

    this.dataservice.getGlobalData()
      // tslint:disable-next-line: deprecation
      .subscribe({
        next: (result) => {
          console.log(result);
          this.globalData = result;
          result.forEach(cs => {
            if (!Number.isNaN(cs.confirmed)) {
              this.TotalActive += cs.active;
              this.TotalConfirmed += cs.confirmed;
              this.TotalDeaths += cs.deaths;
              this.TotalRecovered += cs.recovered;
            }
          });
          this.initChart('c');
        }
      });

    this.updatedDate = this.dataservice.updatedDate;

  }

  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value);
  }

  initChart(caseType: string) {
    this.datatable = [];
    // this.datatable.push(['Country', 'Cases']);

    this.globalData.forEach(cs => {
      let value: number;

      // tslint:disable-next-line:curly
      if (caseType === 'c')
        // tslint:disable-next-line:curly
        if (cs.confirmed > 2000)
          value = cs.confirmed;


      // tslint:disable-next-line:curly
      if (caseType === 'a')
        // tslint:disable-next-line:curly
        if (cs.active > 2000)
          value = cs.active;

     // tslint:disable-next-line:curly
      if (caseType === 'd')
        // tslint:disable-next-line:curly
        if (cs.deaths > 2000)
          value = cs.deaths;


      // tslint:disable-next-line:curly
      if (caseType === 'r')
        // tslint:disable-next-line:curly
        if (cs.recovered > 2000)
          value = cs.recovered;

      this.datatable.push([
        cs.country, value
      ]);
    });
    // console.log(datatable);
  }

}
