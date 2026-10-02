import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from '../../../../shared/components/container/container';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Observable, of } from 'rxjs';
import { Sala } from '../../../../core/models';
import { SalaService } from '../../../../core/services/sala.service';

@Component({
  selector: 'app-sala-lista',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, ContainerComponent, RouterLink],
  templateUrl: './sala-lista.html',
  styleUrl: './sala-lista.css'
})
export class SalaListaComponent {
   salas: Observable<Sala[]> = of();
   private salaService = inject(SalaService);
   private route = inject(ActivatedRoute);

   ngOnInit(): void {
    this.salas = this.salaService.listarSalasAtivas();
   }

    edit(): void{
    this.salaService.salvarSala(sala).subscribe;
    this.router.navigate(['../formulario', id]);
  }
   
    delete(): void{
    this.salaService.deletarSala(id).subscribe;
  }
}
