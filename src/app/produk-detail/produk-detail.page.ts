import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Produk, ProdukService } from '../services/produk.service';
import { KeranjangService } from '../services/keranjang.service';

@Component({
  selector: 'app-produk-detail',
  templateUrl: './produk-detail.page.html',
  styleUrls: ['./produk-detail.page.scss'],
  standalone: false,
})
export class ProdukDetailPage implements OnInit {
  produk: Produk | undefined;
  defaultImage: string = '';
  jumlahBeli: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private produkService: ProdukService,
    private keranjangService: KeranjangService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.defaultImage = this.produkService.DEFAULT_IMAGE;
    this.loadProduk();
  }

  ionViewWillEnter() {
    this.loadProduk();
  }

  loadProduk() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = parseInt(idParam, 10);
      this.produk = this.produkService.getProdukById(id);
    }
  }

  get profitPerUnit(): number {
    if (!this.produk) return 0;
    return this.produk.hargaJual - this.produk.hargaBeli;
  }

  get profitPercentage(): number {
    if (!this.produk || this.produk.hargaBeli === 0) return 0;
    return (this.profitPerUnit / this.produk.hargaBeli) * 100;
  }

  tambahQty() {
    if (this.produk && this.jumlahBeli < this.produk.stok) {
      this.jumlahBeli++;
    }
  }

  kurangiQty() {
    if (this.jumlahBeli > 1) {
      this.jumlahBeli--;
    }
  }

  async tambahKeKeranjang() {
    if (!this.produk) return;
    const res = this.keranjangService.tambahKeKeranjang(this.produk, this.jumlahBeli);
    const toast = await this.toastCtrl.create({
      message: res.message,
      duration: 1800,
      position: 'bottom',
      color: res.success ? 'success' : 'danger'
    });
    await toast.present();
    if (res.success) {
      this.router.navigate(['/keranjang']);
    }
  }

  editProduk() {
    if (this.produk) {
      this.router.navigate(['/produk-form', this.produk.id]);
    }
  }
}
