import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DogResponse} from "../_model/dogResponse";

@Injectable({
  providedIn: 'root'
})
export class DogService {
  private baseUrl = 'https://dog.ceo/api/'

  constructor(private http: HttpClient) {
  }

//   get all dog breeds
  getDogBreeds(): Observable<DogResponse> {
    return this.http.get<DogResponse>(this.baseUrl + 'breeds/list/all')
  }

  getBreedImages(breed: string): Observable<DogResponse> {
    return this.http.get<DogResponse>(this.baseUrl + 'breed/' + breed.toLowerCase() + '/images')
  }
}
