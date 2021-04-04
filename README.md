##  Covid 19 Tracker Application using Angular
	
   In this Application I am showing Live coronavirus news tracking the number of Confirmed Cases, Recovered Cases and Deaths.
   The list of countries and their regional classification is based on the United Nations.
   I also Shows Bar Chart & Pi Chart for all over the world.

****
# [Demo](https://aalokjadhav.github.io/)

A single page application with full API functionality, developed using Angular 9, 
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.1.

**Please support this project by simply putting a Github star ⭐. 🙏 Thanks**

## Development environment

    1. Angular CLI
    2. Angular 9
    3. Google PiChart
    4. Bar Chart
    5. VS Code Editor
    6. Github
    7. Semantic UI

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

 
## Project functionality

####	Steps: 
 
		 1. Generating Angular Project using ng new command.
		 2. Create Navbar Component and use bootstrap navbar.
		 3. Craete countries and Home Component and shows on DOM.
		 4. Use Github repo for fecth Covid 19 data.
		 5. Creete service and inject httpClient and HttpClientModule.
		 6. Create a Method getGlobalData and fecth data using github .csv file.
		 7. In this method use pipe and map method.
		 8. This method subscribe in the component for result and show on console.
		 9. this data is in csv thats why we parse the csv into javascriptobject
		10. we shows result.split with \n (new Line) for rows.
		11. Also same split with , (comma) for cols.
		12. we use RegExp for comma seprated value with no whtespace using regexr.com
			RegExp = /,(?=\S)/
			we use RegExp between // (double slash)
		13. create Model folder for holding data, create globalDataSummary interface.
		14. using Push method we collect all data using index.
		15. +sign use for convet string into number value and shows on console.
		15. For merging the all values with the same name country I create object with key value pair.
		16. Create piChart and columnChart using angular-google-charts
		17. In data-service I use split and splice method to get Country, Cases and date.
		18. Using Select Input i shows all countries.
		19. When Country Component load I shows Cards with comfirmed, recovered, Deaths and Active cases.
		20. I also show default Country India when country component load.
		21. Shows this country and cases and date in table list using *ngFor directive when we select specific country.
		
		
