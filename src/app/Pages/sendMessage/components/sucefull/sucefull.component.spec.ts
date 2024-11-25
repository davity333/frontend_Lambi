import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucefullComponent } from './sucefull.component';

describe('SucefullComponent', () => {
  let component: SucefullComponent;
  let fixture: ComponentFixture<SucefullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SucefullComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SucefullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
