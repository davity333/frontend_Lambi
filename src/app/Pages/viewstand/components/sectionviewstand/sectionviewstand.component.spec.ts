import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionviewstandComponent } from './sectionviewstand.component';

describe('SectionviewstandComponent', () => {
  let component: SectionviewstandComponent;
  let fixture: ComponentFixture<SectionviewstandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SectionviewstandComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionviewstandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
