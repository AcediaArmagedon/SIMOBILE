import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-produk-detail',
  templateUrl: './produk-detail.page.html',
  styleUrls: ['./produk-detail.page.scss'],
  standalone: false,
})
export class ProdukDetailPage implements OnInit {

  product: any;

  constructor(private route: ActivatedRoute, private productservice: Product) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.product = this.productservice.getProductById(id);
  }

}
