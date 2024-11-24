import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingLocationComponent } from './waiting-location.component';

describe('WaitingLocationComponent', () => {
  let component: WaitingLocationComponent;
  let fixture: ComponentFixture<WaitingLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WaitingLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
