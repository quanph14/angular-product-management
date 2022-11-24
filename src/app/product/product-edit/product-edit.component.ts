import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {Category} from "../../model/category";
import {CategoryService} from "../../service/category.service";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  // @ts-ignore
  productForm: FormGroup;
  // @ts-ignore
  id: number;
  categories: Category[] = [];

  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
        // @ts-ignore
        this.id = +paramMap.get('id');
        this.getProduct(this.id);
      })

    });
  }

  ngOnInit() {
    this.getAllCategory();
  }

  getProduct(id: number) {
    return this.productService.findById(id).subscribe(product => {
      this.productForm = new FormGroup({
        name: new FormControl(product.name),
        price: new FormControl(product.price),
        description: new FormControl(product.description),
        category: new FormControl(product.category.id)
      });
    });
  }

  updateProduct(id: number) {
    const product = this.productForm.value;
    product.category = {
      id: product.category
    };
    this.productService.updateProduct(id, product).subscribe(() => {
      alert('Cập nhật thành công');
    }, e => {
      console.log(e);
    });
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    })
  }

}
