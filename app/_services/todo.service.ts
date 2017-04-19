import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response} from '@angular/http';
import {Router} from '@angular/router';
import {Todo} from "../_models/todo";
import {TodoState} from "../_models/todo";
import {Observable} from "rxjs/Rx";
import 'rxjs/add/operator/filter';

@Injectable()
export class TodoService {
    constructor(private http: Http, router: Router) {
    }

    getTODOs(state: TodoState = null) {
        ///TODO ESTE METODO EN REALIDAD DEBERIA SER UNA API QUE ADMITA
        /// FILTROS, ETC... Al usarse un json se hace a mano. 
        /// Una mejora hubiera sido usar in memory web api que es para emular
        /// web services, pero tampoco es una solucion 
        let todoString = localStorage.getItem("todoList");
        if (todoString == null) {
            let req = new RequestOptions();

            return this.http.get(
                '/app/sample-todos.json', req
            ).map((response: Response) => {
                let todos: Todo[] = response.json()['result'];
                let filtered: Todo[] = this.filter(todos, state);
                localStorage.setItem('todoList', JSON.stringify(todos));
                return filtered;
            }).catch(this.handleError.bind(this));

        } else {
            let todos: Todo[] = JSON.parse(todoString);
            let filtered: Todo[] = this.filter(todos, state);
            return Observable.of(filtered);
        }
    }
    private filter(todos: Todo[], state: TodoState = null, id : number =null) {
        if (state == null && id == null) {
            return todos;
        }
        let filtered: Todo[] = [];
        for (let todo of todos) {
            //horrible metodo, de nuevo muestra la falta de una api, se filtra a mano
            if (todo.state == state || state == null) {
                if (todo.id == id || id == null) {
                    filtered.push(todo);
                }
            }
        }
        return filtered;
    }

    getTODO(id: number) {
        return this.getTODOs(null).map( (todos : Todo[]) => this.filter(todos, null, id)[0]);
    }
    
    newId() {
        let todoString = localStorage.getItem("todoList");
        let todos: Todo[] = JSON.parse(todoString);
        let indexFound: number = null;
        let maxId : number = 0;
        todos.forEach((item, index) => {
            if (item.id >= maxId) {
                maxId = item.id;
            }
        });
        return Observable.of(maxId + 1);
    }

    updateTodo(todo: Todo) {
        let todoString = localStorage.getItem("todoList");
        let todos: Todo[] = JSON.parse(todoString);
        let indexFound: number = null;
        todos.forEach((item, index) => {
            if (item.id == todo.id) {
                indexFound = index;
            }
        });
        if (indexFound != null) {
            todos[indexFound] = todo;
        } else {
            //es uno nuevo
            todos.push(todo);
        }
        localStorage.setItem('todoList', JSON.stringify(todos));
        //si esto fuera un ws, no volveria enseguida con una respuesta de ok / error.
        return Observable.of(true);
    }


    handleError(error: Response | any) {
        //por si se corrompio la base... borro los todos
        localStorage.removeItem("todoList");
        let errMsg: string;
        let status: number;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.message || JSON.stringify(body);
            status = error.status;
            errMsg = `${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        if (status == 403 || status == 401) {
            //no autorizado
            alert("No tiene privilegios suficientes para acceder al recurso requerido");
        } else {
            alert(errMsg);
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
