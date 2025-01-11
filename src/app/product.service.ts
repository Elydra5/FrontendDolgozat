import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://dolgozat-79584-default-rtdb.europe-west1.firebasedatabase.app';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(`${this.baseUrl}/.json`)
  }

  createProduct(product: any) {
    product.price = parseFloat(product.price).toFixed(2)
    return this.http.post(`${this.baseUrl}/.json`, product)
  }

  updateProduct(product: any) {
    product.price = parseFloat(product.price).toFixed(2)
    return this.http.put(`${this.baseUrl}/${product.id}.json`, product)
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}.json`)
  }
}
