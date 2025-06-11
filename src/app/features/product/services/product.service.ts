import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    { id: 1, name: 'Awesome Gadget', price: 29.99, description: 'A truly awesome gadget for all your needs.', imageUrl: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Cool Widget', price: 19.99, description: 'This widget is cooler than the other side of the pillow.', imageUrl: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Super Gizmo', price: 49.99, description: 'The super gizmo that will change your life!', imageUrl: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Fantastic Thingamajig', price: 9.99, description: 'Affordable and fantastic, a must-have thingamajig.', imageUrl: 'https://via.placeholder.com/150' }
  ];

  constructor() { }

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(product => product.id === id));
  }
}
