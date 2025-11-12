import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesaConectaCuatroComponent } from './mesa-conecta-cuatro.component';

describe('MesaConectaCuatroComponent', () => {
  let component: MesaConectaCuatroComponent;
  let fixture: ComponentFixture<MesaConectaCuatroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesaConectaCuatroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesaConectaCuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
