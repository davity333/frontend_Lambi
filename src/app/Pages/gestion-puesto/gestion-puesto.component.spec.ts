import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPuestoComponent } from './gestion-puesto.component';

describe('GestionPuestoComponent', () => {
  let component: GestionPuestoComponent;
  let fixture: ComponentFixture<GestionPuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionPuestoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionPuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
