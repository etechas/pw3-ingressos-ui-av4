import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Sala } from '../models';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://192.168.2.159:8080/salas';

  listar(): Observable<Sala[]>{
    return this.http.get<Sala[]>(`${this.apiUrl}`);
  }

  buscarPorId(id: Number): Observable<Sala>{
    return this.http.get<Sala>(`${this.apiUrl}/${id}`)
  }

  salvar(sala: Partial<{ id: number | null; nome: string | null; preco: number | null; }>, id?: Number){
    if(this.http.get<Sala>(`${this.apiUrl}`))
    {
      this.http.put(`${this.apiUrl}`, sala)
    }
    else
    {
      this.http.post(`${this.apiUrl}`, sala)
    }
  }
}
