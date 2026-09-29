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
    return this.http.get<Sala[]>(`${this.apiUrl}/salas`);
  }

  buscarSalaId(id: Number): Observable<Sala>{
    return this.http.get<Sala>(`${this.apiUrl}/${id}`);
  }

    salvar(salas: Sala): Observable<Sala>{
    if (salas.id){
        return this.http.put<Sala>(`${this.apiUrl}/${salas.id}`,
        {
            nome: salas.nome,
            preco: salas.preco
        }
    );

    }
    return this.http.post<Sala>(
        this.apiUrl,
        {
            nome: salas.nome,
            preco: salas.preco
        }
    );

  }
  excluir(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}