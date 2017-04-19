import {Routes, RouterModule} from '@angular/router';

import {TodoListComponent, TodoEditorComponent} from './todo/index';

const appRoutes: Routes = [

    {path: 'todolist', component: TodoListComponent},
    {path: 'todo/:id', component: TodoEditorComponent},

    {path: '**', redirectTo: 'todolist'}
];

export const routing = RouterModule.forRoot(appRoutes);