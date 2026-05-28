import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector:   'app-positions',
  standalone: true,
  imports:    [CommonModule, DecimalPipe],
  template: `
    <div class="fade-in">
      <div class="page-header">
        <div><h1>Positions & P&L</h1><div class="sub">MTM · Daily P&L · DV01 · Intérêts courus</div></div>
      </div>

      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-label">MTM TOTAL</div>
          <div class="kpi-value mono" [class.pnl-pos]="p?.totalMtm>0" [class.pnl-neg]="p?.totalMtm<0">
            {{ p?.totalMtm | number:'1.0-0' }} €
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">P&L JOUR</div>
          <div class="kpi-value mono" [class.pnl-pos]="p?.totalDayPnl>0" [class.pnl-neg]="p?.totalDayPnl<0">
            {{ p?.totalDayPnl | number:'1.0-0' }} €
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">P&L TOTAL</div>
          <div class="kpi-value mono" [class.pnl-pos]="p?.totalPnl>0" [class.pnl-neg]="p?.totalPnl<0">
            {{ p?.totalPnl | number:'1.0-0' }} €
          </div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">DV01</div>
          <div class="kpi-value mono">{{ p?.totalDv01 | number:'1.0-2' }}</div>
        </div>
      </div>

      <div class="table-container">
        @if (loading) { <div class="loading">Chargement...</div> }
        @else {
          <table>
            <thead>
              <tr>
                <th>TRADE REF</th><th>TYPE</th><th>CONTREPARTIE</th>
                <th style="text-align:right">MTM</th>
                <th style="text-align:right">P&L JOUR</th>
                <th style="text-align:right">P&L TOTAL</th>
                <th style="text-align:right">DV01</th>
                <th style="text-align:right">PRIX CLEAN</th>
                <th>CCY</th>
              </tr>
            </thead>
            <tbody>
              @for (v of valuations; track v.id) {
                <tr>
                  <td class="mono" style="color:var(--text-accent);font-size:11px">{{ v.trade?.tradeRef }}</td>
                  <td>
                    @if (v.trade?.tradeType) {
                      <span class="badge" [class]="v.trade.tradeType.toLowerCase().replace('_','')">{{ v.trade.tradeType }}</span>
                    }
                  </td>
                  <td style="font-size:12px">{{ v.trade?.counterparty?.name | slice:0:20 }}</td>
                  <td class="mono" style="text-align:right" [class.pnl-pos]="v.mtm>0" [class.pnl-neg]="v.mtm<0">
                    {{ v.mtm | number:'1.0-0' }}
                  </td>
                  <td class="mono" style="text-align:right" [class.pnl-pos]="v.dayPnl>0" [class.pnl-neg]="v.dayPnl<0">
                    {{ v.dayPnl | number:'1.0-0' }}
                  </td>
                  <td class="mono" style="text-align:right" [class.pnl-pos]="v.totalPnl>0" [class.pnl-neg]="v.totalPnl<0">
                    {{ v.totalPnl | number:'1.0-0' }}
                  </td>
                  <td class="mono" style="text-align:right;font-size:11px">{{ v.dv01 | number:'1.0-2' }}</td>
                  <td class="mono" style="text-align:right;font-size:11px">{{ v.cleanPrice | number:'1.4-6' }}</td>
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
export class PositionsComponent implements OnInit {
  valuations: any[] = [];
  p:          any = null;
  loading     = false;

  constructor(private readonly api: ApiService) {}

  ngOnInit() {
    this.loading = true;
    this.api.getValuations().subscribe({
      next: r => { this.valuations = r.data ?? r; this.loading = false; },
      error: () => this.loading = false,
    });
    this.api.getPortfolioSummary().subscribe(r => this.p = r.data ?? r);
  }
}
