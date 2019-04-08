import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// service section
import { ItemTypeService } from '../../../shared/services/item-type.service';
import { ModuleService } from '../../../shared/services/module.service';
import { ItemsService } from '../items.service';

// model section
import { ItemType } from '../../../shared/models/itemType.model';
import { Module } from '../../../shared/models/module.model';
import { Item } from '../../../shared/models/item.model';

import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  cardTitle = 'Create Item';
  mode = 'Create';

  itemTypes: ItemType[];
  modules: Module;
  items: Item[];

  itemForm: FormGroup;
  constructor(
    private sItemType_: ItemTypeService,
    private sModule_: ModuleService,
    private sItems_: ItemsService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.itemForm = this.fb.group({
      id: [''],
      type: ['', [Validators.required]],
      name: ['', [Validators.required]],
      desc: [''],
      modules: ['', [Validators.required]],
      // modifiedBy: ['', [Validators.required]],
      // modifiedOn: ['', [Validators.required]]
    });
    this.setMode();
    this.sItemType_.getItemTypes();
    this.sModule_.getModules();
    this.getAll();
  }

  getAll() {
    this.sItems_.getAll().subscribe(
      (items: Item[]) => {
        this.items = items;
        this.dataSource = new MatTableDataSource<Item>(this.items);
      }
    );
  }

  displayedColumns: string[] = ['select', 'id', 'type', 'name'];
  dataSource = new MatTableDataSource<Item>();
  selection = new SelectionModel<Item>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Item): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  onSave() {
    let item: Item = {
      id: this.itemForm.controls.id.value,
      details: {
        type: this.itemForm.controls.type.value,
        name: this.itemForm.controls.name.value,
        desc: this.itemForm.controls.desc.value,
        modules: this.itemForm.controls.modules.value,
        modifiedBy: 1,
        modifiedOn: new Date()
      }
    };
    if (this.mode === 'Edit') {
      this.sItems_.update(item).subscribe(
        () => {
          console.log('item: ' + item.details.name + ' successfully udpated...');
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      // Create
      this.sItems_.create(item).subscribe(
        (item: Item) => {
          console.log('item: ' + item.details.name + ' created successfully...');
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
    this.router.navigate(['items']);
  }

  setMode() {
    this.activatedRoute.paramMap.subscribe(
      (params: any) => {
        const paramID = <number>params.get('id');
        if (paramID) {
          this.mode = 'Edit';
          this.cardTitle = 'Edit Item';
          this.populateItemForm(paramID);
        } else {
          this.mode = 'Create';
          this.cardTitle = 'Create Item';
        }
      }
    );
  }

  populateItemForm(id: number) {
    this.sItems_.get(id).subscribe(
      (item: Item) => {
        this.itemForm.patchValue({
          id: item.id,
          type: item.details.type,
          name: item.details.name,
          desc: item.details.desc,
          modules: item.details.modules
        });
      }
    );
  }
}
