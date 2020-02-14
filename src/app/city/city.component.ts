import { Component, OnInit } from '@angular/core';
import { GetWeatherService } from '../get-weather.service';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  city:string;
  weather: object;
  units:string = "Imperial";
  loading: boolean = false;

  constructor(private ws: GetWeatherService) { }

  ngOnInit() {
  }

  onKey(event: any){
    console.log(event);
    if(event.code==="Enter"){
      this.checkWeather();
    }
  }

  checkWeather(){
    this.ws.setCity(this.city, this.units).subscribe(data => 
      {
        this.weather = data;
        this.city = "";
        this.loading=false;
      }
    );
    this.city = "Loading, please Wait...";
    this.loading=true;
  }
}
