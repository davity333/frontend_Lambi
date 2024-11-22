import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteByBuyerComponent } from './favorite-by-buyer.component';

describe('FavoriteByBuyerComponent', () => {
  let component: FavoriteByBuyerComponent;
  let fixture: ComponentFixture<FavoriteByBuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteByBuyerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteByBuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
