import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariomodalsComponent } from './usuariomodals.component';

describe('UsuariomodalsComponent', () => {
  let component: UsuariomodalsComponent;
  let fixture: ComponentFixture<UsuariomodalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariomodalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariomodalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
