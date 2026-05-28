import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector:   'app-deal-entry',
  standalone: true,
  imports:    [CommonModule, FormsModule],
  template: `
    <div class="fade-in">
      <div class="page-header">
        <div><h1>Deal Entry</h1><div class="sub">Saisie d'un nouveau trade</div></div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;max-width:900px">

        <!-- Formulaire principal -->
        <div class="card" style="grid-column:1/-1">
          <div class="card-header"><h3>Nouveau Trade</h3></div>

          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px">

            <div>
              <label class="field-label">TYPE DE TRADE *</label>
              <select class="ctrl" style="width:100%" [(ngModel)]="form.tradeType">
                <option value="">Sélectionner...</option>
                <option value="FX_SPOT">FX Spot</option>
                <option value="FX_SWAP">FX Swap</option>
                <option value="BOND">Bond</option>
                <option value="REPO">Repo</option>
                <option value="CDS">CDS</option>
                <option value="IRS">IRS</option>
                <option value="CCS">CCS</option>
              </select>
            </div>

            <div>
              <label class="field-label">DIRECTION *</label>
              <select class="ctrl" style="width:100%" [(ngModel)]="form.direction">
                <option value="BUY">BUY</option>
                <option value="SELL">SELL</option>
              </select>
            </div>

            <div>
              <label class="field-label">DESK</label>
              <select class="ctrl" style="width:100%" [(ngModel)]="form.desk">
                @for (d of desks; track d.code) {
                  <option [value]="d.code">{{ d.name }}</option>
                }
              </select>
            </div>

            <div>
              <label class="field-label">TRADE DATE *</label>
              <input class="ctrl" style="width:100%" type="date" [(ngModel)]="form.tradeDate">
            </div>

            <div>
              <label class="field-label">VALUE DATE</label>
              <input class="ctrl" style="width:100%" type="date" [(ngModel)]="form.valueDate">
            </div>

            <div>
              <label class="field-label">MATURITÉ</label>
              <input class="ctrl" style="width:100%" type="date" [(ngModel)]="form.maturityDate">
            </div>

            <div>
              <label class="field-label">NOTIONNEL</label>
              <input class="ctrl" style="width:100%" type="number" [(ngModel)]="form.notional" placeholder="1 000 000">
            </div>

            <div>
              <label class="field-label">DEVISE</label>
              <select class="ctrl" style="width:100%" [(ngModel)]="form.notionalCurrency">
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="CHF">CHF</option>
                <option value="JPY">JPY</option>
              </select>
            </div>

            <!-- FX spécifique -->
            @if (form.tradeType === 'FX_SPOT' || form.tradeType === 'FX_SWAP') {
              <div>
                <label class="field-label">PAIRE FX</label>
                <select class="ctrl" style="width:100%" [(ngModel)]="form.currencyPair">
                  <option value="EURUSD">EURUSD</option>
                  <option value="EURGBP">EURGBP</option>
                  <option value="EURJPY">EURJPY</option>
                  <option value="GBPUSD">GBPUSD</option>
                  <option value="USDJPY">USDJPY</option>
                  <option value="USDCHF">USDCHF</option>
                </select>
              </div>
              <div>
                <label class="field-label">TAUX DE CHANGE</label>
                <input class="ctrl" style="width:100%" type="number" step="0.0001" [(ngModel)]="form.exchangeRate" placeholder="1.0921">
              </div>
            }

            <!-- Contrepartie -->
            <div>
              <label class="field-label">CONTREPARTIE</label>
              <select class="ctrl" style="width:100%" [(ngModel)]="form.counterpartyId">
                <option value="">Sélectionner...</option>
                @for (c of counterparties; track c.id) {
                  <option [value]="c.id">{{ c.reference }} — {{ c.name }}</option>
                }
              </select>
            </div>

            <!-- Trader -->
            <div>
              <label class="field-label">TRADER</label>
              <select class="ctrl" style="width:100%" [(ngModel)]="form.traderId">
                <option value="">Sélectionner...</option>
                @for (t of traders; track t.id) {
                  <option [value]="t.id">{{ t.reference }} — {{ t.firstName }} {{ t.lastName }}</option>
                }
              </select>
            </div>

            <div style="grid-column:1/-1">
              <label class="field-label">COMMENTAIRES</label>
              <input class="ctrl" style="width:100%" [(ngModel)]="form.comments" placeholder="Commentaire libre...">
            </div>

          </div>

          <!-- Boutons -->
          <div style="display:flex;gap:10px;margin-top:20px;justify-content:flex-end;border-top:1px solid var(--border-light);padding-top:16px">
            <button class="btn btn-ghost" (click)="reset()">Réinitialiser</button>
            <button class="btn btn-primary" (click)="submit()" [disabled]="!form.tradeType || !form.direction">
              Capturer le trade ▶
            </button>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .field-label {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.06em;
      color: var(--text-secondary);
      display: block;
      margin-bottom: 5px;
      text-transform: uppercase;
    }
  `],
})
export class DealEntryComponent implements OnInit {
  form: Record<string, any> = {
    tradeType:        '',
    direction:        'BUY',
    notionalCurrency: 'EUR',
    tradeDate:        new Date().toISOString().split('T')[0],
    desk:             'FX',
  };

  desks:          any[] = [];
  counterparties: any[] = [];
  traders:        any[] = [];

  constructor(private readonly api: ApiService, private readonly router: Router) {}

  ngOnInit() {
    this.api.getDesks().subscribe(r => this.desks = (r.data ?? r).items ?? []);
    this.api.getCounterparties().subscribe(r => this.counterparties = r.data ?? r);
    this.api.getTraders().subscribe(r => this.traders = r.data ?? r);
  }

  reset() {
    this.form = {
      tradeType: '', direction: 'BUY', notionalCurrency: 'EUR',
      tradeDate: new Date().toISOString().split('T')[0], desk: 'FX',
    };
  }

  submit() {
    // POST /api/trades — à câbler quand le endpoint POST sera implémenté
    alert(`Trade ${this.form['tradeType']} ${this.form['direction']} capturé ✓\n(POST /api/trades à implémenter)`);
    this.router.navigate(['/blotter']);
  }
}
