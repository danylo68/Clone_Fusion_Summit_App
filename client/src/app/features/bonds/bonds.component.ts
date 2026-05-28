import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector:   'app-bonds',
  standalone: true,
  imports:    [CommonModule, DecimalPipe, FormsModule],
  template: `
    <div class="fade-in">
      <div class="page-header">
        <div><h1>Obligations</h1><div class="sub">Référentiel obligataire — {{ bonds.length }} titres</div></div>
      </div>

      <div class="filters-bar">
        <select class="ctrl" [(ngModel)]="country" (ngModelChange)="load()">
          <option value="">Tous les pays</option>
          <option value="FRA">France</option>
          <option value="DEU">Allemagne</option>
          <option value="ITA">Italie</option>
          <option value="GBR">Royaume-Uni</option>
          <option value="USA">États-Unis</option>
          <option value="ESP">Espagne</option>
        </select>
        <select class="ctrl" [(ngModel)]="sector" (ngModelChange)="load()">
          <option value="">Tous secteurs</option>
          <option value="SOVEREIGN">Souverain</option>
          <option value="FINANCIAL">Financier</option>
          <option value="CORPORATE">Corporate</option>
          <option value="UTILITIES">Utilities</option>
          <option value="ENERGY">Énergie</option>
        </select>
      </div>

      <div class="table-container">
        @if (loading) { <div class="loading">Chargement...</div> }
        @else {
          <table>
            <thead>
              <tr>
                <th>ISIN</th><th>TICKER</th><th>ÉMETTEUR</th>
                <th>CCY</th><th style="text-align:right">COUPON</th>
                <th>FRÉQUENCE</th><th>ÉMISSION</th><th>MATURITÉ</th>
                <th>RATING</th><th>PAYS</th><th>SECTEUR</th><th>TYPE</th>
              </tr>
            </thead>
            <tbody>
              @for (b of bonds; track b.id) {
                <tr>
                  <td class="mono" style="font-size:11px;color:var(--text-accent)">{{ b.isin }}</td>
                  <td style="font-weight:600;font-size:12px">{{ b.ticker }}</td>
                  <td style="font-size:12px;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">{{ b.issuer }}</td>
                  <td style="font-size:11px;color:var(--text-secondary)">{{ b.currency }}</td>
                  <td class="mono" style="text-align:right;color:var(--color-confirmed)">{{ (b.couponRate * 100) | number:'1.2-3' }}%</td>
                  <td style="font-size:11px;color:var(--text-secondary)">{{ b.couponFrequency }}</td>
                  <td class="mono" style="font-size:11px">{{ b.issueDate }}</td>
                  <td class="mono" style="font-size:11px">{{ b.maturityDate }}</td>
                  <td><span class="badge">{{ b.rating }}</span></td>
                  <td style="font-size:11px">{{ b.country }}</td>
                  <td style="font-size:11px;color:var(--text-secondary)">{{ b.sector }}</td>
                  <td style="font-size:11px;color:var(--text-secondary)">{{ b.type }}</td>
                </tr>
              }
            </tbody>
          </table>
        }
      </div>
    </div>
  `,
})
export class BondsComponent implements OnInit {
  bonds:   any[] = [];
  loading  = false;
  country  = '';
  sector   = '';

  constructor(private readonly api: ApiService) {}
  ngOnInit() { this.load(); }
  load() {
    this.loading = true;
    this.api.getBonds({ country: this.country, sector: this.sector }).subscribe({
      next: r => { this.bonds = r.data ?? r; this.loading = false; },
      error: () => this.loading = false,
    });
  }
}
