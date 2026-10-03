import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Product {

  products = [
    {
      id: 1,
      name: 'Beras Premium 5kg',
      category: 'Sembako',
      purchasePrice: 65000,
      sellingPrice: 75000,
      stock: 12,
      image: ''
    },
    {
      id: 2,
      name: 'Minyak Goreng 2L',
      category: 'Sembako',
      purchasePrice: 32000,
      sellingPrice: 38000,
      stock: 20,
      image: ''
    },
    {
      id: 3,
      name: 'Gula Pasir 1kg',
      category: 'Sembako',
      purchasePrice: 15000,
      sellingPrice: 18000,
      stock: 15,
      image: ''
    },
    {
      id: 4,
      name: 'Telur Ayam 1kg',
      category: 'Sembako',
      purchasePrice: 26000,
      sellingPrice: 30000,
      stock: 8,
      image: ''
    },
    {
      id: 5,
      name: 'Tepung Terigu 1kg',
      category: 'Bahan Masakan',
      purchasePrice: 11000,
      sellingPrice: 14000,
      stock: 18,
      image: ''
    },
    {
      id: 6,
      name: 'Kopi Bubuk 200g',
      category: 'Minuman',
      purchasePrice: 12000,
      sellingPrice: 16000,
      stock: 10,
      image: ''
    },
    {
      id: 7,
      name: 'Teh Celup 25pcs',
      category: 'Minuman',
      purchasePrice: 8000,
      sellingPrice: 11000,
      stock: 25,
      image: ''
    },
    {
      id: 8,
      name: 'Susu UHT 1L',
      category: 'Minuman',
      purchasePrice: 17000,
      sellingPrice: 21000,
      stock: 14,
      image: ''
    },
    {
      id: 9,
      name: 'Sabun Mandi',
      category: 'Perawatan',
      purchasePrice: 5000,
      sellingPrice: 7500,
      stock: 30,
      image: ''
    },
    {
      id: 10,
      name: 'Deterjen 800g',
      category: 'Kebutuhan Rumah',
      purchasePrice: 14000,
      sellingPrice: 18000,
      stock: 10,
      image: ''
    },
    {
      id: 11,
      name: 'Saus Sambal 250ml',
      category: 'Bumbu',
      purchasePrice: 9000,
      sellingPrice: 12000,
      stock: 0,
      image: ''
    },
    {
      id: 12,
      name: 'Kecap Manis 600ml',
      category: 'Bumbu',
      purchasePrice: 13000,
      sellingPrice: 17000,
      stock: 7,
      image: ''
    }
  ];

  getProducts() {
    return this.products;
  }

  getProductById(id: number) {
    return this.products.find(product => product.id === id);
  }

}