import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

interface NavItem {
  label: string;
  icon:  string;
  route: string;
  badge?: number;
}

@Component({
  selector:    'app-root',
  standalone:  true,
  imports:     [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="app-layout">

      <!-- ── Header ────────────────────────────────────────── -->
      <header class="app-header">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:28px;height:28px;background:linear-gradient(135deg,#694ED6,#C137A2);border-radius:6px"></div>
          <div>
            <div style="font-weight:700;font-size:14px;letter-spacing:-0.02em">FUSION SUMMIT</div>
            <div style="font-size:10px;color:var(--text-secondary);letter-spacing:0.08em">CAPITAL MARKETS</div>
          </div>
        </div>

        <div style="width:1px;height:28px;background:var(--border);margin:0 8px"></div>

        <div style="font-size:12px;color:var(--text-secondary)">
          {{ today | date:'EEEE d MMMM yyyy' }}
        </div>

        <div style="margin-left:auto;display:flex;align-items:center;gap:14px">
          <span style="background:rgba(72,187,120,0.1);border:1px solid rgba(72,187,120,0.3);color:#48bb78;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700">
            ● LIVE
          </span>
          <span style="font-size:12px;color:var(--text-secondary)">{{ time }}</span>
          <div style="width:28px;height:28px;background:var(--fds-primary);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700">
            KP
          </div>
        </div>
      </header>

      <!-- ── Sidebar ───────────────────────────────────────── -->
      <nav class="app-sidebar">

        <div class="nav-section-label">FRONT OFFICE</div>
        @for (item of frontOffice; track item.route) {
          <a class="nav-item" [routerLink]="item.route" routerLinkActive="active">
            <span class="nav-icon">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
            @if (item.badge) { <span class="nav-badge">{{ item.badge }}</span> }
          </a>
        }

        <div class="nav-section-label" style="margin-top:8px">BACK / MIDDLE OFFICE</div>
        @for (item of backOffice; track item.route) {
          <a class="nav-item" [routerLink]="item.route" routerLinkActive="active">
            <span class="nav-icon">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
            @if (item.badge) { <span class="nav-badge">{{ item.badge }}</span> }
          </a>
        }

        <div class="nav-section-label" style="margin-top:8px">DONNÉES</div>
        @for (item of data; track item.route) {
          <a class="nav-item" [routerLink]="item.route" routerLinkActive="active">
            <span class="nav-icon">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </a>
        }

      </nav>

      <!-- ── Contenu principal ─────────────────────────────── -->
      <main class="app-content fade-in">
        <router-outlet />
      </main>

    </div>
  `,
})
export class AppComponent implements OnInit {
  today = new Date();
  time  = '';

  frontOffice: NavItem[] = [
    { label: 'Dashboard',       icon: '◈', route: '/dashboard' },
    { label: 'Trade Blotter',   icon: '≡', route: '/blotter' },
    { label: 'Deal Entry',      icon: '+', route: '/deal-entry' },
    { label: 'Positions & P&L', icon: '▲', route: '/positions' },
  ];

  backOffice: NavItem[] = [
    { label: 'Trade Tasks',    icon: '✓', route: '/tasks',      badge: 12 },
    { label: 'Valuations',     icon: '◎', route: '/valuations' },
  ];

  data: NavItem[] = [
    { label: 'Market Data',   icon: '~', route: '/market-data' },
    { label: 'Obligations',   icon: '⊞', route: '/bonds' },
    { label: 'Contreparties', icon: '⊕', route: '/counterparties' },
  ];

  ngOnInit() {
    this.updateTime();
    setInterval(() => this.updateTime(), 60000);
  }

  private updateTime() {
    this.time = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }
}
