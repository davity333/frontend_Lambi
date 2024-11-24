import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSugerantionComponent } from './card-sugerantion.component';

describe('CardSugerantionComponent', () => {
  let component: CardSugerantionComponent;
  let fixture: ComponentFixture<CardSugerantionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardSugerantionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSugerantionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
