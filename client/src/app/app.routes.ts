import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
  },
  {
    path: 'blotter',
    loadComponent: () =>
      import('./features/blotter/blotter.component').then(m => m.BlotterComponent),
  },
  {
    path: 'deal-entry',
    loadComponent: () =>
      import('./features/deal-entry/deal-entry.component').then(m => m.DealEntryComponent),
  },
  {
    path: 'positions',
    loadComponent: () =>
      import('./features/positions/positions.component').then(m => m.PositionsComponent),
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./features/tasks/tasks.component').then(m => m.TasksComponent),
  },
  {
    path: 'valuations',
    loadComponent: () =>
      import('./features/valuations/valuations.component').then(m => m.ValuationsComponent),
  },
  {
    path: 'market-data',
    loadComponent: () =>
      import('./features/market-data/market-data.component').then(m => m.MarketDataComponent),
  },
  {
    path: 'bonds',
    loadComponent: () =>
      import('./features/bonds/bonds.component').then(m => m.BondsComponent),
  },
  {
    path: 'counterparties',
    loadComponent: () =>
      import('./features/counterparties/counterparties.component').then(m => m.CounterpartiesComponent),
  },
  { path: '**', redirectTo: '/dashboard' },
];
