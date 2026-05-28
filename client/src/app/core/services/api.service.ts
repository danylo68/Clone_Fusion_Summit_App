import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly base = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  // ── Utilitaire params ────────────────────────────────────────
  private toParams(obj: Record<string, any>): HttpParams {
    let params = new HttpParams();
    Object.entries(obj).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        params = params.set(k, String(v));
      }
    });
    return params;
  }

  // ── Trades ───────────────────────────────────────────────────
  getTrades(filters: Record<string, any> = {}): Observable<any> {
    return this.http.get(`${this.base}/trades`, { params: this.toParams(filters) });
  }

  getTradeStats(): Observable<any> {
    return this.http.get(`${this.base}/trades/stats`);
  }

  getTrade(id: string): Observable<any> {
    return this.http.get(`${this.base}/trades/${id}`);
  }

  // ── Bonds ────────────────────────────────────────────────────
  getBonds(filters: Record<string, any> = {}): Observable<any> {
    return this.http.get(`${this.base}/bonds`, { params: this.toParams(filters) });
  }

  getBondByIsin(isin: string): Observable<any> {
    return this.http.get(`${this.base}/bonds/isin/${isin}`);
  }

  // ── Counterparties ───────────────────────────────────────────
  getCounterparties(filters: Record<string, any> = {}): Observable<any> {
    return this.http.get(`${this.base}/counterparties`, { params: this.toParams(filters) });
  }

  getLegalEntities(): Observable<any> {
    return this.http.get(`${this.base}/counterparties/legal-entities`);
  }

  getTraders(filters: Record<string, any> = {}): Observable<any> {
    return this.http.get(`${this.base}/counterparties/traders`, { params: this.toParams(filters) });
  }

  // ── Trade Tasks ──────────────────────────────────────────────
  getTasks(filters: Record<string, any> = {}): Observable<any> {
    return this.http.get(`${this.base}/trade-tasks`, { params: this.toParams(filters) });
  }

  getTasksDashboard(): Observable<any> {
    return this.http.get(`${this.base}/trade-tasks/dashboard`);
  }

  updateTaskStatus(id: string, status: string, notes?: string): Observable<any> {
    return this.http.patch(`${this.base}/trade-tasks/${id}/status`, { status, notes });
  }

  // ── Repos ────────────────────────────────────────────────────
  getRepos(filters: Record<string, any> = {}): Observable<any> {
    return this.http.get(`${this.base}/repos`, { params: this.toParams(filters) });
  }

  // ── CDS ──────────────────────────────────────────────────────
  getCds(filters: Record<string, any> = {}): Observable<any> {
    return this.http.get(`${this.base}/cds`, { params: this.toParams(filters) });
  }

  // ── Derivatives ──────────────────────────────────────────────
  getDerivatives(filters: Record<string, any> = {}): Observable<any> {
    return this.http.get(`${this.base}/derivatives`, { params: this.toParams(filters) });
  }

  // ── FX Spot ──────────────────────────────────────────────────
  getFxSpot(filters: Record<string, any> = {}): Observable<any> {
    return this.http.get(`${this.base}/fx-spot`, { params: this.toParams(filters) });
  }

  // ── FX Swap ──────────────────────────────────────────────────
  getFxSwap(filters: Record<string, any> = {}): Observable<any> {
    return this.http.get(`${this.base}/fx-swap`, { params: this.toParams(filters) });
  }

  // ── Valuations ───────────────────────────────────────────────
  getValuations(date?: string): Observable<any> {
    const params = date ? this.toParams({ date }) : undefined;
    return this.http.get(`${this.base}/valuations`, { params });
  }

  getPortfolioSummary(): Observable<any> {
    return this.http.get(`${this.base}/valuations/portfolio`);
  }

  getValuationsByTrade(tradeId: string): Observable<any> {
    return this.http.get(`${this.base}/valuations/trade/${tradeId}`);
  }

  // ── Market Data ──────────────────────────────────────────────
  getFxRates(date?: string): Observable<any> {
    return this.http.get(`${this.base}/market-data/fx-rates`, { params: date ? this.toParams({ date }) : undefined });
  }

  getRates(date?: string): Observable<any> {
    return this.http.get(`${this.base}/market-data/rates`, { params: date ? this.toParams({ date }) : undefined });
  }

  getCreditSpreads(date?: string): Observable<any> {
    return this.http.get(`${this.base}/market-data/credit-spreads`, { params: date ? this.toParams({ date }) : undefined });
  }

  getBondPrices(date?: string): Observable<any> {
    return this.http.get(`${this.base}/market-data/bond-prices`, { params: date ? this.toParams({ date }) : undefined });
  }

  // ── Static Data ──────────────────────────────────────────────
  getTradeTypes(): Observable<any> {
    return this.http.get(`${this.base}/static-data/trade-types`);
  }

  getTradeStatuses(): Observable<any> {
    return this.http.get(`${this.base}/static-data/trade-statuses`);
  }

  getDesks(): Observable<any> {
    return this.http.get(`${this.base}/static-data/desks`);
  }
}
