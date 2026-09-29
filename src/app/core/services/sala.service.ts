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

  listarAtivas(): Observable<Sala[]> {
    return this.http.get<Sala[]>(`${this.apiUrl}/salas`);
  }
  
  buscarSalaId(id: Number): Observable<Sala>{
    return this.http.get<Sala>(`${this.apiUrl}/salas/${id}`);
  }

  /*salvarSala(id: Number): Observable<Sala>{
    if(id != null){
        return this.http.put<Sala>(`${this.apiUrl}/salas`);
    }
  }*/
  
 excluirSalaId(id: Number): Observable<Sala>{
    return this.http.delete<Sala>(`${this.apiUrl}/salas/${id}`);
  }

}
