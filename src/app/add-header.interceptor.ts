import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpHeaders,
  } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

  export class AddHeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      // Clone the request to add the new header
      const headers = new HttpHeaders({
        'x-auth': 'token 123',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
        'Access-Control-Allow-Origin': '*',
      });

      // const headers = new HttpHeaders();

      const cloneReq = req.clone({headers});
      // Pass the cloned request instead of the original request to the next handle
      return next.handle(cloneReq);
    }
}
