import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilajustesPage } from './perfilajustes.page';

describe('PerfilajustesPage', () => {
  let component: PerfilajustesPage;
  let fixture: ComponentFixture<PerfilajustesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilajustesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilajustesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
