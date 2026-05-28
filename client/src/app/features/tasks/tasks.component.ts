import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector:   'app-tasks',
  standalone: true,
  imports:    [CommonModule, FormsModule],
  template: `
    <div class="fade-in">

      <div class="page-header">
        <div>
          <h1>Trade Tasks — Back / Middle Office</h1>
          <div class="sub">File de traitement · Confirmations · Settlements · Valorisations</div>
        </div>
      </div>

      <!-- KPIs -->
      <div class="kpi-grid" style="grid-template-columns:repeat(4,1fr)">
        <div class="kpi-card">
          <div class="kpi-label">EN ATTENTE</div>
          <div class="kpi-value mono" style="color:var(--color-pending)">{{ dash?.pending ?? '—' }}</div>
          <div class="kpi-sub">tâches pendantes</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">EN RETARD</div>
          <div class="kpi-value mono" style="color:var(--color-overdue)">{{ dash?.overdue ?? '—' }}</div>
          <div class="kpi-sub">overdue</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">CRITIQUES</div>
          <div class="kpi-value mono" style="color:var(--color-cancelled)">{{ dash?.critical ?? '—' }}</div>
          <div class="kpi-sub">priorité critique</div>
        </div>
        <div class="kpi-card">
          <div class="kpi-label">TOTAL</div>
          <div class="kpi-value mono">{{ total }}</div>
          <div class="kpi-sub">toutes tâches</div>
        </div>
      </div>

      <!-- Filtres -->
      <div class="filters-bar">
        <select class="ctrl" [(ngModel)]="f.taskType" (ngModelChange)="onFilter()">
          <option value="">Tous types</option>
          <option value="CONFIRMATION">Confirmation</option>
          <option value="SETTLEMENT">Settlement</option>
          <option value="VALUATION">Valuation</option>
          <option value="MARGIN_CALL">Margin Call</option>
          <option value="ACCOUNTING">Accounting</option>
          <option value="REPORTING">Reporting</option>
        </select>

        <select class="ctrl" [(ngModel)]="f.status" (ngModelChange)="onFilter()">
          <option value="">Tous statuts</option>
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="FAILED">Failed</option>
          <option value="OVERDUE">Overdue</option>
        </select>

        <select class="ctrl" [(ngModel)]="f.priority" (ngModelChange)="onFilter()">
          <option value="">Toutes priorités</option>
          <option value="CRITICAL">Critical</option>
          <option value="HIGH">High</option>
          <option value="NORMAL">Normal</option>
          <option value="LOW">Low</option>
        </select>
      </div>

      <!-- Table -->
      <div class="table-container">
        @if (loading) {
          <div class="loading">Chargement des tâches...</div>
        } @else {
          <table>
            <thead>
              <tr>
                <th>PRIORITÉ</th>
                <th>TYPE</th>
                <th>TRADE REF</th>
                <th>TYPE TRADE</th>
                <th>CONTREPARTIE</th>
                <th>ASSIGNÉ À</th>
                <th>STATUT</th>
                <th>DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              @for (task of tasks; track task.id) {
                <tr>
                  <td>
                    <span class="badge"
                          [style.background]="prioBg(task.priority)"
                          [style.color]="prioColor(task.priority)">
                      {{ task.priority }}
                    </span>
                  </td>
                  <td style="font-weight:500">{{ taskIcon(task.taskType) }} {{ task.taskType }}</td>
                  <td class="mono" style="color:var(--text-accent);font-size:11px">
                    {{ task.trade?.tradeRef }}
                  </td>
                  <td>
                    @if (task.trade?.tradeType) {
                      <span class="badge" [class]="task.trade.tradeType.toLowerCase().replace('_','')">
                        {{ task.trade.tradeType }}
                      </span>
                    }
                  </td>
                  <td style="font-size:12px">{{ task.trade?.counterparty?.name ?? '—' }}</td>
                  <td style="font-size:12px;color:var(--text-secondary)">{{ task.assignedTo ?? '—' }}</td>
                  <td>
                    <span class="badge" [class]="task.status.toLowerCase().replace('_','')">
                      {{ task.status }}
                    </span>
                  </td>
                  <td class="mono" style="font-size:11px;color:var(--text-muted)">
                    {{ task.createdAt | date:'dd/MM/yy HH:mm' }}
                  </td>
                  <td>
                    <div style="display:flex;gap:4px">
                      @if (task.status === 'PENDING') {
                        <button class="btn btn-ghost" style="padding:3px 8px;font-size:10px"
                                (click)="patch(task, 'IN_PROGRESS')">▶ Start</button>
                      }
                      @if (task.status === 'PENDING' || task.status === 'IN_PROGRESS') {
                        <button class="btn btn-primary" style="padding:3px 8px;font-size:10px"
                                (click)="patch(task, 'COMPLETED')">✓ Done</button>
                        <button class="btn btn-danger" style="padding:3px 8px;font-size:10px"
                                (click)="patch(task, 'FAILED')">✕ Fail</button>
                      }
                    </div>
                  </td>
                </tr>
              }
            </tbody>
          </table>

          <div class="pagination">
            <span>{{ total }} tâches</span>
            <div style="display:flex;gap:6px;align-items:center">
              <button class="btn btn-ghost" [disabled]="page === 1" (click)="prev()">← Préc</button>
              <span>{{ page }} / {{ pages }}</span>
              <button class="btn btn-ghost" [disabled]="page === pages" (click)="next()">Suiv →</button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
})
export class TasksComponent implements OnInit {
  tasks:   any[] = [];
  dash:    any = null;
  total  = 0;
  page   = 1;
  pages  = 1;
  loading = false;
  f: Record<string, any> = {};

  constructor(private readonly api: ApiService) {}

  ngOnInit() {
    this.load();
    this.api.getTasksDashboard().subscribe(r => this.dash = r.data ?? r);
  }

  load() {
    this.loading = true;
    this.api.getTasks({ ...this.f, page: this.page, limit: 50 }).subscribe({
      next: res => {
        const d = res.data ?? res;
        this.tasks  = d.items;
        this.total  = d.total;
        this.pages  = Math.ceil(d.total / 50);
        this.loading = false;
      },
      error: () => this.loading = false,
    });
  }

  onFilter() { this.page = 1; this.load(); }
  prev()     { if (this.page > 1) { this.page--; this.load(); } }
  next()     { if (this.page < this.pages) { this.page++; this.load(); } }

  patch(task: any, status: string) {
    this.api.updateTaskStatus(task.id, status).subscribe(() => task.status = status);
  }

  taskIcon(t: string) {
    return { CONFIRMATION:'◉', SETTLEMENT:'⇄', VALUATION:'◎', MARGIN_CALL:'!', ACCOUNTING:'∑', REPORTING:'📊' }[t] ?? '•';
  }
  prioColor(p: string) {
    return { CRITICAL:'#fc8181', HIGH:'#ed8936', NORMAL:'#e8eaf0', LOW:'#718096' }[p] ?? '#e8eaf0';
  }
  prioBg(p: string) {
    return { CRITICAL:'rgba(252,129,129,0.15)', HIGH:'rgba(237,137,54,0.15)', NORMAL:'rgba(232,234,240,0.05)', LOW:'transparent' }[p] ?? 'transparent';
  }
}
