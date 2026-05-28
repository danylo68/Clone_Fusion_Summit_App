import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector:   'app-valuations',
  standalone: true,
  imports:    [CommonModule, DecimalPipe, FormsModule],
  template: `
    <div class="fade-in">
      <div class="page-header">
        <div><h1>Valorisations</h1><div class="sub">MTM journalier · Pricing · Accruals</div></div>
        <input class="ctrl" type="date" [(ngModel)]="date" (ngModelChange)="load()">
      </div>

      <div class="table-container">
        @if (loading) { <div class="loading">Chargement...</div> }
        @else {
          <table>
            <thead>
              <tr>
                <th>TRADE</th><th>DATE</th>
                <th style="text-align:right">MTM</th>
                <th style="text-align:right">P&L JOUR</th>
                <th style="text-align:right">DV01</th>
                <th style="text-align:right">PRIX DIRTY</th>
                <th style="text-align:right">PRIX CLEAN</th>
                <th style="text-align:right">INTÉRÊTS COURUS</th>
                <th>CCY</th>
              </tr>
            </thead>
            <tbody>
              @for (v of vals; track v.id) {
                <tr>
                  <td class="mono" style="color:var(--text-accent);font-size:11px">{{ v.trade?.tradeRef }}</td>
                  <td class="mono" style="font-size:11px">{{ v.valuationDate }}</td>
                  <td class="mono" style="text-align:right" [class.pnl-pos]="v.mtm>0" [class.pnl-neg]="v.mtm<0">{{ v.mtm | number:'1.0-0' }}</td>
                  <td class="mono" style="text-align:right" [class.pnl-pos]="v.dayPnl>0" [class.pnl-neg]="v.dayPnl<0">{{ v.dayPnl | number:'1.0-0' }}</td>
                  <td class="mono" style="text-align:right;font-size:11px">{{ v.dv01 | number:'1.0-2' }}</td>
                  <td class="mono" style="text-align:right;font-size:11px">{{ v.dirtyPrice | number:'1.4-6' }}</td>
                  <td class="mono" style="text-align:right;font-size:11px">{{ v.cleanPrice | number:'1.4-6' }}</td>
                  <td class="mono" style="text-align:right;font-size:11px">{{ v.accruedInterest | number:'1.0-0' }}</td>
                  <td style="font-size:11px;color:var(--text-secondary)">{{ v.currency }}</td>
                </tr>
              }
            </tbody>
          </table>
        }
      </div>
    </div>
  `,
})
export class ValuationsComponent implements OnInit {
  vals:    any[] = [];
  date     = '';
  loading  = false;

  constructor(private readonly api: ApiService) {}
  ngOnInit() { this.load(); }
  load() {
    this.loading = true;
    this.api.getValuations(this.date || undefined).subscribe({
      next: r => { this.vals = r.data ?? r; this.loading = false; },
      error: () => this.loading = false,
    });
  }
}
