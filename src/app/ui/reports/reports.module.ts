import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';

// material section
import { MaterialModule} from '../../shared/modules/material.module';

@NgModule({
  declarations: [CreateComponent, ListComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MaterialModule
  ]
})
export class ReportsModule { }
