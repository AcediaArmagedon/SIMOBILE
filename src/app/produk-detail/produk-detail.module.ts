import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular/lazy';

import { ProdukDetailPageRoutingModule } from './produk-detail-routing.module';

import { ProdukDetailPage } from './produk-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProdukDetailPageRoutingModule
  ],
  declarations: [ProdukDetailPage]
})
export class ProdukDetailPageModule {}
