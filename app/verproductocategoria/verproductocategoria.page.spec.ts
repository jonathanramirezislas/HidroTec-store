import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerproductocategoriaPage } from './verproductocategoria.page';

describe('VerproductocategoriaPage', () => {
  let component: VerproductocategoriaPage;
  let fixture: ComponentFixture<VerproductocategoriaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerproductocategoriaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerproductocategoriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
