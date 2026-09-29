import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Observable, of } from 'rxjs';
import { ContainerComponent } from '../../../../shared/components/container/container';
import { RouterLink } from "@angular/router";
import type { Sala } from '../../../../core/models';
import { SalaService } from '../../../../core/services/sala.service';


@Component({
  selector: 'app-sala-lista',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ContainerComponent, RouterLink],
  templateUrl: './sala-lista.html',
  styleUrl: './sala-lista.css'
})
export class SalaListaComponent implements OnInit {
  private salaService = inject(SalaService);

  salas: Observable<Sala[]> = of([]);

  ngOnInit(): void {
    this.carregar();
  }

  carregar(): void {
    this.salas = this.salaService.listar();
  }

  excluir(id: number): void {
    this.salaService.excluir(id).subscribe({
      next: () => this.carregar(),
      error: (err) => console.error('Erro ao excluir sala', err)
    });
  }
}