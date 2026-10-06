import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from '../../../../shared/components/container/container';
import { Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Sala } from '../../../../core/models';
import { SalaService } from '../../../../core/services/sala.service';



@Component({
  selector: 'app-sala-lista',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ContainerComponent,RouterLink],
  templateUrl: './sala-lista.html',
  styleUrl: './sala-lista.css'
})
export class SalaListaComponent {
  
  salas: Observable<Sala[]> = of();
  private Salaservice = inject(SalaService);
  private route = inject(Router);

  ngOnInit(): void {
    this.carregarSalas();
  }

  carregarSalas(): void {
    this.salas = this.Salaservice.listarAtivas();
  }

  editar(id: number): void {
    this.route.navigate(['/salas', id, 'editar']);
  }

  excluir(id: number): void {
      this.Salaservice.excluirSalaId(id).subscribe({
          next: () => {
      this.carregarSalas();
    }
  });   
}

}
