import { Superhero } from './../../models/superhero';
import { SuperherosService } from 'src/app/services/superheros.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ListComponent } from './list.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const superhero: Superhero = { id: 1 };
  const superheros: Superhero[] = [superhero, { id: 2 }];
  const superherosService: any = {
    getSuperheros: () => of(superheros),
  };
  const matDialog: any = {
    open: () => {},
  };
  const router: any = {
    navigate: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      providers: [
        {
          provide: SuperherosService,
          useValue: superherosService,
        },
        {
          provide: MatDialog,
          useValue: matDialog,
        },
        {
          provide: Router,
          useValue: router,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#openDialog() should change #superheros', () => {
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of(superhero),
    } as MatDialogRef<typeof component>);
    component.openDialog('delete', superhero);
    expect(component.superheros.data).toEqual([{ id: 2 }]);
    component.openDialog('add', superhero);
    expect(component.superheros.data).toEqual([{ id: 2 }, superhero]);
    component.openDialog('edit', superhero);
    expect(component.superheros.data).toEqual([{ id: 2 }, superhero]);
  });

  it('#openDialog() should change #error', () => {
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of(null),
    } as MatDialogRef<typeof component>);
    component.openDialog('delete', superhero);
    expect(component.error).toEqual('Superhero 1 could not be delete');
  });

  it('#onSearch() should change #superheros', () => {
    const input = fixture.nativeElement.querySelector('input');
    input.value = 1;
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    expect(component.superheros.data).toEqual([superhero, { id: 2 }]);
  });

  it('#goToDetail()', () => {
    component.goToDetail(1);
    expect(component).toBeTruthy();
  });
});
