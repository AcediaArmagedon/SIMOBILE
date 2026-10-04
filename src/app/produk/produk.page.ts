import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Produk, ProdukService } from '../services/produk.service';
import { KeranjangService } from '../services/keranjang.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produk',
  templateUrl: './produk.page.html',
  styleUrls: ['./produk.page.scss'],
  standalone: false,
})
export class ProdukPage implements OnInit {
  searchQuery: string = '';
  selectedKategori: string = 'Semua';
  kategoriList: string[] = [];
  listProduk: Produk[] = [];
  defaultImage: string = '';

  constructor(
    private produkService: ProdukService,
    private keranjangService: KeranjangService,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.defaultImage = this.produkService.DEFAULT_IMAGE;
    this.kategoriList = this.produkService.getKategoriList();
    this.loadProduk();
  }

  ionViewWillEnter() {
    this.loadProduk();
  }

  loadProduk() {
    this.listProduk = this.produkService.searchProduk(this.searchQuery, this.selectedKategori);
  }

  // Real-time search handler (two-way binding ngModel)
  onSearchChange() {
    this.loadProduk();
  }

  onKategoriChange(kategori: string) {
    this.selectedKategori = kategori;
    this.loadProduk();
  }

  async tambahKeKeranjang(produk: Produk, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const res = this.keranjangService.tambahKeKeranjang(produk, 1);
    
    const toast = await this.toastCtrl.create({
      message: res.message,
      duration: 1800,
      position: 'bottom',
      color: res.success ? 'success' : 'danger',
      buttons: [{ text: 'OK', role: 'cancel' }]
    });
    await toast.present();
  }

  bukaDetail(id: number) {
    this.router.navigate(['/produk-detail', id]);
  }

  editProduk(id: number, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.router.navigate(['/produk-form', id]);
  }

  async hapusProduk(id: number, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const success = this.produkService.hapusProduk(id);
    if (success) {
      this.loadProduk();
      const toast = await this.toastCtrl.create({
        message: 'Produk berhasil dihapus.',
        duration: 1500,
        color: 'warning'
      });
      await toast.present();
    }
  }
}

