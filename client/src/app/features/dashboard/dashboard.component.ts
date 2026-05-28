import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector:   'app-dashboard',
  standalone: true,
  imports:    [CommonModule, DecimalPipe, RouterLink],
  template: `
    <div class="fade-in">

      <!-- Page header -->
      <div class="page-header">
        <div>
          <h1>Dashboard Capital Markets</h1>
          <div class="sub">Vue globale du portefeuille · Données du jour</div>
        </div>
        <a class="btn btn-primary" routerLink="/deal-entry">+ Nouveau Trade</a>
      </div>

      <!-- KPIs -->
      <div class="kpi-grid">

        <div class="kpi-card">
          <div class="kpi-label">TOTAL TRADES</div>
          <div class="kpi-value">{{ stats?.total ?? '—' }}</div>
          <div class="kpi-sub">tous statuts</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-label">MTM TOTAL</div>
          <div class="kpi-value mono"
               [class.pnl-pos]="portfolio?.totalMtm > 0"
               [class.pnl-neg]="portfolio?.totalMtm < 0">
            {{ portfolio?.totalMtm | number:'1.0-0' }} €
          </div>
          <div class="kpi-sub">Mark-to-Market</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-label">P&L DU JOUR</div>
          <div class="kpi-value mono"
               [class.pnl-pos]="portfolio?.totalDayPnl > 0"
               [class.pnl-neg]="portfolio?.totalDayPnl < 0">
            {{ portfolio?.totalDayPnl | number:'1.0-0' }} €
          </div>
          <div class="kpi-sub">Daily P&L</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-label">DV01</div>
          <div class="kpi-value mono">{{ portfolio?.totalDv01 | number:'1.0-2' }}</div>
          <div class="kpi-sub">Dollar Value 1bp</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-label">TÂCHES EN ATTENTE</div>
          <div class="kpi-value mono" style="color:var(--color-pending)">
            {{ taskStats?.pending ?? '—' }}
          </div>
          <div class="kpi-sub" style="color:var(--color-cancelled)">
            {{ taskStats?.critical ?? 0 }} critiques
          </div>
        </div>

        <div class="kpi-card">
          <div class="kpi-label">EN RETARD</div>
          <div class="kpi-value mono" style="color:var(--color-overdue)">
            {{ taskStats?.overdue ?? '—' }}
          </div>
          <div class="kpi-sub">tâches overdue</div>
        </div>

      </div>

      <!-- Grille charts -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px">

        <!-- Trades par type -->
        <div class="card">
          <div class="card-header"><h3>Trades par type</h3></div>
          @if (stats?.byType?.length) {
            <div style="display:flex;flex-direction:column;gap:8px">
              @for (item of stats.byType; track item.type) {
                <div style="display:flex;align-items:center;gap:10px">
                  <span class="badge" [class]="item.type.toLowerCase().replace('_','')">{{ item.type }}</span>
                  <div style="flex:1;background:var(--border);border-radius:2px;height:4px;overflow:hidden">
                    <div [style.width.%]="(item.count / stats.total) * 100"
                         [style.background]="typeColor(item.type)"
                         style="height:100%;border-radius:2px;transition:width 0.5s">
                    </div>
                  </div>
                  <span class="mono" style="font-size:11px;color:var(--text-secondary);min-width:36px;text-align:right">
                    {{ item.count }}
                  </span>
                  <span style="font-size:11px;color:var(--text-muted);min-width:38px">
                    {{ (item.count / stats.total * 100) | number:'1.0-1' }}%
                  </span>
                </div>
              }
            </div>
          } @else {
            <div class="loading">Chargement...</div>
          }
        </div>

        <!-- Trades par statut -->
        <div class="card">
          <div class="card-header"><h3>Trades par statut</h3></div>
          @if (stats?.byStatus?.length) {
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
              @for (item of stats.byStatus; track item.status) {
                <div style="background:var(--bg-surface);border-radius:6px;padding:10px">
                  <div style="font-size:10px;color:var(--text-secondary);margin-bottom:4px">{{ item.status }}</div>
                  <div class="mono" style="font-size:1.2rem;font-weight:600;margin-bottom:4px">{{ item.count }}</div>
                  <span class="badge" [class]="item.status.toLowerCase()">{{ item.status }}</span>
                </div>
              }
            </div>
          } @else {
            <div class="loading">Chargement...</div>
          }
        </div>

      </div>

      <!-- Desks + FX Rates -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">

        <div class="card">
          <div class="card-header"><h3>Trades par desk</h3></div>
          @for (item of stats?.byDesk; track item.desk) {
            <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border-light)">
              <span style="font-weight:500">{{ item.desk }}</span>
              <span class="mono" style="color:var(--text-secondary)">{{ item.count }}</span>
            </div>
          }
        </div>

        <div class="card">
          <div class="card-header"><h3>FX Rates</h3></div>
          @for (r of fxRates; track r.ticker) {
            <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid var(--border-light)">
              <span style="font-weight:600;color:var(--color-fx-spot)">{{ r.ticker }}</span>
              <span class="mono">{{ r.value | number:'1.4-6' }}</span>
            </div>
          }
          @if (!fxRates.length) { <div class="loading" style="padding:20px">Chargement...</div> }
        </div>

      </div>

    </div>
  `,
})
export class DashboardComponent implements OnInit {
  stats:     any = null;
  portfolio: any = null;
  taskStats: any = null;
  fxRates:   any[] = [];

  constructor(private readonly api: ApiService) {}

  ngOnInit() {
    this.api.getTradeStats().subscribe(s => this.stats = s.data ?? s);
    this.api.getPortfolioSummary().subscribe(p => this.portfolio = p.data ?? p);
    this.api.getTasksDashboard().subscribe(t => this.taskStats = t.data ?? t);
    this.api.getFxRates().subscribe(r => this.fxRates = r.data ?? r);
  }

  typeColor(type: string): string {
    const map: Record<string, string> = {
      FX_SPOT: '#7c8dff', FX_SWAP: '#a78bfa', BOND: '#34d399',
      REPO: '#fbbf24', CDS: '#f87171', IRS: '#60a5fa', CCS: '#c084fc',
    };
    return map[type] || '#718096';
  }
}
