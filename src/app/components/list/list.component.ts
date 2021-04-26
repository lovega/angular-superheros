import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Superhero } from './../../models/superhero';
import { DialogComponent } from '../dialog/dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SuperherosService } from 'src/app/services/superheros.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public superheros: any = new MatTableDataSource();
  public displayedColumns: string[] = [
    'id',
    'superhero',
    'publisher',
    'alter_ego',
    'first_appearance',
    'characters',
    'actions',
  ];
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;

  public search = new FormControl('');

  public loaded = false;
  public loading = false;
  public error = '';

  constructor(
    private superherosService: SuperherosService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.superherosService.getSuperheros().subscribe(
      res => {
        if (res) {
          this.superheros = new MatTableDataSource<any>(res);
          this.superheros.paginator = this.paginator;
          this.superheros.sort = this.sort;
        }
        this.loaded = true;
      },
      error => (this.error = 'An error has occurred')
    );
  }

  openDialog(action: string, el?: Superhero): void {
    this.error = '';
    const dialogRef = this.dialog.open(DialogComponent, {
      width: action === 'delete' ? '400px' : '600px',
      maxWidth: '100%',
      data: {
        action: `${action}`,
        superhero: el,
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      let err = '';
      let data = this.superheros.data;
      if (action === 'delete') {
        data = data.filter((s: Superhero) => s?.id !== result?.id);
        err = `Superhero ${el?.id} could not be delete`;
      }
      if (action === 'add') {
        data.push(result);
        this.superheros.paginator?.lastPage();
        err = `Superhero ${el?.id} could not be added`;
      }
      if (action === 'edit') {
        data = data.map((s: Superhero) => (s?.id === result?.id ? result : s));
        err = `Superhero ${el?.id} could not be edited`;
      }
      if (result && result !== 0) {
        this.superheros.data = data;
      } else {
        this.error = err;
      }
    });
  }

  onSearch(e: Event): void {
    const value = (e.target as HTMLInputElement).value;
    this.superheros.filter = value.trim().toLowerCase();
    this.superheros.paginator?.firstPage();
  }

  goToDetail(id: number): void {
    this.router.navigate(['/', id]);
  }
}
