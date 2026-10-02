import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from '../../../../shared/components/container/container';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-sala-form',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ContainerComponent, ReactiveFormsModule],
  templateUrl: './sala-form.html',
  styleUrl: './sala-form.css'
})
export class SalaFormComponent {
  private fb = inject(FormBuilder);
  private salaService = inject(SalaService);
  private rota = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    const idSala = this.route.snapshot.paramMap.get('id');
      if (idSala) {
        const id = Number(idSala);
        this.salaService.buscarSalaPorId(id).subscribe({
        next: (sala) => {
        this.formSala.patchValue(sala);
        }
      })
    }
  }

  formSala = this.fb.group({
    id: [0],
    nome: [''],
    preco: [0]
  });

  save(): void{
    this.salaService.salvarSala(sala).subscribe;
    this.router.navigate({'/salas'});
  }

}
