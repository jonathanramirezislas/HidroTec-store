import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicuentaPage } from './micuenta.page';

describe('MicuentaPage', () => {
  let component: MicuentaPage;
  let fixture: ComponentFixture<MicuentaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicuentaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
