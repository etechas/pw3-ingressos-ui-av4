import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from '../../../../shared/components/container/container';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Sala } from '../../../../core/models';
import { SalaService } from '../../../../core/services/sala.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-sala-lista',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ContainerComponent, RouterLink],
  templateUrl: './sala-lista.html',
  styleUrl: './sala-lista.css'
})

export class SalaListaComponent {
  salas: Observable<Sala> = of();
  private salaService = inject(SalaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);


  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
  }

}
