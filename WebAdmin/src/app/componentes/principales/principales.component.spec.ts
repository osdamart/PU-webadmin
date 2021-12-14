import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalesComponent } from './principales.component';

describe('PrincipalesComponent', () => {
  let component: PrincipalesComponent;
  let fixture: ComponentFixture<PrincipalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrincipalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrincipalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
