import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from '../../../../shared/components/container/container';
import { Router, RouterLink } from "@angular/router";
import { SalaService } from '../../../../core/services/sala.service';
import { Sala } from '../../../../core/models';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-sala-lista',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ContainerComponent, RouterLink],
  templateUrl: './sala-lista.html',
  styleUrl: './sala-lista.css'
})
export class SalaListaComponent {

  private salaService = inject(SalaService);
  private router = inject(Router);
  salas: Observable<Sala[]> = this.salaService.listar();

  editar(id:number): void {
    this.router.navigate(['/salas', id, 'editar']);
  }

  novaSala(): void {
    this.router.navigate(['/salas/novo']);
  }

  excluir(id: number): void {
    if (confirm('Deseja realmente excluir esta sala?')) {
      this.salaService.excluir(id).subscribe({
        next: () => {
          this.salas = this.salaService.listar();
        },
        error: (erro) => {
          console.error('Erro ao excluir sala:', erro);
          alert('Erro ao excluir sala.');
        }
      });
    }
  }
  
}
