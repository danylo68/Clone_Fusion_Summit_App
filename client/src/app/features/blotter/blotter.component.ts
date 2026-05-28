import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector:   'app-blotter',
  standalone: true,
  imports:    [CommonModule, FormsModule, DecimalPipe, RouterLink],
  template: `
    <div class="fade-in">

      <div class="page-header">
        <div>
          <h1>Trade Blotter</h1>
          <div class="sub">{{ total }} trades · Page {{ page }} / {{ pages }}</div>
        </div>
        <a class="btn btn-primary" routerLink="/deal-entry">+ Nouveau Trade</a>
      </div>

      <!-- Filtres -->
      <div class="filters-bar">
        <input class="ctrl" [(ngModel)]="f.search"
               placeholder="Ref, contrepartie, paire FX..."
               style="flex:1;min-width:180px"
               (ngModelChange)="onFilter()">

        <select class="ctrl" [(ngModel)]="f.tradeType" (ngModelChange)="onFilter()">
          <option value="">Tous types</option>
          <option value="FX_SPOT">FX Spot</option>
          <option value="FX_SWAP">FX Swap</option>
          <option value="BOND">Bond</option>
          <option value="REPO">Repo</option>
          <option value="CDS">CDS</option>
          <option value="IRS">IRS</option>
          <option value="CCS">CCS</option>
        </select>

        <select class="ctrl" [(ngModel)]="f.status" (ngModelChange)="onFilter()">
          <option value="">Tous statuts</option>
          <option value="NEW">New</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="SETTLED">Settled</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="AMENDED">Amended</option>
        </select>

        <select class="ctrl" [(ngModel)]="f.desk" (ngModelChange)="onFilter()">
          <option value="">Tous desks</option>
          <option value="FX">FX</option>
          <option value="RATES">Rates</option>
          <option value="CREDIT">Credit</option>
          <option value="EQUITY">Equity</option>
        </select>

        <input class="ctrl" type="date" [(ngModel)]="f.dateFrom" (ngModelChange)="onFilter()">
        <input class="ctrl" type="date" [(ngModel)]="f.dateTo"   (ngModelChange)="onFilter()">

        <button class="btn btn-ghost" (click)="clearFilters()">✕ Reset</button>
      </div>

      <!-- Table -->
      <div class="table-container">
        @if (loading) {
          <div class="loading">Chargement du blotter...</div>
        } @else {
          <table>
            <thead>
              <tr>
                <th>REF</th>
                <th>TYPE</th>
                <th>DIR</th>
                <th>DATE</th>
                <th>CONTREPARTIE</th>
                <th>TRADER</th>
                <th style="text-align:right">NOTIONNEL</th>
                <th>CCY</th>
                <th>PAIRE / ISIN</th>
                <th style="text-align:right">PRIX / TAUX</th>
                <th>STATUT</th>
                <th>DESK</th>
              </tr>
            </thead>
            <tbody>
              @for (t of trades; track t.id) {
                <tr (click)="select(t)" [style.cursor]="'pointer'"
                    [style.outline]="selected?.id === t.id ? '1px solid var(--fds-primary)' : 'none'">

                  <td><span class="mono" style="color:var(--text-accent);font-size:11px">{{ t.tradeRef }}</span></td>

                  <td><span class="badge" [class]="t.tradeType.toLowerCase().replace('_','')">{{ t.tradeType }}</span></td>

                  <td style="font-weight:600;font-size:11px"
                      [style.color]="t.direction === 'BUY' ? 'var(--color-confirmed)' : 'var(--color-cancelled)'">
                    {{ t.direction }}
                  </td>

                  <td class="mono" style="font-size:11px">{{ t.tradeDate }}</td>

                  <td style="max-width:130px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
                    {{ t.counterparty?.name ?? '—' }}
                  </td>

                  <td style="font-size:11px;color:var(--text-secondary)">
                    {{ t.trader?.reference ?? '—' }}
                  </td>

                  <td class="mono" style="text-align:right">{{ t.notional | number:'1.0-0' }}</td>

                  <td style="font-size:11px;color:var(--text-secondary)">{{ t.notionalCurrency }}</td>

                  <td class="mono" style="font-size:11px;color:var(--color-fx-spot)">
                    {{ t.currencyPair || t.bond?.isin || '—' }}
                  </td>

                  <td class="mono" style="text-align:right;font-size:11px">
                    {{ (t.exchangeRate || t.price) | number:'1.2-6' }}
                  </td>

                  <td><span class="badge" [class]="t.status.toLowerCase()">{{ t.status }}</span></td>

                  <td style="font-size:11px;color:var(--text-secondary)">{{ t.desk }}</td>
                </tr>
              }
            </tbody>
          </table>

          <!-- Pagination -->
          <div class="pagination">
            <span>{{ total }} résultats</span>
            <div style="display:flex;gap:6px;align-items:center">
              <button class="btn btn-ghost" [disabled]="page === 1" (click)="prev()">← Préc</button>
              <span>{{ page }} / {{ pages }}</span>
              <button class="btn btn-ghost" [disabled]="page === pages" (click)="next()">Suiv →</button>
            </div>
            <select class="ctrl" [(ngModel)]="limit" (ngModelChange)="load()">
              <option [value]="25">25 / page</option>
              <option [value]="50">50 / page</option>
              <option [value]="100">100 / page</option>
            </select>
          </div>
        }
      </div>

      <!-- Détail -->
      @if (selected) {
        <div class="card fade-in" style="margin-top:16px">
          <div class="card-header">
            <h3>Détail — <span class="mono" style="color:var(--text-accent)">{{ selected.tradeRef }}</span></h3>
            <button class="btn btn-ghost" (click)="selected = null">✕</button>
          </div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;font-size:12px">
            <div><div style="color:var(--text-secondary)">Type</div>
              <span class="badge" [class]="selected.tradeType.toLowerCase().replace('_','')">{{ selected.tradeType }}</span>
            </div>
            <div><div style="color:var(--text-secondary)">Statut</div>
              <span class="badge" [class]="selected.status.toLowerCase()">{{ selected.status }}</span>
            </div>
            <div><div style="color:var(--text-secondary)">Direction</div><div>{{ selected.direction }}</div></div>
            <div><div style="color:var(--text-secondary)">Desk</div><div>{{ selected.desk }}</div></div>
            <div><div style="color:var(--text-secondary)">Trade Date</div><div class="mono">{{ selected.tradeDate }}</div></div>
            <div><div style="color:var(--text-secondary)">Value Date</div><div class="mono">{{ selected.valueDate || '—' }}</div></div>
            <div><div style="color:var(--text-secondary)">Maturité</div><div class="mono">{{ selected.maturityDate || '—' }}</div></div>
            <div><div style="color:var(--text-secondary)">Notionnel</div>
              <div class="mono">{{ selected.notional | number:'1.0-0' }} {{ selected.notionalCurrency }}</div>
            </div>
            <div><div style="color:var(--text-secondary)">Contrepartie</div><div>{{ selected.counterparty?.name }}</div></div>
            <div><div style="color:var(--text-secondary)">Entité légale</div><div>{{ selected.legalEntity?.name || '—' }}</div></div>
            <div><div style="color:var(--text-secondary)">Trader</div>
              <div>{{ selected.trader?.firstName }} {{ selected.trader?.lastName }}</div>
            </div>
            @if (selected.currencyPair) {
              <div><div style="color:var(--text-secondary)">Paire FX</div><div class="mono">{{ selected.currencyPair }}</div></div>
              <div><div style="color:var(--text-secondary)">Taux</div><div class="mono">{{ selected.exchangeRate }}</div></div>
            }
            @if (selected.bond) {
              <div><div style="color:var(--text-secondary)">ISIN</div><div class="mono">{{ selected.bond.isin }}</div></div>
              <div><div style="color:var(--text-secondary)">Prix</div><div class="mono">{{ selected.price }}</div></div>
            }
          </div>
        </div>
      }

    </div>
  `,
})
export class BlotterComponent implements OnInit {
  trades:   any[] = [];
  total  = 0;
  page   = 1;
  pages  = 1;
  limit  = 50;
  loading = false;
  selected: any = null;
  f: Record<string, any> = {};

  constructor(private readonly api: ApiService) {}
  ngOnInit() { this.load(); }

  load() {
    this.loading = true;
    this.api.getTrades({ ...this.f, page: this.page, limit: this.limit }).subscribe({
      next: res => {
        const d = res.data ?? res;
        this.trades = d.items;
        this.total  = d.total;
        this.pages  = d.pages;
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  onFilter()      { this.page = 1; this.load(); }
  clearFilters()  { this.f = {}; this.page = 1; this.load(); }
  select(t: any)  { this.selected = this.selected?.id === t.id ? null : t; }
  prev()          { if (this.page > 1) { this.page--; this.load(); } }
  next()          { if (this.page < this.pages) { this.page++; this.load(); } }
}
