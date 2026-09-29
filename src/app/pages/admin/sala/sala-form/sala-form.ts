import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';
import { ContainerComponent } from '../../../../shared/components/container/container';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import type { Sala } from '../../../../core/models';
import { SalaService } from '../../../../core/services/sala.service';


@Component({
  selector: 'app-sala-form',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ContainerComponent, ReactiveFormsModule],
  templateUrl: './sala-form.html',
  styleUrl: './sala-form.css'
})
export class SalaFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private salaService = inject(SalaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  formSala = this.fb.group({
    id: [0],
    nome: [''],
    preco: [0]
  });

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.salaService.buscarPorId(id).subscribe(sala => {
        this.formSala.patchValue(sala);
      });
    }
  }

  save(): void{
    const sala = this.formSala.getRawValue() as Sala;
    this.salaService.salvar(sala).subscribe({
      next: () => this.router.navigate(['/salas']),
      error: (err) => console.error('Erro ao salvar sala', err)
    });
  }

}