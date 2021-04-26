import { SuperherosService } from 'src/app/services/superheros.service';
import { Superhero } from '../../models/superhero';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  public form = new FormGroup({
    superhero: new FormControl(this.data.superhero?.superhero, [
      Validators.required,
    ]),
    publisher: new FormControl(this.data.superhero?.publisher, [
      Validators.required,
    ]),
    alter_ego: new FormControl(this.data.superhero?.alter_ego, [
      Validators.required,
    ]),
    first_appearance: new FormControl(this.data.superhero?.first_appearance, [
      Validators.required,
    ]),
    characters: new FormControl(this.data.superhero?.characters, [
      Validators.required,
    ]),
  });

  public loading = false;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { action: string; superhero: Superhero },
    private superherosService: SuperherosService
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.data.action === 'delete') {
      this.deleteSuperhero();
    }
    if (this.data.action === 'add') {
      this.postSuperhero();
    }
    if (this.data.action === 'edit') {
      this.putSuperhero();
    }
  }

  deleteSuperhero(): void {
    this.loading = true;
    this.superherosService.deleteSuperhero(this.data.superhero?.id).subscribe(
      () => {
        this.dialogRef.close({ id: this.data.superhero?.id });
        this.loading = false;
      },
      error => this.dialogRef.close(0)
    );
  }

  postSuperhero(): void {
    this.loading = true;
    this.superherosService.postSuperhero(this.form.value).subscribe(
      res => {
        this.dialogRef.close(res);
        this.loading = false;
      },
      error => this.dialogRef.close(0)
    );
  }

  putSuperhero(): void {
    this.loading = true;
    this.superherosService
      .putSuperhero({ id: this.data.superhero?.id, ...this.form.value })
      .subscribe(
        res => {
          this.dialogRef.close(res);
          this.loading = false;
        },
        error => this.dialogRef.close(0)
      );
  }

  getFormErrors(): boolean {
    return this.form.status !== 'VALID';
  }
}
