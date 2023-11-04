import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPasswordModalPage } from './forgot-password-modal.page';

describe('ForgotPasswordModalPage', () => {
  let component: ForgotPasswordModalPage;
  let fixture: ComponentFixture<ForgotPasswordModalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ForgotPasswordModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
