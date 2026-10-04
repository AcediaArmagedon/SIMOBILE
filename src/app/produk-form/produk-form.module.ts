import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/lazy';

import { ProdukFormPageRoutingModule } from './produk-form-routing.module';
import { ProdukFormPage } from './produk-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ProdukFormPageRoutingModule
  ],
  declarations: [ProdukFormPage]
})
export class ProdukFormPageModule {}
