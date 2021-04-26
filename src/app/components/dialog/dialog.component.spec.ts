import { Superhero } from './../../models/superhero';
import { SuperherosService } from './../../services/superheros.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  const superhero = { id: 1 };
  const matDialog: any = {
    close: () => {},
  };
  const superherosService: any = {
    deleteSuperhero: () => of(superhero),
    postSuperhero: () => of(superhero),
    putSuperhero: () => of(superhero),
  };
  const matDialogData = {
    data: {
      action: 'delete',
      superhero: { id: 1 },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: matDialog,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: matDialogData,
        },
        {
          provide: SuperherosService,
          useValue: superherosService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onSubmit() #data delete', () => {
    component.data = {
      action: 'delete',
      superhero: { id: 1 },
    };
    fixture.detectChanges();
    component.onSubmit();
    expect(component.loading).toBeFalsy();
  });

  it('#onSubmit() #data add', () => {
    component.data = {
      action: 'add',
      superhero: { id: 1 },
    };
    fixture.detectChanges();
    component.onSubmit();
    expect(component.loading).toBeFalsy();
  });

  it('#onSubmit() #data edit', () => {
    component.data = {
      action: 'edit',
      superhero: { id: 1 },
    };
    fixture.detectChanges();
    component.onSubmit();
    expect(component.loading).toBeFalsy();
  });

  it('#getFormErrors() #form', () => {
    component.getFormErrors();
    expect(component.form.status).toEqual('INVALID');
  });
});
