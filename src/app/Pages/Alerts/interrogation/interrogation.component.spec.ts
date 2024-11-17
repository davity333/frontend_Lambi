import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterrogationComponent } from './interrogation.component';

describe('InterrogationComponent', () => {
  let component: InterrogationComponent;
  let fixture: ComponentFixture<InterrogationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterrogationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterrogationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
