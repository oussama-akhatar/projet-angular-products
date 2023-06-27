import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  public getProducts(keyword: string = "", page: number = 1, size: number = 4) {
    return this.http.get(`http://localhost:8089/products?name_like=${keyword}&_page=${page}&_limit=${size}`, {observe: "response"});
  }

  public getProductById(product_id: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8089/products/${product_id}`);
  }

  public checkProduct(product: Product): Observable<Product> {
    return this.http.patch<Product>(`http://localhost:8089/products/${product.id}`, {checked: !product.checked});
  }

  public deleteProduct(product: Product) {
    return this.http.delete<any>(`http://localhost:8089/products/${product.id}`);
  }

  public saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`http://localhost:8089/products`, product);
  }

  public updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`http://localhost:8089/products/${product.id}`, product);
  }
}
