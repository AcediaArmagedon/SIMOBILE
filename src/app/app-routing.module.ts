import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardPageModule)
  },
  {
    path: 'produk',
    loadChildren: () =>
      import('./produk/produk.module').then(m => m.ProdukPageModule)
  },
  {
    path: 'produk-detail/:id',
    loadChildren: () =>
      import('./produk-detail/produk-detail.module').then(m => m.ProdukDetailPageModule)
  },
  {
    path: 'produk-form',
    loadChildren: () =>
      import('./produk-form/produk-form.module').then(m => m.ProdukFormPageModule)
  },
  {
    path: 'produk-form/:id',
    loadChildren: () =>
      import('./produk-form/produk-form.module').then(m => m.ProdukFormPageModule)
  },
  {
    path: 'keranjang',
    loadChildren: () =>
      import('./keranjang/keranjang.module').then(m => m.KeranjangPageModule)
  },
  {
    path: 'transaksi',
    loadChildren: () =>
      import('./transaksi/transaksi.module').then(m => m.TransaksiPageModule)
  },
  {
    path: 'profil',
    loadChildren: () =>
      import('./profil/profil.module').then(m => m.ProfilPageModule)
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'produk/:id',
    loadChildren: () => import('./produk-detail/produk-detail.module').then( m => m.ProdukDetailPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}