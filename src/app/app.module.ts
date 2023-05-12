import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AuthModule } from '@angular/fire/auth';
import { FirestoreModule } from '@angular/fire/firestore';
import { MessagingModule } from '@angular/fire/messaging';
import { AngularFireModule, FirebaseApp } from '@angular/fire/compat';
import { FirebaseAppModule } from '@angular/fire/app';
import { GlobalErrorHandler } from 'src/app/shared/interceptors/global-error-handler';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    FirestoreModule,
    AngularFireMessagingModule,
    // FirebaseAppModule,
    // MessagingModule,
    AuthModule,
    MatSnackBarModule,
  ],
  providers: [
    { 
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
