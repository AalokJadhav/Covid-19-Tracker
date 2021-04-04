import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { GlobalDataSummary } from '../models/global-data';
import { DateWiseData } from '../models/date-wise-data';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private baseUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/';
  private globalDataUrl = '';
  private extension = '.csv';
  month;
  monthname;
  date;
  year;
  updatedDate;

  private dateWiseDataUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv`;

  getDate(date: number) {
    if (date < 10) {
      return '0' + date;
    }
    return date;
  }
  constructor(private http: HttpClient) {
    const now = new Date();
    this.month = now.getMonth() + 1;
    this.year = now.getFullYear();
    this.date = now.getDate() - 1;

    this.monthname = now.toLocaleString('en-us', { month: 'long' });
    this.updatedDate = `${this.date} ${this.monthname},${this.year}`;
    console.log(this.updatedDate);
    this.globalDataUrl = `${this.baseUrl}${this.getDate(this.month)}-${this.getDate(this.date)}-${this.year}${this.extension}`;

    console.log(this.globalDataUrl);
  }

  getDateWiseData() {
    return this.http.get(this.dateWiseDataUrl, { responseType: 'text' }).pipe(
      map(result => {
        // tslint:disable-next-line:prefer-const
        let rows = result.split('\n');
        // console.log(rows);
        const mainData = {};
        const header = rows[0];
        const dates = header.split(/,(?=\S)/);
        dates.splice(0, 4);

        rows.splice(0, 1);
        rows.forEach(row => {
          const cols = row.split(/,(?=\S)/);
          const con = cols[1];
          cols.splice(0, 4);
          // console.log(con , cols);
          mainData[con] = [];
          cols.forEach((value, index) => {
            const dw: DateWiseData = {
              cases: +value,
              country: con,
              date: new Date(Date.parse(dates[index]))
            };
            mainData[con].push(dw);
          });
        });
        // tslint:disable-next-line:align
        // console.log(mainData);
        return mainData;
      }));

  }
  // tslint:disable-next-line:typedef-whitespace
  getGlobalData(): Observable<any[]> {
    return this.http.get(this.globalDataUrl, { responseType: 'text' }).pipe(
      map(result => {
        const data: GlobalDataSummary[] = [];
        const raw = {};
        const rows = result.split('\n');
        rows.splice(0, 1);
        // console.log(rows);
        rows.forEach(row => {
          const cols = row.split(/,(?=\S)/);

          // tslint:disable-next-line:prefer-const
          let cs = {
            country: cols[3],
            confirmed: +cols[7],
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[10]
          };
          const temp = raw[cs.country] = cs;
          if (temp) {
            temp.active = cs.active + temp.active;
            temp.confirmed = cs.confirmed + temp.confirmed;
            temp.deaths = cs.deaths + temp.deaths;
            temp.recovered = cs.recovered + temp.recovered;

            raw[cs.country] = temp;
          } else {
            raw[cs.country] = cs;
          }
        });
        return <GlobalDataSummary[]>Object.values(raw);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          this.date = this.date - 1;
          this.globalDataUrl = `${this.baseUrl}${this.getDate(this.month)}-${this.getDate(this.date)}-${this.year}${this.extension}`;

          console.log(this.globalDataUrl);
          return this.getGlobalData();
        }
      })
    );
  }
}
