import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { KeranjangService } from './services/keranjang.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  isDarkMode = false;

  constructor(
    public themeService: ThemeService,
    public keranjangService: KeranjangService
  ) {}

  ngOnInit() {
    this.isDarkMode = this.themeService.isDark();
  }

  toggleDarkMode(event: any) {
    this.isDarkMode = event.detail.checked;
    this.themeService.setDarkMode(this.isDarkMode);
  }

  get totalItemsKeranjang(): number {
    return this.keranjangService.hitungJumlahItem();
  }
}

