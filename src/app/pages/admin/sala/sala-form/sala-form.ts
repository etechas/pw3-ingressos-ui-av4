import { Component, Inject, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from '../../../../shared/components/container/container';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import type { Sala } from '../../../../core/models';
import { SalaService } from '../../../../core/services/sala.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-sala-form',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ContainerComponent, ReactiveFormsModule, RouterLink],
  templateUrl: './sala-form.html',
  styleUrl: './sala-form.css'
})
export class SalaFormComponent implements OnInit{
  private fb = inject(FormBuilder);

  formSala = this.fb.group({
    id: [0],
    nome: [''],
    preco: [0]
  });

  sala: Observable<Sala> = of();
    private salaService = inject(SalaService);
    private route = inject(ActivatedRoute);


  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.sala = this.salaService.buscarPorId(id);
    this.formSala.patchValue(id);
  }

  save(): void{
    console.log(this.formSala.value);
    this.sala = this.salaService.salvar;
  }

}
