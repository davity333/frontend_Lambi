import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliciosoComponent } from './delicioso.component';

describe('DeliciosoComponent', () => {
  let component: DeliciosoComponent;
  let fixture: ComponentFixture<DeliciosoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliciosoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliciosoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
