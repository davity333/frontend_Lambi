import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionSellComponent } from './section-sell.component';

describe('SectionSellComponent', () => {
  let component: SectionSellComponent;
  let fixture: ComponentFixture<SectionSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionSellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
