import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from '../../../../shared/components/container/container';
import { ActivatedRoute, RouterLink, RouterModule } from "@angular/router";
import { Sala } from '../../../../core/models';
import { SalaService } from '../../../../core/services/sala.service';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-sala-lista',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, ContainerComponent],
  templateUrl: './sala-lista.html',
  styleUrl: './sala-lista.css'
})
export class SalaListaComponent {
  
  sala: Observable<Sala> = of();
  private filmeService = inject(SalaService);
  private route = inject(ActivatedRoute);


  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.sala = this.filmeService.buscarSessoesPorSalaId(id);
}
}