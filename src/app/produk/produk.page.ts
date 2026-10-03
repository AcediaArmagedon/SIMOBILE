import { Component, OnInit } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.scss'],
  standalone: false,
})
export class ProdukPage implements OnInit {

  products: any[] = [];
  searchText: string = '';

  constructor(private productservice: Product) { }

  ngOnInit() {
    this.products = this.productservice.getProducts();
  }

searchProduct() {
    const allProducts = this.productservice.getProducts();

    this.products = allProducts.filter(product =>
      product.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }
  
}
