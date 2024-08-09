import { Component } from '@angular/core';
import { ImportsModule } from '../imports/imports';
import { LocationsService } from '../services/locations/locations.service';
import { Locations } from '../entities/locations';
import { Country } from '../entities/country';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../services/country/country.service';
import { FlightRoute } from '../entities/flightRoute';
import { FlightRouteService } from '../services/flightRoute/flight-route.service';
import { ActivatedRoute, Router } from '@angular/router';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ImportsModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.sass',
  providers: []
})
export class LandingComponent {

  locations!: Locations[];
  countries!: Country[];
  filteredLocations!: any[];
  minimumDate = new Date();
  flightRoutes!: FlightRoute[];
  
  formGroup!: FormGroup;


    constructor(
      private locationsService: LocationsService,
      private countriesService: CountryService,
      private flightRouteService: FlightRouteService,
      private router: ActivatedRoute,
      private route: Router
    ) {}

    ngOnInit() {
      this.getCountries()
      this.formGroup = new FormGroup({
        selectedOrigin: new FormControl(null, Validators.required),
        selectedFinal: new FormControl(null, Validators.required),
        selectedDate: new FormControl(null, Validators.required),
      });
    }
    
    getCountries(){
      this.countriesService.getCountries().subscribe((res) => {
        this.countries=res;
        this.getLocations();
      });
    }

    getLocations(){
      this.locationsService.getLocations().subscribe((res) => {
        this.locations=res;
        for (let location of this.locations ) {
          let i = this.countries.findIndex(x=> x.countryId===location.countryId)
          if(i>=0){
            location.countryName=this.countries[i].country;
            location.locount=location.location+", "+this.countries[i].country;
          }
        }
      });
    }

    filterLocations(event: AutoCompleteCompleteEvent) {
      let filtered: Locations[] = [];
      let query = event.query;

      for (let i = 0; i < (this.locations as Locations[]).length; i++) {
        let location = (this.locations as Locations[])[i];
        if (location.location.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(location);
        }
      }

      this.filteredLocations = filtered;
    }

    getFlightRoutes(){
      if(this.formGroup.valid){
        let flightRouteSearch!: FlightRoute;
        flightRouteSearch = new FlightRoute();
        flightRouteSearch.originLocation=this.formGroup.get('selectedOrigin')?.value.locationId;
        flightRouteSearch.finalLocation=this.formGroup.get('selectedFinal')?.value.locationId;
        flightRouteSearch.flightDate=this.formGroup.get('selectedDate')?.value;
        this.flightRouteService.getFlightRoute(flightRouteSearch).subscribe((res) => {
          this.flightRoutes=res;
          for(let flight of this.flightRoutes){
            let originIndex = this.locations.find(x=>x.locationId===flight.originLocation);
            let finalIndex = this.locations.find(x=>x.locationId===flight.finalLocation);
            if(originIndex){
              flight.originName=originIndex.airportCode;
            }
            if(finalIndex){
              flight.finalName=finalIndex.airportCode;
            }
            flight.flightDate= new Date(flight.flightDate)
            let time=flight.boardingTime.toString().split(":");
            flight.flightDate.setHours(+time[0]);
            flight.flightDate.setMinutes(+time[1]+30);
          }
        });
      }
    }
    selectFlight(item: FlightRoute){
      this.route.navigate(['compra'],{queryParams:{
        flightRoute: item.flightRouteId, 
        originName: item.originName, 
        finalName: item.finalName,
        planeId: item.planeId,
      }});
    }
}
