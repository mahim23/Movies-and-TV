import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, MatDividerModule} from '@angular/material';
import {AuthService} from './services/auth.service';
import {MoviesAppApiService} from './services/movies-app-api.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule, MatButtonModule, MatMenuModule, MatIconModule, MatDividerModule
  ],
  providers: [AuthService, MoviesAppApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
