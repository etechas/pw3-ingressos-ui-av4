import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContainerComponent } from '../../../../shared/components/container/container';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { SalaService } from '../../../../core/services/sala.service';
import { Sala } from '../../../../core/models';

@Component({
  selector: 'app-sala-form',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, ContainerComponent, ReactiveFormsModule],
  templateUrl: './sala-form.html',
  styleUrl: './sala-form.css'
})
export class SalaFormComponent implements OnInit{
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private service = inject(SalaService)
  private router = inject(Router)

  formSala = this.fb.group({
    id: [0],
    nome: [''],
    preco: [0]
  });



  ngOnInit(): void {
      const id = this.route.snapshot.params["id"];
      if (id){
        this.service.buscarSalaId(id).subscribe(sala =>{
          this.formSala.patchValue(sala);
        });
      }
  }

  save(): void{
    const sala = this.formSala.getRawValue() as Sala;
    this.service.SalvarSalaId(sala.id).subscribe({
      next: () => this.router.navigate(['/salas']),
      error: (err) => console.error("Erro ao salvar", err)
    })
  }
}
