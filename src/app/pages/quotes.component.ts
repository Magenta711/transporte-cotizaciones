import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { QuoteService } from '../core/quote.service';
import { AuthService } from '../core/auth.service';

interface Quote {
  id: string;
  client: string;
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
    client: ['', Validators.required],
    origin: ['', Validators.required],
    destination: ['', Validators.required],
    date: [
      '',
      [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
    ],
    price: [0, [Validators.required, Validators.min(0)]],
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
