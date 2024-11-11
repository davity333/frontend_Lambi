import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicacionComponent } from './comunicacion.component';

describe('ComunicacionComponent', () => {
  let component: ComunicacionComponent;
  let fixture: ComponentFixture<ComunicacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComunicacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComunicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
