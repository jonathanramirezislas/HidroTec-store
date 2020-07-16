import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MisdatosPage } from './misdatos.page';

describe('MisdatosPage', () => {
  let component: MisdatosPage;
  let fixture: ComponentFixture<MisdatosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MisdatosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MisdatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
