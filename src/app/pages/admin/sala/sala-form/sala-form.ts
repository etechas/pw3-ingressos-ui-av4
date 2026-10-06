import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from '../../../../shared/components/container/container';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { SalaService } from '../../../../core/services/sala.service';
import { Sala } from '../../../../core/models';


@Component({
  selector: 'app-sala-form',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ContainerComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './sala-form.html',
  styleUrl: './sala-form.css'
})
export class SalaFormComponent {
  private fb = inject(FormBuilder);
  private salaService = inject(SalaService);
  private route = inject(ActivatedRoute);
  router = inject(Router);

  formSala = this.fb.group({
    id: [null as number | null],
    nome: [''],
    preco: [null as number | null]
  });

   ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.salaService.buscarSalaId(Number(id)).subscribe({
        next: (sala) => {
          this.formSala.patchValue(sala);
        },
      });
    }
  }

 save(): void {
  const sala = this.formSala.getRawValue();

  this.salaService.salvarSala(sala as Sala).subscribe({
    next: () => {
      this.router.navigate(['/salas']);
    }
  });
}
  
}
