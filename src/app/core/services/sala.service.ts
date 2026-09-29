import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Sala } from '../models';


@Injectable({
  providedIn: 'root'
})
export class SalaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/salas';

  listar(): Observable<Sala[]> {
    return this.http.get<Sala[]>(`${this.apiUrl}`);
  }

  buscarPorId(id: Number): Observable<Sala>{
    return this.http.get<Sala>(`${this.apiUrl}/${id}`);
  }

  salvar(): Observable<Sala[]> {
    return this.http.put<Sala[]>(`${this.apiUrl}`);
  }

  excluir(id: Number): Observable<Sala[]> {
    return this.http.delete<Sala[]>(`${this.apiUrl}/${id}/excluir`);
  }
}
