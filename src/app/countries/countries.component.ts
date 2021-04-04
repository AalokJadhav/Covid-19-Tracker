import { Component, OnInit } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateWiseData } from '../models/date-wise-data';
import { GlobalDataSummary } from '../models/global-data';
import { DataServiceService } from '../services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  updatedDate;
  // tslint:disable-next-line:no-inferrable-types
  p: number = 1;
  data: GlobalDataSummary[];
  countries: string[] = [];
  TotalConfirmed = 0;
  TotalActive = 0;
  TotalDeaths = 0;
  TotalRecovered = 0;
  selectedCountryData: DateWiseData[];
  dateWiseData =  {};
  loading = true;
  dataTable = [];
  columnNames = ['Date', 'Cases'];
  chart = {
    lineChart: 'LineChart',
    height: 300,
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

    merge(
      this.dataservice.getDateWiseData().pipe(
        map(result=>{
          this.dateWiseData = result;
          // this.updateChart();
        })
      ),
      this.dataservice.getGlobalData()
      .pipe(map(result=>{
        this.data = result;
        this.data.forEach(cs=>{
          this.countries.push(cs.country);
        });
      }))
    // tslint:disable-next-line: deprecation
    ).subscribe(
      {
        complete : ()=>{
         this.updateValues('India');
         this.loading = false;
        }
      }
    );
    this.updatedDate = this.dataservice.updatedDate;
  }

  updateChart(){
    const dataTable = [];
    dataTable.push(['Date' , 'Cases']);
    this.selectedCountryData.forEach(cs=>{
      dataTable.push([cs.date , cs.cases]);
      // console.log(dataTable);
    });
  }

  updateValues(country: string) {
    console.log(country);
    this.data.forEach(cs => {
      if (cs.country === country) {
        this.TotalActive = cs.active;
        this.TotalConfirmed = cs.confirmed;
        this.TotalDeaths = cs.deaths;
        this.TotalRecovered = cs.recovered;
      }
    });
    this.selectedCountryData =  this.dateWiseData[country];
    console.log(this.selectedCountryData);
    this.updateChart();
  }

}
