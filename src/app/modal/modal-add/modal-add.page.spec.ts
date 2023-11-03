import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalAddPage } from './modal-add.page';

describe('ModalAddPage', () => {
  let component: ModalAddPage;
  let fixture: ComponentFixture<ModalAddPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
