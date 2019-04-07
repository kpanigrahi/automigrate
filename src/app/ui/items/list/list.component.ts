import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material';

// service section
import { ItemsService } from '../items.service';
import { ItemTypeService } from '../../../shared/services/item-type.service';
import { UserProfileService} from '../../../shared/services/user-profile.service';

// model section
import { Item } from '../../../shared/models/item.model';
import { ItemType } from '../../../shared/models/itemType.model';
import { UserProfile } from '../../../shared/models/userProfile.model';

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
    private sUserProfile_: UserProfileService
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
}
