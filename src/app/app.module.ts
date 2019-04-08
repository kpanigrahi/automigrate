import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// http section
import { HttpClientModule} from '@angular/common/http';

// material section
import { MaterialModule } from './shared/modules/material.module';

// custom component section
import { NavBarComponent } from './ui/nav-bar/nav-bar.component';
import { ProfileComponent } from './ui/profile/profile.component';
import { SettingsComponent } from './ui/settings/settings.component';
import { ToDeleteComponent } from './ui/dialogs/to-delete/to-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProfileComponent,
    SettingsComponent,
    ToDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ToDeleteComponent]
})
export class AppModule { }
