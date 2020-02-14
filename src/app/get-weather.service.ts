import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetWeatherService {
  weather: object = {"err": "This is an error."};

  constructor(private http: HttpClient) { }

  setCity(city:string, units:string): Observable<any>{
    const url = 'http://localhost:3000/';
    return this.http.post(url, {"name": city, "units": units});
  }
}
