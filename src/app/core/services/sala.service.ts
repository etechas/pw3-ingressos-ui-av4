import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Sala } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://192.168.2.159:8080/salas';
  private sala = Observable<Sala>;

    listarAtivas(): Observable<Sala[]> {
      return this.http.get<Sala[]>(`${this.apiUrl}`);
    }
    
    buscarSalaId(id: Number): Observable<Sala>{
      return this.http.get<Sala>(`${this.apiUrl}/${id}`);
    }

    SalvarSalaId(id: Number): Observable<Sala>{
      var bla = this.http.get<Sala>(`${this.apiUrl}/${id}`);
      if(bla)
      {
        return this.http.put<Sala>(`${this.apiUrl}/${bla}`, this.sala );
      }
      return this.http.put<Sala>(`${this.apiUrl}/${bla}`, this.sala );
    }

    ExcluirSalaId(id: Number): Observable<Sala>{
      return this.http.delete<Sala>(`${this.apiUrl}/${id}`);
    }
}
