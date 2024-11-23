import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesStandsComponent } from './services-stands.component';

describe('ServicesStandsComponent', () => {
  let component: ServicesStandsComponent;
  let fixture: ComponentFixture<ServicesStandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicesStandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesStandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
