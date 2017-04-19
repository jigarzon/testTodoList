import {Component, OnInit, Input} from '@angular/core';
import {Todo} from '../_models/todo';

@Component({
    moduleId: module.id,
    template: `
    <div *ngIf="todo">
      <span>{{todo.title}}</span><small>{{todo.description}}</small>
      
    </div>
  `,
    selector: "todo-item"
})
export class TodoItemComponent {
    @Input()
    todo: Todo;

}

