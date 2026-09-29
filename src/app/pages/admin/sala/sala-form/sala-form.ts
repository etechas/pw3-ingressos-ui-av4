import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from '../../../../shared/components/container/container';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { Sala } from '../../../../core/models';
import { SalaService } from '../../../../core/services/sala.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-sala-form',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ContainerComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './sala-form.html',
  styleUrl: './sala-form.css'
})
export class SalaFormComponent {

  sala: Observable<Sala> = of();
  private salaService = inject(SalaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  formSala = this.fb.group({
    id: [0],
    nome: [''],
    preco: [0]
  });

  save(): void {
    const salaVal = this.formSala.value as Sala;
    this.salaService.salvar(salaVal).subscribe(() => {
      this.router.navigate(['/salas']);
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.salaService.buscarPorId(id).subscribe(sala => {
        this.formSala.patchValue(sala);
      });
    }
  }
}