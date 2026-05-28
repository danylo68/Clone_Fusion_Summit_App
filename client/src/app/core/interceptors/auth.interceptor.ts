import { HttpInterceptorFn } from '@angular/common/http';

// Intercepteur HTTP — ajoute le Content-Type et gère les erreurs globales
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({
    setHeaders: { 'Content-Type': 'application/json' },
  });
  return next(cloned);
};
