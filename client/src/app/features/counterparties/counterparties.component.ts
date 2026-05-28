import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector:   'app-counterparties',
  standalone: true,
  imports:    [CommonModule, FormsModule],
  template: `
    <div class="fade-in">
      <div class="page-header">
        <div><h1>Contreparties</h1><div class="sub">{{ counterparties.length }} contreparties actives</div></div>
      </div>

      <div class="filters-bar">
        <select class="ctrl" [(ngModel)]="activeTab" (ngModelChange)="switchTab()">
          <option value="counterparties">Contreparties</option>
          <option value="traders">Traders</option>
          <option value="legalEntities">Entités légales</option>
        </select>

        @if (activeTab === 'counterparties') {
          <select class="ctrl" [(ngModel)]="typeFilter" (ngModelChange)="load()">
            <option value="">Tous types</option>
            <option value="BANK">Banque</option>
            <option value="CORPORATE">Corporate</option>
            <option value="HEDGE_FUND">Hedge Fund</option>
            <option value="PENSION_FUND">Pension Fund</option>
          </select>
        }
        @if (activeTab === 'traders') {
          <select class="ctrl" [(ngModel)]="deskFilter" (ngModelChange)="load()">
            <option value="">Tous desks</option>
            <option value="FX">FX</option>
            <option value="RATES">Rates</option>
            <option value="CREDIT">Credit</option>
            <option value="EQUITY">Equity</option>
          </select>
        }
      </div>

      <!-- Contreparties -->
      @if (activeTab === 'counterparties') {
        <div class="table-container">
          @if (loading) { <div class="loading">Chargement...</div> }
          @else {
            <table>
              <thead>
                <tr><th>REF</th><th>NOM</th><th>TYPE</th><th>PAYS</th><th>VILLE</th><th>RATING</th><th>REFERENTIAL</th></tr>
              </thead>
              <tbody>
                @for (c of counterparties; track c.id) {
                  <tr>
                    <td class="mono" style="color:var(--text-accent);font-size:11px">{{ c.reference }}</td>
                    <td style="font-weight:500">{{ c.name }}</td>
                    <td><span class="badge" style="background:rgba(105,78,214,0.15);color:var(--fds-primary-light)">{{ c.type }}</span></td>
                    <td style="font-size:11px">{{ c.country }}</td>
                    <td style="font-size:11px;color:var(--text-secondary)">{{ c.city }}</td>
                    <td><span class="badge">{{ c.creditRating }}</span></td>
                    <td style="font-size:11px;color:var(--text-muted)">{{ c.referential }}</td>
                  </tr>
                }
              </tbody>
            </table>
          }
        </div>
      }

      <!-- Traders -->
      @if (activeTab === 'traders') {
        <div class="table-container">
          @if (loading) { <div class="loading">Chargement...</div> }
          @else {
            <table>
              <thead>
                <tr><th>REF</th><th>PRÉNOM</th><th>NOM</th><th>DESK</th></tr>
              </thead>
              <tbody>
                @for (t of traders; track t.id) {
                  <tr>
                    <td class="mono" style="color:var(--text-accent);font-size:11px">{{ t.reference }}</td>
                    <td>{{ t.firstName }}</td>
                    <td style="font-weight:500">{{ t.lastName }}</td>
                    <td><span class="badge" style="background:rgba(52,211,153,0.15);color:var(--color-bond)">{{ t.desk }}</span></td>
                  </tr>
                }
              </tbody>
            </table>
          }
        </div>
      }

      <!-- Entités légales -->
      @if (activeTab === 'legalEntities') {
        <div class="table-container">
          @if (loading) { <div class="loading">Chargement...</div> }
          @else {
            <table>
              <thead>
                <tr><th>REF</th><th>NOM</th><th>PAYS</th><th>DEVISE</th></tr>
              </thead>
              <tbody>
                @for (le of legalEntities; track le.id) {
                  <tr>
                    <td class="mono" style="color:var(--text-accent);font-size:11px">{{ le.reference }}</td>
                    <td style="font-weight:500">{{ le.name }}</td>
                    <td style="font-size:11px">{{ le.country }}</td>
                    <td style="font-size:11px;color:var(--color-fx-spot)">{{ le.currency }}</td>
                  </tr>
                }
              </tbody>
            </table>
          }
        </div>
      }

    </div>
  `,
})
export class CounterpartiesComponent implements OnInit {
  counterparties: any[] = [];
  traders:        any[] = [];
  legalEntities:  any[] = [];
  loading         = false;
  activeTab       = 'counterparties';
  typeFilter      = '';
  deskFilter      = '';

  constructor(private readonly api: ApiService) {}
  ngOnInit() { this.load(); }

  switchTab() { this.typeFilter = ''; this.deskFilter = ''; this.load(); }

  load() {
    this.loading = true;
    if (this.activeTab === 'counterparties') {
      this.api.getCounterparties({ type: this.typeFilter }).subscribe({
        next: r => { this.counterparties = r.data ?? r; this.loading = false; },
        error: () => this.loading = false,
      });
    } else if (this.activeTab === 'traders') {
      this.api.getTraders({ desk: this.deskFilter }).subscribe({
        next: r => { this.traders = r.data ?? r; this.loading = false; },
        error: () => this.loading = false,
      });
    } else {
      this.api.getLegalEntities().subscribe({
        next: r => { this.legalEntities = r.data ?? r; this.loading = false; },
        error: () => this.loading = false,
      });
    }
  }
}
