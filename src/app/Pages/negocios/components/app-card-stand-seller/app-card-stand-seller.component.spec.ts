import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppCardStandSellerComponent } from './app-card-stand-seller.component';

describe('AppCardStandSellerComponent', () => {
  let component: AppCardStandSellerComponent;
  let fixture: ComponentFixture<AppCardStandSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppCardStandSellerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppCardStandSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
