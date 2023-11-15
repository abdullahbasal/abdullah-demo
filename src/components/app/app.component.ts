import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet } from "@angular/router";
import { DataService } from "../../services/data.service";
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
} from "@angular/cdk/drag-drop";
import { Product } from "../../models/product.model";
import { ProductResponse } from "../../models/productResponse.model";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, CdkDropList, CdkDrag],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  products: Product[] = [];
  limit: number = 10;
  skip: number = 0;
  total: number = 0;
  totalPageCount: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.dataService
      .getProducts(this.limit, this.skip)
      .subscribe((res: ProductResponse) => {
        this.products = res.products;
        this.limit = res.limit;
        this.skip = res.skip;
        this.total = res.total;
        this.totalPageCount = Math.ceil(this.total / this.limit);
      });
  }

  handleClickNext() {
    if (this.totalPageCount > this.skip + 1) {
      this.skip += 1;
      this.getProducts();
    }
  }

  handleClickPrevious() {
    if (1 < this.skip + 1) {
      this.skip -= 1;
      this.getProducts();
    }
  }

  handleClickPage(event: Event, page: number) {
    this.skip = page;
    this.getProducts();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.products, event.previousIndex, event.currentIndex);
  }

  handleCalculatingPriceWithoutDiscount(price: number, discount: number) {
    return Math.floor(price + (price * discount) / 100);
  }
  starCalculate(rating: number) {
    return Math.round(rating);
  }
}
