import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditardatosPage } from './editardatos.page';

describe('EditardatosPage', () => {
  let component: EditardatosPage;
  let fixture: ComponentFixture<EditardatosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditardatosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditardatosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
