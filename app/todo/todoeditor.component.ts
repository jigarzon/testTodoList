import {Component, OnInit, Input} from '@angular/core';
import {Todo, TodoState} from '../_models/todo';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {TodoService} from '../_services/todo.service';
import {Location} from '@angular/common';

@Component({
    moduleId: module.id,
    templateUrl: "todoeditor.component.html"
})
export class TodoEditorComponent implements OnInit {
    todo: Todo;
    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private todoService: TodoService
    ) {

    }
    ngOnInit() {
        this.route.params
            .subscribe((params: Params) => this.onParamsLoaded(params));



    }

    onParamsLoaded(params: Params) {
        if (params["id"] != null && params["id"] != "new") {
            this.todoService.getTODO(+params["id"]).subscribe(
                (result: Todo) => this.todo = result);
        } else {
            //es uno nuevo
            this.todoService.newId().subscribe(result =>
                this.todo = {id: result, state: TodoState.Active, title: "", description: ""})
                ;
        }
    }

    cancel() {
        this.location.back();
    }

    save() {
        this.todoService.updateTodo(this.todo).subscribe(result => {
            if (result) {
                this.location.back();
            }
        });
    }

}


