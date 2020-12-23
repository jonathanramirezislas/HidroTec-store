import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasPage } from './compras.page';

describe('ComprasPage', () => {
  let component: ComprasPage;
  let fixture: ComponentFixture<ComprasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
