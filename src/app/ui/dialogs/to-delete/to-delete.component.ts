import { Component, OnInit, Inject } from '@angular/core';

// material section
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-to-delete',
  templateUrl: './to-delete.component.html',
  styleUrls: ['./to-delete.component.scss']
})
export class ToDeleteComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ToDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onNo(): void {
    this.dialogRef.close();
  }
}
