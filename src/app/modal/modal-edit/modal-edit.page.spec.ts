import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalEditPage } from './modal-edit.page';

describe('ModalEditPage', () => {
  let component: ModalEditPage;
  let fixture: ComponentFixture<ModalEditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
