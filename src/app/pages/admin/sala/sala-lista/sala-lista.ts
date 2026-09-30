import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from '../../../../shared/components/container/container';
import { RouterLink, Router } from "@angular/router";
import { SalaService } from '../../../../core/services/sala.service';
import { Observable } from 'rxjs';
import { Sala } from '../../../../core/models';




@Component({
  selector: 'app-sala-lista',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ContainerComponent, RouterLink, Router],
  templateUrl: './sala-lista.html',
  styleUrl: './sala-lista.css'
})
export class SalaListaComponent {
  private service = inject(SalaService);
  private router = inject(Router);
  
  salas: Observable<Sala[]> = this.service.listar();
  
  editar(id: Number) {
    this.router.navigate(['/salas', id, 'editar']);
  }

  exluir(id: Number) {
    this.service.excluir(id).subscribe(() => {
      this.salas = this.service.listar();
    });
    
  }
}
