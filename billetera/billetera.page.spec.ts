import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BilleteraPage } from './billetera.page';

describe('BilleteraPage', () => {
  let component: BilleteraPage;
  let fixture: ComponentFixture<BilleteraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BilleteraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BilleteraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
