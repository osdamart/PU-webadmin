import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCombosComponent } from './editar-combos.component';

describe('EditarCombosComponent', () => {
  let component: EditarCombosComponent;
  let fixture: ComponentFixture<EditarCombosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarCombosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarCombosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
