import { MatPaginator } from '@angular/material/paginator';
import { Superhero } from './../../models/superhero';
import { SuperherosService } from 'src/app/services/superheros.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ListComponent } from './list.component';

const superhero: Superhero = { id: 1 };
const superheros: Superhero[] = [superhero, { id: 2 }];
const superherosService: any = {
  getSuperheros: () => of(superheros),
};
const superherosServiceNull: any = {
  getSuperheros: () => of(null),
};

const superherosServiceError: any = {
  getSuperheros: () => throwError({ status: 500 }),
};
const matDialog: any = {
  open: () => {},
};
const router: any = {
  navigate: () => {},
};

const matPaginator: any = {
  lastPage: () => {},
  firstPage: () => {},
};

describe('ListComponent 1', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
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
          provide: matPaginator,
          useValue: {},
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

    component.superheros.paginator = {
      lastPage: () => {},
      firstPage: () => {},
    };
    fixture.detectChanges();

    component.openDialog('delete', superhero);
    expect(component.superheros.data).not.toBeNull();
    component.openDialog('add', superhero);
    expect(component.superheros.data).not.toBeNull();
    component.openDialog('edit', superhero);
    expect(component.superheros.data).not.toBeNull();
  });

  it('#openDialog() with button #superheros', () => {
    const spy = spyOn(component.dialog, 'open');
    const buttons = fixture.nativeElement.querySelectorAll('button');
    expect(buttons[0]).not.toBeNull();
    buttons[0].dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(component.superheros.data).not.toBeNull();
  });

  it('#openDialog() should change #error and #paginator', () => {
    const spy = spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of(null),
    } as MatDialogRef<typeof component>);
    fixture.detectChanges();
    component.openDialog('delete');
    component.openDialog('add');
    component.openDialog('edit');
    expect(spy).toHaveBeenCalledTimes(3);
    expect(component.superheros.data).not.toBeNull();
  });

  it('#onSearch() should change #superheros', () => {
    component.superheros.paginator = {
      lastPage: () => {},
      firstPage: () => {},
    };
    const input = fixture.nativeElement.querySelector('input');
    expect(input).not.toBeNull();
    input.value = 1;
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    expect(component.superheros.data).not.toBeNull();
  });

  it('#goToDetail()', () => {
    component.goToDetail(1);
    expect(component).toBeTruthy();
  });
});

describe('ListComponent 2', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      providers: [
        {
          provide: SuperherosService,
          useValue: superherosServiceNull,
        },
        {
          provide: MatDialog,
          useValue: matDialog,
        },
        {
          provide: MatPaginator,
          useValue: {},
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

  it('#init no data', () => {
    expect(component.superheros.data).toEqual([]);
    expect(component.superheros.paginator).toBeUndefined();
  });

  it('#openDialog() #paginator', () => {
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of(superhero),
    } as MatDialogRef<typeof component>);
    component.openDialog('delete');
    component.openDialog('add');
    component.openDialog('edit');
    expect(component.superheros.paginator).toBeUndefined();
  });

  it('#onSearch()  #paginator', () => {
    const input = fixture.nativeElement.querySelector('input');
    expect(input).not.toBeNull();
    input.value = 1;
    input.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();
    expect(component.superheros.paginator).toBeUndefined();
  });
});

describe('ListComponent 3', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      providers: [
        {
          provide: SuperherosService,
          useValue: superherosServiceError,
        },
        {
          provide: MatDialog,
          useValue: matDialog,
        },
        {
          provide: MatPaginator,
          useValue: {},
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
    component.superheros.data = undefined;
    fixture.detectChanges();
  });

  it('#init no data', () => {
    expect(component.superheros.data).toBeUndefined();
    expect(component.superheros.paginator).toBeUndefined();
  });

  it('#openDialog() #error', () => {
    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => of(superhero),
    } as MatDialogRef<typeof component>);
    component.openDialog('delete');
    component.openDialog('add');
    component.openDialog('edit');
    expect(component.superheros.paginator).toBeUndefined();
  });
});
