import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: false,
})
export class ProfilPage implements OnInit {
  isDarkMode: boolean = false;

  constructor(
    private themeService: ThemeService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.isDarkMode = this.themeService.isDark();
  }

  ionViewWillEnter() {
    this.isDarkMode = this.themeService.isDark();
  }

  async toggleDarkMode(event: any) {
    this.isDarkMode = event.detail.checked;
    this.themeService.setDarkMode(this.isDarkMode);
    const toast = await this.toastCtrl.create({
      message: this.isDarkMode ? 'Mode Gelap (Dark Mode) Aktif' : 'Mode Terang (Light Mode) Aktif',
      duration: 1500,
      color: 'secondary'
    });
    await toast.present();
  }
}

