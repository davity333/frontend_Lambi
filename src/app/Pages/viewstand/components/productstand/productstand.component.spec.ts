import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductstandComponent } from './productstand.component';

describe('ProductstandComponent', () => {
  let component: ProductstandComponent;
  let fixture: ComponentFixture<ProductstandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductstandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductstandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
