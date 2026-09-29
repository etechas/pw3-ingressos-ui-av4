import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservableNotification, of } from 'rxjs';
import { Sala } from '../models';


@Injectable({
  providedIn: 'root'
})
export class SalaService {
  private http = inject(HttpClient);
  private apiUrl = `http://192.168.2.159:8080/salas`;

  listarEmCartaz(): Observable<Sala[]> {
    return this.http.get<Sala[]>(`${this.apiUrl}/em-cartaz`);
  }

  buscarSessoesPorSalaId(id: Number): Observable<Sala>{
    return this.http.get<Sala>(`${this.apiUrl}/${id}/sessoes`);
  }
  listarSalasAtivas(): Observable<Sala[]>{
    return this.http.get<Sala[]>(`${this.apiUrl}/salas`)
  }
  novaSala(sala: Sala): Observable<Sala[]>{
    return this.http.post<Sala[]>(`${this.apiUrl}/salas/`, sala)
  }
  excluirSala(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/salas/${id}`)
  }
}
