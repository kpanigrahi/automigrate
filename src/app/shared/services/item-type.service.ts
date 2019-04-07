import { Injectable } from '@angular/core';

// environment section
import { environment } from '../../../environments/environment';

// http section
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// model section
import { ItemType } from '../models/itemType.model';

@Injectable({
  providedIn: 'root'
})
export class ItemTypeService {

  itemTypes: ItemType[];
  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<ItemType[]> {
    return this.http.get<ItemType[]>(`${environment.apiURL}/itemTypes`);
  }

  get(id: number): Observable<ItemType> {
    return this.http.get<ItemType>(`${environment.apiURL}/itemTypes/${id}`);
  }

  getItemTypes() {
    this.getAll().subscribe(
      (itemTypes: ItemType[]) => {
        this.itemTypes = itemTypes;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getItemType(id: number, property: string): string {
    for (let itemType of this.itemTypes) {
      if (itemType.id === id) {
        if (property.toUpperCase() === 'NAME') {
          return itemType.name;
        } else if (property.toUpperCase() === 'DESC') {
          return itemType.desc;
        }
      }
    }
    return '';
  }
}
