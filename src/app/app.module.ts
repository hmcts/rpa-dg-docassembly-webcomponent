import { BrowserModule, TransferState } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AssemblyDataComponent } from './assembly-data.component';
import { AssemblyModule } from '@hmcts/dg-docassembly-webcomponent';

@NgModule({
  declarations: [
    AppComponent,
    AssemblyDataComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AssemblyModule,
    RouterModule.forRoot([
      { path: '', component: AppComponent }
    ])
  ],
  providers: [TransferState],
  bootstrap: [AppComponent]
})
export class AppModule { }
