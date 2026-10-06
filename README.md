# SIMOBILE - Aplikasi Kasir Mobile Toko Makmur Jaya (UTS Ionic Angular)

![Ionic Angular](https://img.shields.io/badge/Ionic-9.0-blue?logo=ionic)
![Angular](https://img.shields.io/badge/Angular-22.1-red?logo=angular)
![License](https://img.shields.io/badge/Status-UTS%20Completed-brightgreen)

Prototipe aplikasi kasir berbasis mobile **SIMOBILE** yang dirancang khusus untuk memenuhi kebutuhan operasional toko kelontong **"Toko Makmur Jaya"** milik Bu Marni. Aplikasi ini dibuat menggunakan kerangka kerja **Ionic Angular** tanpa ketergantungan API/Database eksternal (menggunakan state management berbasis Angular Services & LocalStorage).

Repository GitHub Target: [https://github.com/AcediaArmagedon/SIMOBILE](https://github.com/AcediaArmagedon/SIMOBILE)

---


   Akses `http://localhost:4200`

---

## Fitur-Fitur & Ketentuan Teknis yang Diimplementasikan

Aplikasi ini mengimplementasikan 100% seluruh poin teknis yang dipersyaratkan pada **Soal UTS Pemrograman Mobile**:

### 1. Struktur Navigasi Utama (Tabs & Drawer Menu)
- **Ionic Bottom Tabs**: 4 Tab utama (Dashboard, Katalog Produk, Keranjang Belanja dengan Badge Indikator, Riwayat Transaksi, dan Profil & Pengaturan).
- **Side Drawer Menu (`ion-menu`)**: Menu geser samping yang berisi akses cepat ke seluruh halaman, toggle Mode Gelap, serta informasi profil Bu Marni.

### 2. Halaman Dashboard (Ringkasan Kasir)
- Tampilan kartu metrik real-time: **Total Produk Terdaftar**, **Jumlah Transaksi Hari Ini**, **Total Omzet Penjualan**, dan **Profit / Keuntungan Bersih**.
- Widget **Produk Terlaris** yang dihitung secara dinamis dari riwayat penjualan hari ini.
- Menggunakan **Interpolation Binding** (`{{ ringkasan?.totalPenjualanHariIni | number }}`) langsung dari Angular `TransaksiService`.

### 3. Pencarian Produk Real-Time & Filter Kategori
- **Pencarian Instant**: Pencarian kata kunci menggunakan `[(ngModel)]` (two-way binding) pada `ion-searchbar`, langsung menyaring produk saat mengetik tanpa tombol submit.
- **Filter Chips**: Pengelompokan produk berdasarkan kategori (Sembako, Minuman, Makanan Ringan, Bumbu Dapur, Kebersihan).

### 4. Detail Produk via Route Parameter (`/produk-detail/:id`)
- Navigasi dinamis dengan membaca parameter URL `:id` via `ActivatedRoute`.
- Menampilkan rincian lengkap: Stok sisa, Harga Beli (Modal), Harga Jual (Kasir), serta kalkulasi Untung per unit beserta persentase marginnya.

### 5. Property & Event Binding
- **Fallback Gambar Default**: Menggunakan property binding `[src]="item.foto || defaultImage"` untuk menampilkan gambar placeholder jika foto produk kosong/belum diunggah.
- **Disabled State**: Property binding `[disabled]="item.stok === 0"` yang secara otomatis mengunci tombol "Tambah ke Keranjang" jika stok barang habis.
- **Event Binding**: Menangani interaksi klik pengguna dengan `(click)="tambahKeKeranjang(item)"` dan `(ionInput)="onSearchChange()"`.

### 6. Form Tambah & Edit Produk (Reactive Forms & Validasi Complete)
- Menggunakan **Reactive Form** (`FormGroup`, `FormBuilder`, `Validators`).
- Validasi lengkap:
  - `nama`: Wajib diisi & minimal 3 karakter.
  - `hargaBeli`: Wajib angka & harus > 0.
  - `hargaJual`: Wajib angka & harus > 0.
  - `stok`: Wajib diisi & tidak boleh negatif (&ge; 0).
- **Informatif Error Message**: Pesan kesalahan berwarna merah yang muncul secara real-time tepat di bawah field yang invalid tanpa mereset atau menghilangkan isian pengguna sebelumnya.

### 7. Pemisahan Logika via Angular Services (Minimal 3 Service)
Proyek ini memisahkan logika bisnis secara penuh ke dalam **4 Angular Services**:
1. `ProdukService`: Pengelolaan data produk, pencarian real-time, filter, dan update stok.
2. `KeranjangService`: Logika item keranjang, penambahan qty, hitung total subtotal, dan profit.
3. `TransaksiService`: Pencatatan faktur checkout, riwayat nota, dan kalkulasi dashboard.
4. `ThemeService`: Pengelolaan preferensi mode gelap (Dark Mode) dan LocalStorage persistence.

### 8. Custom Theme & Mode Gelap (Dark Mode)
- **Identitas Warna Toko Kelontong**: Menggunakan palet warna khusus Toko Makmur Jaya (Hijau Emerald `#2e7d32` dan Amber Gold `#f57f17`).
- **Dark Mode Switcher**: Toggle pengubah mode gelap/terang di menu drawer & profil yang otomatis menyimpan preferensi ke LocalStorage.

### 9. Custom CSS Animations & Micro-Interactions
- **Swipe-to-Delete Animation**: Menggunakan `ion-item-sliding` pada list katalog produk dan keranjang belanja.
- **Badge Bounce & Fade-in Transitions**: Animasi CSS custom saat item masuk keranjang dan kartu produk dimuat.

### 10. Keranjang & Simulasi Checkout Struk
- Menghitung total belanja secara otomatis.
- Tombol **"Konfirmasi Transaksi"** yang melakukan penulisan faktur transaksi baru, **pengurangan stok produk otomatis**, dan pencatatan ke Riwayat Transaksi.

### 11. Riwayat Transaksi & Detail Struk Modal
- Tampilan daftar transaksi sebelumnya yang dapat diklik untuk membuka **Modal Struk Nota Penjualan** berisi rincian item yang dibeli, harga beli, harga jual, dan total profit kasir.

---

## Minimal 10 Data Dummy Produk Teruji

Aplikasi dilengkapi dengan 12 data dummy awal yang mencakup variasi harga, kategori, serta status stok (termasuk stok 0 dan foto kosong untuk pengujian):
1. **Beras Pandan Wangi 5kg** (Sembako - Stok: 15)
2. **Minyak Goreng Bimoli 2L** (Sembako - Stok: 8)
3. **Gula Pasir Gulaku 1kg** (Sembako - Stok: 0 [Uji stok habis & fallback foto])
4. **Teh Celup SariWangi 25s** (Minuman - Stok: 25)
5. **Kopi Kapal Api Royale 165g** (Minuman - Stok: 12 [Uji fallback foto])
6. **Indomie Goreng Spesial 85g** (Makanan Ringan - Stok: 50)
7. **Biskuit Khong Guan 1600g** (Makanan Ringan - Stok: 3)
8. **Kecap Manis Bango 520ml** (Bumbu Dapur - Stok: 0 [Uji stok habis])
9. **Garam Dapur Cap Kapal 250g** (Bumbu Dapur - Stok: 40 [Uji fallback foto])
10. **Sabun Cuci Piring Mama Lemon 780ml** (Kebersihan - Stok: 10)
11. **Detergen Rinso Anti Noda 770g** (Kebersihan - Stok: 14)
12. **Susu UHT Ultra Milk Cokelat 1L** (Minuman - Stok: 18)

---

## 👤 Informasi Pengembang

- **Aplikasi**: SIMOBILE - Toko Makmur Jaya
- **Mata Kuliah**: Pemrograman Mobile (UTS Gasal 2026/2027)
- **Repository**: [https://github.com/AcediaArmagedon/SIMOBILE](https://github.com/AcediaArmagedon/SIMOBILE)
