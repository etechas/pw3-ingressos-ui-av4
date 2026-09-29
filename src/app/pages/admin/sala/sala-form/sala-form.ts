import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from '../../../../shared/components/container/container';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SalaService } from '../../../../core/services/sala.service';
import { Router } from '@angular/router';

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
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  formSala = this.fb.group({
    id: [0],
    nome: [''],
    preco: [0]
  });

  ngOnInt(): void{

    const id = this.route.snapshot.params['id'];

    if (id) {

      this.salaService.buscar(Number(id)).subscribe({
        next: (sala) => {
          this.formSala.patchValue({
            id: sala.id ?? null,
            nome: sala.nome,
            preco: sala.preco
          });
        },
        error: (erro) => {
          console.error('Erro ao buscar sala:', erro);
        }
      })
    }
  }

  save(): void{
    if (this.formSala.invalid){
      this.formSala.markAllAsTouched();
      return;
    }

  const sala = {
    id: this.formSala.value.id ?? 0,
    nome: this.formSala.value.nome ?? '',
    preco: Number(this.formSala.value.preco ?? 0)
    };

    this.salaService.salvar(sala).subscribe({

      next: () => {
        this.router.navigate(['/salas']);
      },

      error: (erro) => {
        console.error('Erro ao salvar sala:', erro);
        alert('Erro ao salvar a sala.');
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/salas']);
  }
}