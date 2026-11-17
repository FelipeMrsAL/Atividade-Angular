import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ContainerTabelaComponent } from './container-tabela.component';

describe('ContainerTabelaComponent', () => {
  let component: ContainerTabelaComponent;
  let fixture: ComponentFixture<ContainerTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ContainerTabelaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have AgroMonitor IoT title and subtitle', () => {
    expect(component.titulo).toBe('AgroMonitor IoT');
    expect(component.fazenda).toBe('Telemetria e Manejo Agronômico de Precisão • UniRV');
  });

  it('should contain the 5 telemetry sensors in leituras', () => {
    expect(component.leituras.length).toBe(5);
    expect(component.totalSensores).toBe(5);
    expect(component.totalIdeal).toBe(2);
    expect(component.totalAlerta).toBe(2);
    expect(component.totalCritico).toBe(1);
  });

  it('should filter readings by status', () => {
    component.filtroStatus = 'Crítico';
    expect(component.leiturasFiltradas.length).toBe(1);
    expect(component.leiturasFiltradas[0].id).toBe('SNS-003');
  });
});
