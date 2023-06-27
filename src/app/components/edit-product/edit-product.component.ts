import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../models/Product";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
  product_id!: number;
  productFormGroup!: FormGroup;
  constructor(private route: ActivatedRoute, private productService: ProductService, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.product_id = this.route.snapshot.params['id'];
    this.productService.getProductById(this.product_id).subscribe({
      next: (product) => {
        this.productFormGroup = this.fb.group({
          id: this.fb.control(product.id,[Validators.required]),
          name: this.fb.control(product.name,[Validators.required]),
          price: this.fb.control(product.price,[Validators.required]),
          checked: this.fb.control(product.checked,[Validators.required]),
        });
      },
      error: err => {
        console.log(err);
      }
    })
  }

  updateProduct() {
    let product : Product = this.productFormGroup.value;
    this.productService.updateProduct(product).subscribe({
      next: (data) => {
        alert(JSON.stringify(data));
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
