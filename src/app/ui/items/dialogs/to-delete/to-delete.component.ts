import { Component, OnInit, Inject } from '@angular/core';

// material section
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// model section
import { Item } from '../../../../shared/models/item.model';

@Component({
  selector: 'app-to-delete',
  templateUrl: './to-delete.component.html',
  styleUrls: ['./to-delete.component.scss']
})
export class ToDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ToDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item) { }

  ngOnInit() {
  }

  onNo(): void {
    this.dialogRef.close();
  }
}
