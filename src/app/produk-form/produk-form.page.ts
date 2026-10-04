import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ProdukService } from '../services/produk.service';

@Component({
  selector: 'app-produk-form',
  templateUrl: './produk-form.page.html',
  styleUrls: ['./produk-form.page.scss'],
  standalone: false,
})
export class ProdukFormPage implements OnInit {
  produkForm!: FormGroup;
  isEditMode: boolean = false;
  produkId: number | null = null;
  kategoriList: string[] = ['Sembako', 'Minuman', 'Makanan Ringan', 'Bumbu Dapur', 'Kebersihan', 'Lain-lain'];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private produkService: ProdukService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.initForm();
    this.checkEditMode();
  }

  initForm() {
    this.produkForm = this.fb.group({
      nama: ['', [Validators.required, Validators.minLength(3)]],
      kategori: ['Sembako', [Validators.required]],
      hargaBeli: [null, [Validators.required, Validators.min(1)]],
      hargaJual: [null, [Validators.required, Validators.min(1)]],
      stok: [0, [Validators.required, Validators.min(0)]],
      foto: [''],
      deskripsi: ['']
    });
  }

  checkEditMode() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditMode = true;
      this.produkId = parseInt(idParam, 10);
      const existing = this.produkService.getProdukById(this.produkId);
      if (existing) {
        this.produkForm.patchValue({
          nama: existing.nama,
          kategori: existing.kategori,
          hargaBeli: existing.hargaBeli,
          hargaJual: existing.hargaJual,
          stok: existing.stok,
          foto: existing.foto,
          deskripsi: existing.deskripsi
        });
      }
    }
  }

  get f() {
    return this.produkForm.controls;
  }

  async simpanProduk() {
    if (this.produkForm.invalid) {
      this.produkForm.markAllAsTouched();
      const toast = await this.toastCtrl.create({
        message: 'Mohon periksa kembali isian form yang masih salah/kosong!',
        duration: 2000,
        color: 'warning'
      });
      await toast.present();
      return;
    }

    const formValues = this.produkForm.value;

    if (this.isEditMode && this.produkId) {
      const updated = this.produkService.updateProduk(this.produkId, formValues);
      if (updated) {
        const toast = await this.toastCtrl.create({
          message: `Produk "${formValues.nama}" berhasil diperbarui.`,
          duration: 2000,
          color: 'success'
        });
        await toast.present();
        this.router.navigate(['/produk']);
      }
    } else {
      const newProduct = this.produkService.tambahProduk(formValues);
      const toast = await this.toastCtrl.create({
        message: `Produk "${newProduct.nama}" berhasil ditambahkan.`,
        duration: 2000,
        color: 'success'
      });
      await toast.present();
      this.router.navigate(['/produk']);
    }
  }
}
