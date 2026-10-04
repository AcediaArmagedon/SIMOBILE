import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Transaksi, TransaksiService } from '../services/transaksi.service';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.page.html',
  styleUrls: ['./transaksi.page.scss'],
  standalone: false,
})
export class TransaksiPage implements OnInit {
  listTransaksi: Transaksi[] = [];
  selectedTransaksi: Transaksi | null = null;
  isModalOpen: boolean = false;

  constructor(
    private transaksiService: TransaksiService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.loadRiwayat();
  }

  ionViewWillEnter() {
    this.loadRiwayat();
  }

  loadRiwayat() {
    this.listTransaksi = this.transaksiService.getRiwayat();
  }

  bukaDetail(trx: Transaksi) {
    this.selectedTransaksi = trx;
    this.isModalOpen = true;
  }

  tutupDetail() {
    this.isModalOpen = false;
    this.selectedTransaksi = null;
  }
}

