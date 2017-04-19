
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TodoListComponent} from './todolist.component';
import {TodoItemComponent} from './todoitem.component';
import {TodoEditorComponent} from './todoeditor.component';
import { FormsModule } from '@angular/forms';
import {Todo} from '../_models/todo';
import {TodoService} from '../_services/todo.service';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule
    ],
    declarations: [
        TodoListComponent,
        TodoItemComponent,
        TodoEditorComponent
    ],
    providers: [
        TodoService
    ]
})
export class TodoModule {}