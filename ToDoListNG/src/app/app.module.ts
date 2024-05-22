import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './User/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppInitService } from './app-init.service';
import { RegisterUserComponent } from './User/register-user/register-user.component';
import { ListToDosByIdComponent } from './todos/list-to-dos-by-id/list-to-dos-by-id.component';
import { CompletePipe } from './core/complete.pipe';
import { NewTodoComponent } from './todos/new-todo/new-todo.component';
import { PrioritylevelPipe } from './todos/prioritylevel.pipe';
import { TodoDetailsComponent } from './todos/todo-details/todo-details.component';
import { NewTodoItemComponent } from './todoitems/new-todo-item/new-todo-item.component';
import { NavComponent } from './core/nav/nav.component';
import { TodoBgPipe } from './todos/todo-bg.pipe';
import { EditEnableComponent } from './core/edit-enable/edit-enable.component';
import { EditEnablePipe } from './core/edit-enable.pipe';
import { SearchPipe } from './core/search.pipe';
import { SearchToDosPipe } from './todos/search-to-dos.pipe';
import { SortPipe } from './core/sort.pipe';


const startupServiceFactory = (appinit: AppInitService) => {
  console.debug("startupServiceFactory()");
  return() => appinit.getSettings();
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterUserComponent,
    ListToDosByIdComponent,
    NewTodoComponent,
    CompletePipe,
    PrioritylevelPipe,
    TodoDetailsComponent,
    NewTodoItemComponent,
    NavComponent,
    TodoBgPipe,
    EditEnableComponent,
    EditEnablePipe,
    SearchPipe,
    SearchToDosPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AppInitService, {
    provide:APP_INITIALIZER,
    useFactory:startupServiceFactory,
    deps: [AppInitService],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
