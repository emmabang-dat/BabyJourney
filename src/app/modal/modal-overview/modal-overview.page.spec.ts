import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalOverviewPage } from './modal-overview.page';

describe('ModalOverviewPage', () => {
  let component: ModalOverviewPage;
  let fixture: ComponentFixture<ModalOverviewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModalOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
