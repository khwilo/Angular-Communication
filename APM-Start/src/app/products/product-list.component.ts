import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList
} from "@angular/core";

import { IProduct } from "./product";
import { ProductService } from "./product.service";
import { NgModel } from "@angular/forms";
import { Subscription } from "rxjs/Subscription";

@Component({
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit, AfterViewInit {
  pageTitle: string = "Product List";
  showImage: boolean;
  listFilter: string;

  imageWidth: number = 50;
  imageMargin: number = 2;
  errorMessage: string;

  @ViewChild("filterElement") filterElementRef: ElementRef;
  @ViewChild(NgModel) filterInput: NgModel;

  filteredProducts: IProduct[];
  products: IProduct[];

  constructor(private productService: ProductService) {}

  ngAfterViewInit() {
    this.filterInput.valueChanges.subscribe(() =>
      this.performFilter(this.listFilter)
    );
    this.filterElementRef.nativeElement.focus();
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products: IProduct[]) => {
        this.products = products;
        this.performFilter(this.listFilter);
      },
      (error: any) => (this.errorMessage = <any>error)
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  performFilter(filterBy?: string): void {
    if (filterBy) {
      this.filteredProducts = this.products.filter(
        (product: IProduct) =>
          product.productName
            .toLocaleLowerCase()
            .indexOf(filterBy.toLocaleLowerCase()) !== -1
      );
    } else {
      this.filteredProducts = this.products;
    }
  }
}
