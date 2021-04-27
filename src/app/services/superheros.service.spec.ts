import { Superhero } from './../models/superhero';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { SuperherosService } from './superheros.service';

describe('SuperherosService', () => {
  let service: SuperherosService;
  const superhero: Superhero = { id: 1 };
  let httpClientSpy: {
    get: jasmine.Spy;
    put: jasmine.Spy;
    post: jasmine.Spy;
    delete: jasmine.Spy;
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    httpClientSpy = jasmine.createSpyObj('HttpClient', [
      'get',
      'put',
      'post',
      'delete',
    ]);
    service = new SuperherosService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getSuperheros should return value from observable', async () => {
    httpClientSpy.get.and.returnValue(of(superhero));
    service
      .getSuperheros()
      .subscribe(heroes => expect(heroes).not.toBeNull(), fail);
  });

  it('getSuperhero should return value from observable', async () => {
    httpClientSpy.get.and.returnValue(of(superhero));
    service
      .getSuperhero(1)
      .subscribe(heroes => expect(heroes).not.toBeNull(), fail);
  });

  it('postSuperhero should return value from observable', async () => {
    httpClientSpy.post.and.returnValue(of(superhero));
    service
      .postSuperhero(superhero)
      .subscribe(heroes => expect(heroes).not.toBeNull(), fail);
  });

  it('putSuperhero should return value from observable', async () => {
    httpClientSpy.put.and.returnValue(of(superhero));
    service
      .putSuperhero(superhero)
      .subscribe(heroes => expect(heroes).not.toBeNull(), fail);
  });

  it('deleteSuperhero should return value from observable', async () => {
    httpClientSpy.delete.and.returnValue(of(superhero));
    service
      .deleteSuperhero(1)
      .subscribe(heroes => expect(heroes).not.toBeNull(), fail);
  });

  it('getSuperheros should return error from observable', async () => {
    httpClientSpy.get.and
      .returnValue(throwError({ status: 500 }))
      .and.returnValue(throwError({ status: 500 }));
    service
      .getSuperheros()
      .subscribe(heroes => expect(heroes).not.toBeNull(), fail);
  });
});
