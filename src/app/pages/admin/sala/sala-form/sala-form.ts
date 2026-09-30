import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from '../../../../shared/components/container/container';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaService } from '../../../../core/services/sala.service';
import { Sala } from '../../../../core/models';


@Component({
  selector: 'app-sala-form',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ContainerComponent, ReactiveFormsModule],
  templateUrl: './sala-form.html',
  styleUrl: './sala-form.css'
})
export class SalaFormComponent {
  private fb = inject(FormBuilder);
  private service = inject(SalaService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);


  formSala = this.fb.group({
    id: [0],
    nome: [''],
    preco: [0]
  });

  ngOnInit (){
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.service.buscarSalaPorId(+id).subscribe(sala => {
        this.formSala.patchValue(sala)
      });
    }
  }

  save(): void{
    if (this.formSala.invalid){
      this.formSala.markAllAsTouched();
      return;
    }
    this.service.salvar(this.formSala.getRawValue() as Sala).subscribe(() =>{
      this.router.navigate(['/salas']);
    });
  }

}
