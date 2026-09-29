import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from '../../../../shared/components/container/container';
import { RouterLink } from "@angular/router";
import { SalaService } from '../../../../core/services/sala.service';
import { Observable, of } from 'rxjs';
import { Sala } from '../../../../core/models';


@Component({
  selector: 'app-sala-lista',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ContainerComponent, RouterLink],
  templateUrl: './sala-lista.html',
  styleUrl: './sala-lista.css'
})
export class SalaListaComponent {
  private salaService = inject(SalaService)
  salas: Observable<Sala[]> = of();
  sala: Observable<Sala> = of();

  ngOnInit(): void {
    this.salas = this.salaService.listarAtivas();

  }

  edit(): void{
    const id = this.route.snapshot.params['id'];
    this.sala = this.salaService.salvar(id);
  }

  delete(): void{
    const id = this.route.snapshot.params['id'];
    this.sala = this.salaService.excluir(id);
  }

}
