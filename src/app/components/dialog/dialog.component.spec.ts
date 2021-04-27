import { SuperherosService } from './../../services/superheros.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of, throwError } from 'rxjs';
import { DialogComponent } from './dialog.component';

const superhero = {
  id: 1,
  superhero: 'superhero',
  publisher: 'publisher',
  alter_ego: 'alter_ego',
  first_appearance: 'first_appearance',
  characters: 'characters',
};
const matDialog: any = {
  close: () => {},
};
const superherosService: any = {
  deleteSuperhero: () => of(superhero),
  postSuperhero: () => of(superhero),
  putSuperhero: () => of(superhero),
};

const superherosServiceError: any = {
  deleteSuperhero: () => throwError({ status: 500 }),
  postSuperhero: () => throwError({ status: 500 }),
  putSuperhero: () => throwError({ status: 500 }),
};
const matDialogData = {
  data: {
    action: 'delete',
    superhero: undefined,
  },
};

describe('DialogComponent 1', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

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
      superhero: { ...superhero },
    };
    fixture.detectChanges();
    component.onSubmit();
    expect(component.loading).toBeFalsy();
  });

  it('#onSubmit() #dataNull delete', () => {
    component.data = {
      action: 'delete',
    };
    fixture.detectChanges();
    component.onSubmit();
    expect(component.loading).toBeFalsy();
  });

  it('#onSubmit() #data add', () => {
    component.data = {
      action: 'add',
      superhero: { ...superhero },
    };
    fixture.detectChanges();
    component.onSubmit();
    expect(component.loading).toBeFalsy();
  });

  it('#onSubmit() #dataNull add', () => {
    component.data = {
      action: 'add',
    };
    fixture.detectChanges();
    component.onSubmit();
    expect(component.loading).toBeFalsy();
  });

  it('#onSubmit() #data edit', () => {
    component.data = {
      action: 'edit',
      superhero: { ...superhero },
    };
    fixture.detectChanges();
    component.onSubmit();
    expect(component.loading).toBeFalsy();
  });

  it('#onSubmit() #dataNull edit', () => {
    component.data = {
      action: 'edit',
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

describe('DialogComponent 2', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

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
          useValue: superherosServiceError,
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
      superhero: { ...superhero },
    };
    fixture.detectChanges();
    component.onSubmit();
    expect(component.loading).toBeFalsy();
  });

  it('#onSubmit() #data add', () => {
    component.data = {
      action: 'add',
      superhero: { ...superhero },
    };
    fixture.detectChanges();
    component.onSubmit();
    expect(component.loading).toBeFalsy();
  });

  it('#onSubmit() #data edit', () => {
    component.data = {
      action: 'edit',
      superhero: { ...superhero },
    };
    fixture.detectChanges();
    component.onSubmit();
    expect(component.loading).toBeFalsy();
  });
});
