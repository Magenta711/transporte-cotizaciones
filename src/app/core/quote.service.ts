import { Injectable } from '@angular/core';

export interface Quote {
  id: string;
  client: string;
  origin: string;
  destination: string;
  date: string;
  price: number;
}

@Injectable({ providedIn: 'root' })
export class QuoteService {
  private readonly storageKey = 'quotes';

  // Leyendo de localStorage si existe
  private _quotes: Quote[] = this.read();

  add(quote: Quote) {
    this._quotes.push({ ...quote });
    this.persist();
  }

  update(id: string, changes: Quote) {
    this._quotes = this._quotes.map((item) => {
      console.log('Current item:', item.id == id ? 'Yesss' : 'Not matching');
      return id == item.id ? { ...changes } : { ...item };
    });
    this.persist();
  }

  delete(id: string) {
    this._quotes.filter((q) => q.id !== id);
    this.persist();
  }

  read(): Quote[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }
  private persist() {
    localStorage.setItem(this.storageKey, JSON.stringify(this._quotes));
  }
}
