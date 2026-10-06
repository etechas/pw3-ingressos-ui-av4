import { Injectable, inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
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
    return this.http.get<Sala>(`${this.apiUrl}/${id}`);
  }

  salvarSala(sala: Sala): Observable<Sala>{
    if (sala.id) {
      return this.http.put<Sala>(`${this.apiUrl}/${sala.id}`, sala);
    } else {
      return this.http.post<Sala>(`${this.apiUrl}`, sala);
    }
  }
  
 excluirSalaId(id: Number): Observable<Sala>{
    return this.http.delete<Sala>(`${this.apiUrl}/${id}`);
  }

}

