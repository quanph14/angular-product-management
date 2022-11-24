import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../service/product.service';
import {Category} from "../../model/category";
import {CategoryService} from "../../service/category.service";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  productForm: FormGroup = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    description: new FormControl(),
    category: new FormControl()
  });

  categories: Category[] = [];

  constructor(private productService: ProductService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getAllCategory();
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe(categories => {
      this.categories = categories;
    })
  }

  submit() {
    const product = this.productForm.value;
    product.category = {
      id: product.category
    }
    this.productService.saveProduct(product).subscribe(() => {
      this.productForm.reset();
      alert('Tạo thành công');
    }, e => {
      console.log(e);
    })
  }
}
