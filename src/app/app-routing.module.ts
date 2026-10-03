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