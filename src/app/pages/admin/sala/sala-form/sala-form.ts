import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from '../../../../shared/components/container/container';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Sala } from '../../../../core/models';
import { SalaService } from '../../../../core/services/sala.service';

@Component({
  selector: 'app-sala-form',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ContainerComponent, ReactiveFormsModule],
  templateUrl: './sala-form.html',
  styleUrl: './sala-form.css'
})
export class SalaFormComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute)
  private salaService = inject(SalaService);
  formSala = this.fb.group({
    id: [0],
    nome: [''],
    preco: [0]
  });

 ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.salaService.buscarSalaPorId(id).subscribe(sala => {
        this.formSala.patchValue(sala);
      });
    }
  }

  save(): void{
    const sala = this.formSala.getRawValue() as Sala;
    this.salaService.salvarSala(sala.id).subscribe({
      next: () => this.route.navigate(['/salas']),
      error: (err) => console.error("Erro ao salvar", err)
    })
  }
}
