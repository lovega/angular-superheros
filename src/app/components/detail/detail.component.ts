import { SuperherosService } from 'src/app/services/superheros.service';
import { Superhero } from './../../models/superhero';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public id: any = '';
  public loaded = false;
  public error: any = '';
  public superhero: Partial<Superhero> = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private superherosService: SuperherosService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.superherosService.getSuperhero(this.id).subscribe(
      res => {
        if (res) {
          this.superhero = res;
        }
        this.loaded = true;
      },
      error => {
        this.error = 'An error has occurred';
        this.loaded = true;
      }
    );
  }

  onBack(): void {
    this.router.navigate(['/']);
  }
}
