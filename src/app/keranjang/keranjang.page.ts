import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CartItem, KeranjangService } from '../services/keranjang.service';
import { TransaksiService } from '../services/transaksi.service';
import { ProdukService } from '../services/produk.service';

@Component({
  selector: 'app-keranjang',
  templateUrl: './keranjang.page.html',
  styleUrls: ['./keranjang.page.scss'],
  standalone: false,
})
export class KeranjangPage implements OnInit {
  cartItems: CartItem[] = [];
  metodePembayaran: string = 'Tunai';
  defaultImage: string = '';

  constructor(
    private keranjangService: KeranjangService,
    private transaksiService: TransaksiService,
    private produkService: ProdukService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.defaultImage = this.produkService.DEFAULT_IMAGE;
    this.loadCart();
  }

  ionViewWillEnter() {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.keranjangService.getKeranjang();
  }

  get totalBelanja(): number {
    return this.keranjangService.hitungTotal();
  }

  get totalKeuntungan(): number {
    return this.keranjangService.hitungTotalKeuntungan();
  }

  tambahItem(produkId: number) {
    const item = this.cartItems.find(i => i.produk.id === produkId);
    if (item) {
      const p = this.produkService.getProdukById(produkId);
      if (p) {
        const res = this.keranjangService.tambahKeKeranjang(p, 1);
        if (!res.success) {
          this.showToast(res.message, 'warning');
        }
        this.loadCart();
      }
    }
  }

  kurangiItem(produkId: number) {
    this.keranjangService.kurangiJumlah(produkId);
    this.loadCart();
  }

  hapusItem(produkId: number) {
    this.keranjangService.hapusItem(produkId);
    this.loadCart();
    this.showToast('Item berhasil dihapus dari keranjang', 'light');
  }

  kosongkanKeranjang() {
    this.keranjangService.kosongkanKeranjang();
    this.loadCart();
  }

  async konfirmasiCheckout() {
    if (this.cartItems.length === 0) {
      this.showToast('Keranjang masih kosong!', 'warning');
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Konfirmasi Transaksi',
      subHeader: `Total Belanja: Rp ${this.totalBelanja.toLocaleString('id-ID')}`,
      message: 'Apakah Anda yakin ingin memproses dan mengonfirmasi transaksi ini?',
      buttons: [
        { text: 'Batal', role: 'cancel' },
        {
          text: 'Bayar & Checkout',
          handler: () => {
            this.eksekusiCheckout();
          }
        }
      ]
    });
    await alert.present();
  }

  private async eksekusiCheckout() {
    const res = this.transaksiService.prosesCheckout(this.metodePembayaran);
    if (res.success && res.transaksi) {
      const alert = await this.alertCtrl.create({
        header: 'Transaksi Berhasil!',
        subHeader: `No. Faktur: ${res.transaksi.id}`,
        message: `Total Pembayaran: Rp ${res.transaksi.totalHarga.toLocaleString('id-ID')}\nMetode: ${res.transaksi.metodePembayaran}\n\nStok barang telah otomatis diperbarui.`,
        buttons: [
          {
            text: 'Lihat Riwayat Struk',
            handler: () => {
              this.router.navigate(['/transaksi']);
            }
          }
        ]
      });
      await alert.present();
      this.loadCart();
    } else {
      this.showToast(res.message, 'danger');
    }
  }

  private async showToast(msg: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 1800,
      color: color
    });
    await toast.present();
  }
}
