import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9096/api/auth';

  constructor(private http: HttpClient) {}

saveUserId(userId: number) {
  sessionStorage.setItem('userId', userId.toString());
}

getUserId(): number | null {
  const id = sessionStorage.getItem('userId');
  return id ? +id : null;
}
saveUserRole(role: string) {
  sessionStorage.setItem('role', role);
}

getUserRole(): string | null {
  return sessionStorage.getItem('role');
}
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user ,{ responseType: 'text' as 'json' });
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
