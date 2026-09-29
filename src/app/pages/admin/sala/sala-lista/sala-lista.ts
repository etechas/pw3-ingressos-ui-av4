import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from '../../../../shared/components/container/container';
import { Sala } from '../../../../core/models';
import { SalaService } from '../../../../core/services/sala.service';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';



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
  private route = inject(ActivatedRoute)

  salas: Observable<Sala[]> = this.salaService.listar();

  novaSala(): void {
    this.router.navigate(['/salas/novo']);
  }

  editar(id: number): void {
    this.router.navigate(['/salas', id, 'editar']);
  }

  excluirr(id: number): void{
    if(confirm("Deseja excluir essa sala?")){
      this.salaService.excluir(id).subscribe({
        next: () => {
          this.salas = this.salaService.listar();
        },
        error: (erro) => {
          console.error("Erro ao excluir", erro);
          alert("Erro ao excluir sala");
        }
      });
    }
  }

}
