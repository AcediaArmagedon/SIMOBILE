import { Injectable } from '@angular/core';
import { CartItem, KeranjangService } from './keranjang.service';
import { ProdukService } from './produk.service';

export interface TransaksiItem {
  produkId: number;
  namaProduk: string;
  hargaBeli: number;
  hargaJual: number;
  jumlah: number;
  subtotal: number;
}

export interface Transaksi {
  id: string;
  tanggal: Date;
  items: TransaksiItem[];
  totalHarga: number;
  totalKeuntungan: number;
  metodePembayaran: string;
}

export interface RingkasanDashboard {
  totalProduk: number;
  totalTransaksiHariIni: number;
  totalPenjualanHariIni: number;
  totalKeuntunganHariIni: number;
  produkTerlaris: string;
  jumlahTerlaris: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransaksiService {
  private riwayatTransaksi: Transaksi[] = [
    // Pre-populated initial transaction for demo simulation
    {
      id: 'TRX-20261003-001',
      tanggal: new Date(),
      items: [
        {
          produkId: 1,
          namaProduk: 'Beras Pandan Wangi 5kg',
          hargaBeli: 65000,
          hargaJual: 75000,
          jumlah: 2,
          subtotal: 150000
        },
        {
          produkId: 6,
          namaProduk: 'Indomie Goreng Spesial 85g',
          hargaBeli: 2700,
          hargaJual: 3500,
          jumlah: 10,
          subtotal: 35000
        }
      ],
      totalHarga: 185000,
      totalKeuntungan: 28000, // (75000-65000)*2 + (3500-2700)*10 = 20000 + 8000 = 28000
      metodePembayaran: 'Tunai'
    }
  ];

  constructor(
    private produkService: ProdukService,
    private keranjangService: KeranjangService
  ) {}

  getRiwayat(): Transaksi[] {
    return [...this.riwayatTransaksi];
  }

  getTransaksiById(id: string): Transaksi | undefined {
    return this.riwayatTransaksi.find(t => t.id === id);
  }

  prosesCheckout(metodePembayaran: string = 'Tunai'): { success: boolean; message: string; transaksi?: Transaksi } {
    const cartItems = this.keranjangService.getKeranjang();
    if (cartItems.length === 0) {
      return { success: false, message: 'Keranjang belanja masih kosong!' };
    }

    // Check stock availability for all items
    for (const item of cartItems) {
      const p = this.produkService.getProdukById(item.produk.id);
      if (!p || p.stok < item.jumlah) {
        return { 
          success: false, 
          message: `Stok ${item.produk.nama} tidak mencukupi untuk checkout.` 
        };
      }
    }

    // Deduct stock for all items
    const transaksiItems: TransaksiItem[] = [];
    let totalHarga = 0;
    let totalKeuntungan = 0;

    for (const item of cartItems) {
      this.produkService.kurangiStok(item.produk.id, item.jumlah);
      const itemProfit = (item.produk.hargaJual - item.produk.hargaBeli) * item.jumlah;
      
      transaksiItems.push({
        produkId: item.produk.id,
        namaProduk: item.produk.nama,
        hargaBeli: item.produk.hargaBeli,
        hargaJual: item.produk.hargaJual,
        jumlah: item.jumlah,
        subtotal: item.subtotal
      });

      totalHarga += item.subtotal;
      totalKeuntungan += itemProfit;
    }

    // Generate Invoice ID
    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const trxCount = this.riwayatTransaksi.length + 1;
    const invoiceId = `TRX-${todayStr}-${trxCount.toString().padStart(3, '0')}`;

    const newTransaksi: Transaksi = {
      id: invoiceId,
      tanggal: new Date(),
      items: transaksiItems,
      totalHarga: totalHarga,
      totalKeuntungan: totalKeuntungan,
      metodePembayaran: metodePembayaran
    };

    this.riwayatTransaksi.unshift(newTransaksi);
    this.keranjangService.kosongkanKeranjang();

    return { 
      success: true, 
      message: `Transaksi ${invoiceId} Berhasil!`, 
      transaksi: newTransaksi 
    };
  }

  getRingkasanHariIni(): RingkasanDashboard {
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    const transaksiHariIni = this.riwayatTransaksi.filter(t => new Date(t.tanggal) >= todayStart);

    const totalTransaksiHariIni = transaksiHariIni.length;
    const totalPenjualanHariIni = transaksiHariIni.reduce((sum, t) => sum + t.totalHarga, 0);
    const totalKeuntunganHariIni = transaksiHariIni.reduce((sum, t) => sum + t.totalKeuntungan, 0);

    // Calculate top selling product today
    const salesMap: { [nama: string]: number } = {};
    transaksiHariIni.forEach(t => {
      t.items.forEach(item => {
        salesMap[item.namaProduk] = (salesMap[item.namaProduk] || 0) + item.jumlah;
      });
    });

    let produkTerlaris = '-';
    let maxQty = 0;
    Object.keys(salesMap).forEach(nama => {
      if (salesMap[nama] > maxQty) {
        maxQty = salesMap[nama];
        produkTerlaris = nama;
      }
    });

    const allProducts = this.produkService.getProduk();

    return {
      totalProduk: allProducts.length,
      totalTransaksiHariIni,
      totalPenjualanHariIni,
      totalKeuntunganHariIni,
      produkTerlaris,
      jumlahTerlaris: maxQty
    };
  }
}
