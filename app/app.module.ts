import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule, RequestOptions, Http} from '@angular/http';

import {AppComponent} from './app.component';
import {routing} from './app.routing';

import {TodoModule} from './todo/index';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing,
        TodoModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}