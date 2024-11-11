import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarPuestoComponent } from './agregar-puesto.component';

describe('AgregarPuestoComponent', () => {
  let component: AgregarPuestoComponent;
  let fixture: ComponentFixture<AgregarPuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarPuestoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarPuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
