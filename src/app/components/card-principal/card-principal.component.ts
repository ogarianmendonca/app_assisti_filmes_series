import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-principal',
  templateUrl: './card-principal.component.html',
  styleUrls: ['./card-principal.component.scss']
})
export class CardPrincipalComponent implements OnInit {
  @Input()
  posterPath: string;

  @Input()
  urlImagens: string;

  @Input()
  id: number;

  @Input()
  pages: string;

  @Input()
  action: string;

  @Input()
  urlOrigem: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  visualizar(pages, action, id) {
    this.router.navigate(['/tabs/pages/', pages, action, id]);
  }
}
