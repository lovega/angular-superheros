import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Superhero } from '../models/superhero';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SuperherosService {
  private url = 'http://localhost:3000/api/superheros/';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getSuperheros(): Observable<Superhero[]> {
    return this.http.get<Superhero[]>(this.url).pipe(
      map((response: any) => response),
      catchError(this.handleError<Superhero[]>('getSuperhero', []))
    );
  }

  getSuperhero(id: number): Observable<Superhero> {
    return this.http.get<Superhero[]>(`${this.url}/${id}`).pipe(
      map((response: any) => response),
      catchError(this.handleError<Superhero[]>(`getSuperhero ${id}`))
    );
  }

  postSuperhero(superhero: Superhero): Observable<any> {
    return this.http.post(this.url, superhero, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('postSuperhero'))
    );
  }

  putSuperhero(superhero: Superhero): Observable<any> {
    return this.http
      .put(`${this.url}/${superhero.id}`, superhero, this.httpOptions)
      .pipe(
        map((response: any) => response),
        catchError(this.handleError<any>('putSuperhero'))
      );
  }

  deleteSuperhero(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, this.httpOptions).pipe(
      map((response: any) => response),
      catchError(this.handleError<any>('deleteSuperhero'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
