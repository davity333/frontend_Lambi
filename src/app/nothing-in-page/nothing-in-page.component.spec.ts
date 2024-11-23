import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NothingInPageComponent } from './nothing-in-page.component';

describe('NothingInPageComponent', () => {
  let component: NothingInPageComponent;
  let fixture: ComponentFixture<NothingInPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NothingInPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NothingInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
