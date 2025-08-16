import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.API_URL;

  post<Conversation>(body: Conversation): Observable<Conversation> {
    return this.http.post<Conversation>(`${this.apiUrl}`, body);
  }
}
