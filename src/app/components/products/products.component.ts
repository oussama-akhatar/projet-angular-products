import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/Product";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products: Array<Product> = [];
  public keyword: string = "";
  public totalPages: number = 0;
  public pageSize: number = 3;
  public currentPage: number = 1;

  constructor(private productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts(this.keyword, this.currentPage, this.pageSize)
      .subscribe({
        next: (resp) => {
          this.products = resp.body as Product[];
          let totalProducts: number = parseInt(resp.headers.get("x-total-count")!);
          this.totalPages = Math.floor(totalProducts / this.pageSize);
          if (totalProducts % this.pageSize != 0) {
            this.totalPages++;
          }
        },
        error: err => {
          console.error(err);
        }
      });
  }

  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next: updateProduct => {
        product.checked = !product.checked;
        // this.getProducts();
      }
    });
  }

  handleDelete(product: Product) {
    if (confirm("Sure")) {
      this.productService.deleteProduct(product).subscribe({
        next: value => {
          // this.getProducts();
          this.products = this.products.filter(p => p.id != product.id);
        }
      });
    }
  }

  handleGoToPage(page: number) {
    this.currentPage = page;
    this.getProducts();
  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`/edit-product/${product.id}`).then(r => {
      console.log(r)
    });
  }
}
