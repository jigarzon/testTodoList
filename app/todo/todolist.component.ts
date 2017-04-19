import {Component, OnInit, Input} from '@angular/core';
import {Todo, TodoState} from '../_models/todo';
import {TodoService} from '../_services/todo.service';
import {Router} from '@angular/router';

@Component({
    moduleId: module.id,
    templateUrl: 'todolist.component.html'
})
export class TodoListComponent implements OnInit {
    todos: Todo[] = [];
    _filtro: TodoState = null;



    set filtro(filtro: TodoState) {
        this._filtro = filtro;
        this.reload();
    }


    constructor(private todoService: TodoService, private router: Router) {

    }

    reload() {
        this.todoService.getTODOs(this._filtro).subscribe((result: Todo[]) => this.todos = result);
    }
    ngOnInit() {
        this.reload();
    }

    verActivos() {
        //esto se hace en varios metodos porque los enums no son bien soportados por el templating de angular... 
        // hubiera sido mejor usar strings como estados...
        this.filtro = TodoState.Active;
    }

    verEliminados() {
        this.filtro = TodoState.Cancelled;
    }

    verCerrados() {
        this.filtro = TodoState.Closed;
    }

    verTodos() {
        this.filtro = null;
    }

    eliminar(todo: Todo) {
        todo.state = TodoState.Cancelled;
        this.todoService.updateTodo(todo);
        this.reload();
    }

    editar(todo: Todo) {
        this.router.navigate(["/todo", todo.id]);
    }
    
    completar(todo : Todo) {
        todo.state = TodoState.Closed;
        this.todoService.updateTodo(todo);
        this.reload();
    }
}


