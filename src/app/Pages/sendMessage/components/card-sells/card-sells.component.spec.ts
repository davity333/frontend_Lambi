import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSellsComponent } from './card-sells.component';

describe('CardSellsComponent', () => {
  let component: CardSellsComponent;
  let fixture: ComponentFixture<CardSellsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardSellsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
