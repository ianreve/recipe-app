import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { catchError, throwError } from 'rxjs'
import { User } from './user.model'

interface AuthResponse {
  kind: string
  idToken: string
  email: string
  refreshToken: string
  expiresIn: string
  localId: string
  registered?: boolean
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient) {}

  public register(email: string, password: string) {
    return this.http.post<AuthResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCqqF08IUPev3fGvF4kmtvC4OBezpsH_MI',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      },
    ).pipe(catchError((err) => this.handleError(err)))
  }

  public login(email: string, password: string) {
    return this.http.post<AuthResponse>(
      'Firebasse API KEY',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      },
    ).pipe(catchError((err) => this.handleError(err)))
  }

  private handleError(err: HttpErrorResponse){
    console.log(err);
    let errorMessage = 'unknown error occurred';
    switch(err.error.error.message){
      case 'EMAIL_EXISTS': 
        errorMessage = 'This email address is already in use.'
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = "This email does not exist";
        break;
      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = "The login credentials are invalid";
        break;
    }
    return throwError(() => new Error(errorMessage));
  }

  private handleAuth(id: string, token: string, expiresIn: number){
    const expiryDate = new Date(new Date().getTime() + expiresIn * 1000); // 
    const user = new User(id, token, expiryDate);

  }
}

// User authentication variable 