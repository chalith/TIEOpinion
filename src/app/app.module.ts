import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'primeng/carousel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelModule } from 'primeng/panel';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown'
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { DndModule } from 'ng2-dnd';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TweetViewerComponent } from './tweet-viewer/tweet-viewer.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

import { ApiService } from './services/api/api.service';
import { TweetService } from './services/tweets/tweet.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TweetViewerComponent,
    AdminLoginComponent,
    AdminHomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    CarouselModule,
    PanelModule,
    CardModule,
    MessageModule,
    DndModule.forRoot(),
    AngularFontAwesomeModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    DataViewModule,
    DropdownModule,
    InputTextModule
  ],
  providers: [
    ApiService,
    TweetService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
