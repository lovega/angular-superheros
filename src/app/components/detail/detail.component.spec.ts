import { Router, ActivatedRoute } from '@angular/router';
import { SuperherosService } from './../../services/superheros.service';
import { Superhero } from './../../models/superhero';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { DetailComponent } from './detail.component';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  const superhero: Superhero = { id: 1, superhero: 'name' };
  const superherosService: any = {
    getSuperhero: () => of(superhero),
  };
  const router: any = {
    navigate: () => {},
  };
  const activatedRoute: any = {
    snapshot: {
      paramMap: {
        get: () => 2,
      },
    },
  };

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

  it('#superherosService error', async () => {
    spyOn(superherosService, 'getSuperhero').and.returnValue(
      new Error('Test error')
    );
    await expect(component.error).toEqual('An error has occurred');
  });

  it('#onBack()', () => {
    component.onBack();
    expect(component).toBeTruthy();
  });
});
