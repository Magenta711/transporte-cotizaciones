import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { QuoteService } from '../core/quote.service';
import { AuthService } from '../core/auth.service';

interface Quote {
  id: string;
  client: string;
  type: string;
  distance: number;
  number_persons: number;
  time: number;
  origin: string;
  destination: string;
  date: string;
  price: number;
}

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.scss'],
})
export class QuotesComponent {
  quotes: Quote[] = this.quoteSV.read();
  editingId: string | null = null;

  quoteForm = this.fb.group({
    client: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    distance: new FormControl('', Validators.required),
    number_persons: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    origin: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });

  constructor(
    private fb: FormBuilder,
    private quoteSV: QuoteService,
    private authSV: AuthService
  ) {}

  addOrUpdateQuote(): void {
    if (this.quoteForm.invalid) return;

    const formValue = this.quoteForm.value;

    if (this.editingId !== null) {
      this.quoteSV.update(this.editingId, { ...formValue, id: this.editingId });
      this.quotes = this.quoteSV.read();
      this.editingId = null;
    } else {
      this.quoteSV.add({
        id: Date.now(),
        ...formValue,
      });
      this.quotes = this.quoteSV.read();
    }

    this.quoteForm.reset();
  }

  editQuote(quote: Quote): void {
    this.editingId = quote.id;
    this.quoteForm.setValue({
      client: quote.client,
      origin: quote.origin,
      destination: quote.destination,
      date: quote.date,
      price: quote.price,
    });
  }

  deleteQuote(id: string): void {
    this.quoteSV.delete(id);
    this.quotes = this.quoteSV.read();
  }

  cancelEdit(): void {
    this.editingId = null;
    this.quoteForm.reset();
  }

  logout(): void {
    this.authSV.logout();
  }
}
