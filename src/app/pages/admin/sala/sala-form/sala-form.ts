import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from '../../../../shared/components/container/container';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { SalaService } from '../../../../core/services/sala.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-sala-form',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ContainerComponent, ReactiveFormsModule],
  templateUrl: './sala-form.html',
  styleUrl: './sala-form.css'
})

export class SalaFormComponent {
  private x = inject(FormBuilder);
  private salaService = inject(SalaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  fSala = this.x.group({
    id: [null as number | null],
    nome: ['', Validators.required],
    preco: [0, [Validators.required, Validators.min(0)]]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    if (id) {
      this.salaService.buscarSalaId(Number(id)).subscribe({
        next: (sala) => {
          this.fSala.patchValue({
            id: sala.id ?? null,
            nome: sala.nome,
            preco: sala.preco
          });
        }
      });
    }
  }

  save(): void{
    if (this.fSala.invalid) {
      this.fSala.markAllAsTouched();
      return;
    }

    const sala = {
      id: this.fSala.value.id ?? undefined,
      nome: this.fSala.value.nome ?? '',
      preco: Number(this.fSala.value.preco ?? 0)
    };

    this.salaService.salvar(sala).subscribe({
      next: () => {
        this.router.navigate(['/salas']);
      },
      error: (err) => {
        console.error('Erro ao salvar a sala:', err);
      }
    });
  }
  cancel(): void {
    this.router.navigate(['/salas']);
  }
}
