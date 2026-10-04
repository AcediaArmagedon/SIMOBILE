import { Injectable } from '@angular/core';

export interface Produk {
  id: number;
  nama: string;
  kategori: string;
  hargaBeli: number;
  hargaJual: number;
  stok: number;
  foto: string;
  deskripsi: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProdukService {
  // Default placeholder image when product photo is empty or missing
  public readonly DEFAULT_IMAGE = 'https://placehold.co/400x400/2e7d32/ffffff?text=No+Photo';

  private listProduk: Produk[] = [
    {
      id: 1,
      nama: 'Beras Pandan Wangi 5kg',
      kategori: 'Sembako',
      hargaBeli: 65000,
      hargaJual: 75000,
      stok: 15,
      foto: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&auto=format&fit=crop',
      deskripsi: 'Beras aromatik rasa pulen dan wangi kualitas super dari petani lokal.'
    },
    {
      id: 2,
      nama: 'Minyak Goreng Bimoli 2L',
      kategori: 'Sembako',
      hargaBeli: 32000,
      hargaJual: 38000,
      stok: 8,
      foto: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop',
      deskripsi: 'Minyak goreng kelapa sawit ganda penyaringan murni berkualitas.'
    },
    {
      id: 3,
      nama: 'Gula Pasir Gulaku 1kg',
      kategori: 'Sembako',
      hargaBeli: 14000,
      hargaJual: 17500,
      stok: 0, // Stock = 0 to test disabled "Tambah ke Keranjang" button requirement!
      foto: '', // Empty photo to test property binding fallback image!
      deskripsi: 'Gula pasir kristal putih murni higienis tanpa pemutih buatan.'
    },
    {
      id: 4,
      nama: 'Teh Celup SariWangi 25s',
      kategori: 'Minuman',
      hargaBeli: 6000,
      hargaJual: 8500,
      stok: 25,
      foto: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=400&auto=format&fit=crop',
      deskripsi: 'Teh hitam pilihan nusantara dengan aroma khas menyegarkan.'
    },
    {
      id: 5,
      nama: 'Kopi Kapal Api Royale 165g',
      kategori: 'Minuman',
      hargaBeli: 11000,
      hargaJual: 14000,
      stok: 12,
      foto: '', // Empty photo test
      deskripsi: 'Kopi bubuk murni racikan spesial dengan aroma tajam nikmat.'
    },
    {
      id: 6,
      nama: 'Indomie Goreng Spesial 85g',
      kategori: 'Makanan Ringan',
      hargaBeli: 2700,
      hargaJual: 3500,
      stok: 50,
      foto: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=400&auto=format&fit=crop',
      deskripsi: 'Mie instan goreng lezat dan praktis kesukaan masyarakat Indonesia.'
    },
    {
      id: 7,
      nama: 'Biskuit Khong Guan 1600g',
      kategori: 'Makanan Ringan',
      hargaBeli: 85000,
      hargaJual: 98000,
      stok: 3,
      foto: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&auto=format&fit=crop',
      deskripsi: 'Aneka biskuit renyah dalam kaleng merah ikonik untuk keluarga.'
    },
    {
      id: 8,
      nama: 'Kecap Manis Bango 520ml',
      kategori: 'Bumbu Dapur',
      hargaBeli: 21000,
      hargaJual: 25500,
      stok: 0, // Stock = 0 test
      foto: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&auto=format&fit=crop',
      deskripsi: 'Kecap manis gurih kental terbuat dari kedelai hitam berkualitas.'
    },
    {
      id: 9,
      nama: 'Garam Dapur Cap Kapal 250g',
      kategori: 'Bumbu Dapur',
      hargaBeli: 2000,
      hargaJual: 3000,
      stok: 40,
      foto: '', // Empty photo test
      deskripsi: 'Garam konsumsi beryodium murni penambah gurih masakan.'
    },
    {
      id: 10,
      nama: 'Sabun Cuci Piring Mama Lemon 780ml',
      kategori: 'Kebersihan',
      hargaBeli: 13500,
      hargaJual: 16500,
      stok: 10,
      foto: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop',
      deskripsi: 'Cairan pencuci piring ekstrak jeruk nipis hilangkan lemak membandel.'
    },
    {
      id: 11,
      nama: 'Detergen Rinso Anti Noda 770g',
      kategori: 'Kebersihan',
      hargaBeli: 19000,
      hargaJual: 23000,
      stok: 14,
      foto: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?w=400&auto=format&fit=crop',
      deskripsi: 'Detergen bubuk formula ampuh hilangkan noda sekali kucek.'
    },
    {
      id: 12,
      nama: 'Susu UHT Ultra Milk Cokelat 1L',
      kategori: 'Minuman',
      hargaBeli: 16000,
      hargaJual: 19500,
      stok: 18,
      foto: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop',
      deskripsi: 'Susu sapi segar steril rasa cokelat kaya kalsium dan nutrisi.'
    }
  ];

  constructor() {}

  getProduk(): Produk[] {
    return [...this.listProduk];
  }

  getProdukById(id: number): Produk | undefined {
    return this.listProduk.find(p => p.id === id);
  }

  getKategoriList(): string[] {
    const categories = this.listProduk.map(p => p.kategori);
    return ['Semua', ...Array.from(new Set(categories))];
  }

  searchProduk(query: string = '', kategori: string = 'Semua'): Produk[] {
    let result = [...this.listProduk];
    
    if (kategori && kategori !== 'Semua') {
      result = result.filter(p => p.kategori.toLowerCase() === kategori.toLowerCase());
    }

    if (query && query.trim() !== '') {
      const q = query.toLowerCase().trim();
      result = result.filter(p => 
        p.nama.toLowerCase().includes(q) || 
        p.kategori.toLowerCase().includes(q) ||
        p.deskripsi.toLowerCase().includes(q)
      );
    }

    return result;
  }

  tambahProduk(data: Omit<Produk, 'id'>): Produk {
    const newId = this.listProduk.length > 0 ? Math.max(...this.listProduk.map(p => p.id)) + 1 : 1;
    const newProduk: Produk = {
      id: newId,
      ...data,
      foto: data.foto || ''
    };
    this.listProduk.unshift(newProduk);
    return newProduk;
  }

  updateProduk(id: number, data: Partial<Produk>): boolean {
    const index = this.listProduk.findIndex(p => p.id === id);
    if (index !== -1) {
      this.listProduk[index] = {
        ...this.listProduk[index],
        ...data
      };
      return true;
    }
    return false;
  }

  hapusProduk(id: number): boolean {
    const index = this.listProduk.findIndex(p => p.id === id);
    if (index !== -1) {
      this.listProduk.splice(index, 1);
      return true;
    }
    return false;
  }

  kurangiStok(id: number, jumlah: number): boolean {
    const produk = this.getProdukById(id);
    if (produk && produk.stok >= jumlah) {
      produk.stok -= jumlah;
      return true;
    }
    return false;
  }
}
