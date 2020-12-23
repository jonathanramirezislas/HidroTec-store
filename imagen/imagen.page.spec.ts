import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagenPage } from './imagen.page';

describe('ImagenPage', () => {
  let component: ImagenPage;
  let fixture: ComponentFixture<ImagenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
