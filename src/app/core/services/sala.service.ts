import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { reportUnhandledError } from 'rxjs/internal/util/reportUnhandledError';
import { Filme, Sala } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://192.168.2.159:8080/salas'

  listarEmCartaz(): Observable<Filme[]> {
    return this.http.get<Filme[]>(`${this.apiUrl}/em-cartaz`);
  }
  listarSalasAtiva(): Observable<Sala>{
    return this.http.get<Sala>(`${this.apiUrl}/salas`)
  }
  
  buscarSalaPorId(id:Number): Observable<Sala>{
    return this.http.get<Sala>(`${this.apiUrl}/salas/${id}`);
  }
  salvarSala(sala: Sala):Observable<Sala>{
    return this.http.post<Sala>(`${this.apiUrl}/salas/`, sala)
  }
  excluirSala(id: Number): Observable<Sala>{
    return this.http.delete<Sala>(`${this.apiUrl}/salas/${id}`)
  }
}
