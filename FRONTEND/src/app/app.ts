import { Component, signal } from '@angular/core';
import { ViewChild } from '../../node_modules/@angular/core/types/core';
import { Tarefa } from "./tarefa";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})

export class App {
  protected readonly title = signal('TODOapp');

  arrayDeTarefas = signal<Tarefa[]>([]);
  apiURL : string;


  // arrayDeTarefas : Tarefa[] = [];

  constructor(private http: HttpClient){
    this.apiURL = 'http://apitarefas-production-1165.up.railway.app/api';
    this.READ_tarefas();
  }

  CREATE_tarefa(input: HTMLInputElement) {
      const descricao = input.value;

      var novaTarefa = new Tarefa(descricao, false);
      this.http.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa).subscribe((resultado:any) => { console.log(resultado); this.READ_tarefas(); });
    }

  READ_tarefas() {
    
    this.http.get<Tarefa[]>(`${this.apiURL}/api/getAll`).subscribe((resultado:any) => this.arrayDeTarefas.set(resultado));
     
  }
  // READ_tarefas() {
  //   this.http
  //     .get<Tarefa[]>(`${this.apiURL}/api/getAll`)
  //     .subscribe((resultado: Tarefa[]) => {
  //       console.log('dados da API:', resultado); // 👈 IMPORTANTE
  //       this.arrayDeTarefas.set(resultado);
  //     });
  //   }

  REMOVE_tarefas(tarefaRemovida: Tarefa){
    var indice = this.arrayDeTarefas().indexOf(tarefaRemovida);
    var id = this.arrayDeTarefas()[indice]._id;
    this.http.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`).subscribe(
    (resultado: any) => { console.log(resultado); this.READ_tarefas(); });  
  }

  UPDATE_tarefa(tarefaAserModificada: Tarefa) {
    var indice = this.arrayDeTarefas().indexOf(tarefaAserModificada);
    var id = this.arrayDeTarefas()[indice]._id;
    this.http.patch<Tarefa>(`${this.apiURL}/api/update/${id}`,
    tarefaAserModificada).subscribe(
    (resultado:any) => { console.log(resultado); this.READ_tarefas(); });
    }
   
    
}

