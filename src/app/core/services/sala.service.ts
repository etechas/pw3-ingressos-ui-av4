import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sala } from '../models';

@Injectable({
    providedIn: "root"
})
export class SalaService {
    private http = inject(HttpClient)
    private apiUrl = 'http://192.168.2.159:8080/salas';


    listar(): Observable<Sala[]> {
        return this.http.get<Sala[]>(`${this.apiUrl}`);
    }

    buscarSalaPorId(id: Number): Observable<Sala[]> {
        return this.http.get<Sala[]>(`${this.apiUrl}/${id}`);
    } 

    salvar(sala: Sala): Observable<Sala[]> {
            return this.http.put<Sala[]>(`${this.apiUrl}/${sala.id}`, sala);
            return this.http.post<Sala[]>(this.apiUrl, sala);
    }

    excluir(id: Number): Observable<Sala[]> {
        return this.http.delete<Sala[]>(`${this.apiUrl}/${id}`);
    }
}