import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemsRoutingModule } from './items-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';

// material section
import { MaterialModule} from '../../shared/modules/material.module';
// import { ToDeleteComponent } from './dialogs/to-delete/to-delete.component';

@NgModule({
  declarations: [ListComponent, CreateComponent],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    MaterialModule
  ]
})
export class ItemsModule { }
