import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MigrationsRoutingModule } from './migrations-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [ListComponent, CreateComponent],
  imports: [
    CommonModule,
    MigrationsRoutingModule
  ]
})
export class MigrationsModule { }
