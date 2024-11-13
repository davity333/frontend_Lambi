import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewstandComponent } from './viewstand.component';

describe('ViewstandComponent', () => {
  let component: ViewstandComponent;
  let fixture: ComponentFixture<ViewstandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewstandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewstandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
