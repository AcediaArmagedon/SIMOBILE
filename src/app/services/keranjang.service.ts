import { Injectable } from '@angular/core';
import { Produk } from './produk.service';

export interface CartItem {
  produk: Produk;
  jumlah: number;
  subtotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class KeranjangService {
  private items: CartItem[] = [];

  constructor() {}

  getKeranjang(): CartItem[] {
    return [...this.items];
  }

  tambahKeKeranjang(produk: Produk, jumlah: number = 1): { success: boolean; message: string } {
    if (produk.stok <= 0) {
      return { success: false, message: `Stok ${produk.nama} habis!` };
    }

    const index = this.items.findIndex(item => item.produk.id === produk.id);
    const existingQty = index !== -1 ? this.items[index].jumlah : 0;

    if (existingQty + jumlah > produk.stok) {
      return { 
        success: false, 
        message: `Stok tidak mencukupi! Sisa stok ${produk.nama}: ${produk.stok} unit.` 
      };
    }

    if (index !== -1) {
      this.items[index].jumlah += jumlah;
      this.items[index].subtotal = this.items[index].jumlah * this.items[index].produk.hargaJual;
    } else {
      this.items.push({
        produk: { ...produk },
        jumlah: jumlah,
        subtotal: jumlah * produk.hargaJual
      });
    }

    return { success: true, message: `${produk.nama} berhasil ditambahkan ke keranjang.` };
  }

  kurangiJumlah(produkId: number): void {
    const index = this.items.findIndex(item => item.produk.id === produkId);
    if (index !== -1) {
      if (this.items[index].jumlah > 1) {
        this.items[index].jumlah -= 1;
        this.items[index].subtotal = this.items[index].jumlah * this.items[index].produk.hargaJual;
      } else {
        this.items.splice(index, 1);
      }
    }
  }

  hapusItem(produkId: number): void {
    this.items = this.items.filter(item => item.produk.id !== produkId);
  }

  hitungTotal(): number {
    return this.items.reduce((total, item) => total + item.subtotal, 0);
  }

  hitungTotalKeuntungan(): number {
    return this.items.reduce((totalProfit, item) => {
      const profitPerItem = item.produk.hargaJual - item.produk.hargaBeli;
      return totalProfit + (profitPerItem * item.jumlah);
    }, 0);
  }

  hitungJumlahItem(): number {
    return this.items.reduce((total, item) => total + item.jumlah, 0);
  }

  kosongkanKeranjang(): void {
    this.items = [];
  }
}
