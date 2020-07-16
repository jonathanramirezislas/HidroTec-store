import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverpassPage } from './recoverpass.page';

describe('RecoverpassPage', () => {
  let component: RecoverpassPage;
  let fixture: ComponentFixture<RecoverpassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverpassPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverpassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
