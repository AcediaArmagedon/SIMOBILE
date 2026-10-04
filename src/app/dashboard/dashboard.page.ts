import { Component, OnInit } from '@angular/core';
import { RingkasanDashboard, TransaksiService } from '../services/transaksi.service';
import { Produk, ProdukService } from '../services/produk.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: false,
})
export class DashboardPage implements OnInit {
  ringkasan!: RingkasanDashboard;
  produkStokHampirHabis: Produk[] = [];

  constructor(
    private transaksiService: TransaksiService,
    private produkService: ProdukService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  ionViewWillEnter() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.ringkasan = this.transaksiService.getRingkasanHariIni();
    const allProduk = this.produkService.getProduk();
    this.produkStokHampirHabis = allProduk.filter(p => p.stok <= 5);
  }
}

