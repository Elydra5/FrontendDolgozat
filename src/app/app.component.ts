import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'FrontendDolgozat'

  products: any[] = []
  newProduct = { id: null, name: '', category: '', description: '', price: null }
  language = 'en'

  translations: { [key: string]: { [key: string]: string } } = {
    en: {
      TITLE: 'Product Customization',
      NAME: 'Name',
      CATEGORY: 'Category',
      DESCRIPTION: 'Description',
      PRICE: 'Price',
      ADD: 'Add',
      UPDATE: 'Update',
      DELETE: 'Delete'
    },
    hu: {
      TITLE: 'Termék szerkesztés',
      NAME: 'Név',
      CATEGORY: 'Kategória',
      DESCRIPTION: 'Leírás',
      PRICE: 'Ár',
      ADD: 'Hozzáadás',
      UPDATE: 'Frissítés',
      DELETE: 'Törlés'
    }
  }

  constructor(private productService: ProductService) {}

  switchLanguage(lang: string) {
    this.language = lang
  }

  translate(key: string): string {
    return this.translations[this.language][key] || key
  }

  ngOnInit() {
    this.loadProducts()
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data ? Object.entries(data).map(([key, value]: any) => ({ ...value, id: key })) : []
    })
  }

  addProduct() {
    this.productService.createProduct(this.newProduct).subscribe(() => {
      this.loadProducts();
      this.newProduct = { id: null, name: '', category: '', description: '', price: null }
    })
  }

  updateProduct(product: any) {
    product.price = parseFloat(product.price).toFixed(2)
    this.productService.updateProduct(product).subscribe(() => this.loadProducts())
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(() => this.loadProducts())
  }
}
