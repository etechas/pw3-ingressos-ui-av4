import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sala } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  private http = inject(HttpClient)
  private apiUrl = 'http://192.168.2.159:8080/salas';
  private sala = Observable<Sala>
  
  listarAtivas(): Observable<Sala[]>{
    return this.http.get<Sala[]>(`${this.apiUrl}`);
  }

  buscarPorId(id: number): Observable<Sala>{
    return this.http.get<Sala>(`${this.apiUrl}/${id}`);
  }

  salvar(id: number): Observable<Sala>{
    if(id == null)
      return this.http.post<Sala>(`${this.apiUrl}`, this.sala)
    else
      return this.http.put<Sala>(`${this.apiUrl}/${id}`, this.sala)
  }

  excluir(id: number): Observable<Sala>{
    return this.http.delete<Sala>(`${this.apiUrl}/${id}`);
  }
}
