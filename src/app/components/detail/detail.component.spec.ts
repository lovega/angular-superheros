import { Router, ActivatedRoute } from '@angular/router';
import { SuperherosService } from './../../services/superheros.service';
import { Superhero } from './../../models/superhero';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { DetailComponent } from './detail.component';

const superhero: Superhero = { id: 1, superhero: 'name' };
const superherosService: any = {
  getSuperhero: () => of(superhero),
};
const superherosServiceNull: any = {
  getSuperhero: () => of(null),
};
const superherosServiceError: any = {
  getSuperhero: () => throwError({ status: 500 }),
};
const router: any = {
  navigate: () => {},
};

const activatedRoute: any = {
  snapshot: {
    paramMap: {
      get: () => {},
    },
  },
};

describe('DetailComponent 1', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailComponent],
      providers: [
        {
          provide: SuperherosService,
          useValue: superherosService,
        },
        {
          provide: Router,
          useValue: router,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#onBack()', () => {
    component.onBack();
    expect(component).toBeTruthy();
  });
});

describe('DetailComponent 2', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailComponent],
      providers: [
        {
          provide: SuperherosService,
          useValue: superherosServiceNull,
        },
        {
          provide: Router,
          useValue: router,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('DetailComponent 3', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailComponent],
      providers: [
        {
          provide: SuperherosService,
          useValue: superherosServiceError,
        },
        {
          provide: Router,
          useValue: router,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRoute,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
