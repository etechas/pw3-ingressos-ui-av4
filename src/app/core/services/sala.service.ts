import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Sala } from '../models';


@Injectable({
  providedIn: 'root'
})
export class SalaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://172.16.48.4:8080/salas';

  listar(): Observable<Sala[]> {
    return this.http.get<Sala[]>(this.apiUrl);
  }

  buscarSalaId(id: Number): Observable<Sala>{
    return this.http.get<Sala>(`${this.apiUrl}/${id}`);
  }

  salvar(sala: Sala): Observable<Sala>{
    if(sala.id){
      return this.http.put<Sala>(`${this.apiUrl}/${sala.id}`, sala);
    }
    return this.http.post<Sala>(this.apiUrl, sala);
  }

  excluir(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
