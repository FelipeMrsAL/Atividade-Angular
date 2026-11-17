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

  it('should have the required title and fazenda from Etapa 4', () => {
    expect(component.titulo).toBe('Painel de Monitoramento IoT - Sensores de Solo');
    expect(component.fazenda).toBe('Fazenda Modelo UniRV - Setor de Irrigacao 04');
  });

  it('should contain the 4 mandatory readings in leituras (Etapa 4)', () => {
    expect(component.leituras.length).toBe(4);
    expect(component.leituras[0].umidade).toBe(0.55);
    expect(component.leituras[1].umidade).toBe(0.48);
    expect(component.leituras[2].umidade).toBe(0.38);
    expect(component.leituras[3].umidade).toBe(0.60);
  });

  it('should contain the 5 telemetry sensors from the prototype (Figure 1)', () => {
    expect(component.sensores.length).toBe(5);
    expect(component.totalSensores).toBe(5);
    expect(component.totalIdeal).toBe(2);
    expect(component.totalAlerta).toBe(2);
    expect(component.totalCritico).toBe(1);
  });

  it('should filter telemetry sensors by status', () => {
    component.filtroStatus = 'Crítico';
    expect(component.sensoresFiltrados.length).toBe(1);
    expect(component.sensoresFiltrados[0].id).toBe('SNS-003');
  });
});
