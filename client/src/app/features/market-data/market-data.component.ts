import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector:   'app-market-data',
  standalone: true,
  imports:    [CommonModule, DecimalPipe],
  template: `
    <div class="fade-in">
      <div class="page-header">
        <div><h1>Market Data</h1><div class="sub">FX · Taux d'intérêt · Spreads crédit · Prix obligataires</div></div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px">

        <div class="card">
          <div class="card-header"><h3>🌍 FX Rates</h3></div>
          @for (r of fx; track r.ticker) {
            <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border-light)">
              <span style="font-weight:600;color:var(--color-fx-spot)">{{ r.ticker }}</span>
              <span class="mono">{{ r.value | number:'1.4-6' }}</span>
            </div>
          }
          @if (!fx.length) { <div class="loading" style="padding:20px">Chargement...</div> }
        </div>

        <div class="card">
          <div class="card-header"><h3>📈 Taux d'intérêt</h3></div>
          @for (r of rates; track r.ticker) {
            <div style="display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid var(--border-light)">
              <div>
                <span style="font-weight:600">{{ r.ticker }}</span>
                @if (r.tenor) { <span style="font-size:10px;color:var(--text-muted);margin-left:6px">{{ r.tenor }}</span> }
              </div>
              <span class="mono">{{ r.value | number:'1.3-4' }}%</span>
            </div>
          }
          @if (!rates.length) { <div class="loading" style="padding:20px">Chargement...</div> }
        </div>

        <div class="card">
          <div class="card-header"><h3>📉 Credit Spreads (bps)</h3></div>
          @for (r of spreads; track r.ticker) {
            <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border-light)">
              <span style="color:var(--color-cds)">{{ r.ticker }}</span>
              <span class="mono">{{ r.value | number:'1.1-2' }} bps</span>
            </div>
          }
          @if (!spreads.length) { <div class="loading" style="padding:20px">Chargement...</div> }
        </div>

        <div class="card">
          <div class="card-header"><h3>📋 Prix Obligataires</h3></div>
          @for (r of bondPrices; track r.ticker) {
            <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border-light)">
              <span style="color:var(--color-bond)">{{ r.ticker }}</span>
              <span class="mono">{{ r.value | number:'1.2-4' }}</span>
            </div>
          }
          @if (!bondPrices.length) { <div class="loading" style="padding:20px">Chargement...</div> }
        </div>

      </div>
    </div>
  `,
})
export class MarketDataComponent implements OnInit {
  fx:         any[] = [];
  rates:      any[] = [];
  spreads:    any[] = [];
  bondPrices: any[] = [];

  constructor(private readonly api: ApiService) {}

  ngOnInit() {
    this.api.getFxRates().subscribe(r => this.fx = r.data ?? r);
    this.api.getRates().subscribe(r => this.rates = r.data ?? r);
    this.api.getCreditSpreads().subscribe(r => this.spreads = r.data ?? r);
    this.api.getBondPrices().subscribe(r => this.bondPrices = r.data ?? r);
  }
}
