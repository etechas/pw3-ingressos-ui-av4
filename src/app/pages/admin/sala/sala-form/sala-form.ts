import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from '../../../../shared/components/container/container';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
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

  private fb = inject(FormBuilder);
  private salaService = inject(SalaService)
  private route = inject(ActivatedRoute);
  private router = inject(Router);


  formSala = this.fb.group({
    id: [0],
    nome: [''],
    preco: [0]
  });


  save(): void{
    console.log(this.formSala.value);
  }

  delete(): void{
    
  }

}
