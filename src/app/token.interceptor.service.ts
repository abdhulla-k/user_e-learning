import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable()
export class TokenAddingInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let idToken = localStorage.getItem("userData");
        if (idToken) {
            idToken = JSON.parse(idToken).jwtToken;
        }
        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", idToken)
            });
            return next.handle(cloned);
        }

        return next.handle(req)
    }
}