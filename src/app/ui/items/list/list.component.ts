import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';

// material section
import { MatDialog } from '@angular/material';

// service section
import { ItemsService } from '../items.service';
import { ItemTypeService } from '../../../shared/services/item-type.service';
import { UserProfileService } from '../../../shared/services/user-profile.service';

// model section
import { Item } from '../../../shared/models/item.model';
import { ItemType } from '../../../shared/models/itemType.model';
import { UserProfile } from '../../../shared/models/userProfile.model';

// dialog section
import { ToDeleteComponent } from '../../dialogs/to-delete/to-delete.component';

export interface ListItem {
  id: number;
  type: string;
  name: string;
  modifiedBy: string;
  modifiedOn: Date;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  cardTitle = 'Manage Items';

  // table section
  displayedColumns: string[] = ['id', 'type', 'name', 'modifiedBy', 'modifiedOn', 'edit', 'delete'];
  dataSource = new MatTableDataSource<ListItem>();

  itemTypes: ItemType[];
  userProfiles: UserProfile[];
  constructor(
    private sItems_: ItemsService,
    private sItemType_: ItemTypeService,
    private sUserProfile_: UserProfileService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.sItemType_.getItemTypes();
    this.sUserProfile_.getUserProfiles();
    this.getAll();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAll() {
    this.sItems_.getAll().subscribe(
      (items: Item[]) => {
        this.dataSource = new MatTableDataSource(this.populateList(items));
      }
    );
  }

  populateList(items: Item[]): ListItem[] {
    var listItems: ListItem[] = [];
    var listItem: ListItem;
    for (let item of items) {
      listItem = {
        id: item.id,
        type: this.sItemType_.getItemType(item.details.type, "name"),
        name: item.details.name,
        modifiedBy: this.sUserProfile_.getUserProfile(item.details.modifiedBy),
        modifiedOn: item.details.modifiedOn
      }
      listItems.push(listItem);
    }
    return listItems;
  }

  onEdit(id: number) {
    this.router.navigate(['items/edit', id]);
  }

  onDelete(item: Item) {
    const dialogRef = this.dialog.open(ToDeleteComponent, {
      width: '350px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sItems_.delete(result.id).subscribe(
          () => {
            console.log('item ' + result.name + ' successfully deleted...');
            this.getAll();
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
    });
  }
}
