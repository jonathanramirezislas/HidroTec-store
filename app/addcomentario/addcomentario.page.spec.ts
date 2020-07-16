import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcomentarioPage } from './addcomentario.page';

describe('AddcomentarioPage', () => {
  let component: AddcomentarioPage;
  let fixture: ComponentFixture<AddcomentarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcomentarioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcomentarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
