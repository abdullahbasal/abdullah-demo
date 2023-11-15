import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductResponse } from '../models/productResponse.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {

  }

  getProducts(limit: number = 5, skip: number = 0): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
  }
}
