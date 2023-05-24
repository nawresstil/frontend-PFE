import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthenticationService} from "../login/services/authentification.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userAuth: AuthenticationService,
              private router: Router ) {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }
// fitch token
    const token = this.userAuth.getToken();

    req = this.addToken(req, token);

    return next.handle(req).pipe(
      catchError(
        (err: HttpErrorResponse ) => {
          console.log(err.status);
          if (err.status === 401) {
            this.router.navigate(['']);
          } else if (err.status === 403 ) {
            this.router.navigate(['']);
          }
          return throwError('Some thing is wrong');
        }
      )
    );
  }
// take the token and send it to the headers

  private addToken(request: HttpRequest<any>, token: string) {
   return request.clone(
     {
       setHeaders: {
       Authorization : `Bearer ${token}`
       }
     }
   );
  }
}
