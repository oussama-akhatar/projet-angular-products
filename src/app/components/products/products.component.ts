import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/Product";
import {Observable} from "rxjs";
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  public products : Array<Product> = [];
  public keyword : string = "";
  constructor(private productService: ProductService) {}
  ngOnInit(): void {
    this.getProducts();
  }
  getProducts() {
    this.productService.getProducts()
      .subscribe({
        next : data => {
          this.products = data
        },
        error : err => {
          console.error(err)
        }
      });
    //this.products$ = this.productService.getProducts();
  }
  handleCheckProduct(product: Product){
    this.productService.checkProduct(product).subscribe({
      next: updateProduct => {
        product.checked = !product.checked;
        // this.getProducts();
      }
    });
  }

  handleDelete(product: Product){
    this.productService.deleteProduct(product).subscribe({
      next: value => {
        // this.getProducts();
        this.products = this.products.filter(p=>p.id!=product.id);
      }
    })
  }

  searchProducts() {
    this.productService.searchProduct(this.keyword).subscribe({
      next: value => {
        this.products = value
      }
    })
  }
}
