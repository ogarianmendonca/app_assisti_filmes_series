/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardPrincipalComponent } from './card-principal.component';

describe('CardPrincipalComponent', () => {
  let component: CardPrincipalComponent;
  let fixture: ComponentFixture<CardPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
