import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContainerTabelaComponent } from './container-tabela.component';

describe('ContainerTabelaComponent', () => {
  let component: ContainerTabelaComponent;
  let fixture: ComponentFixture<ContainerTabelaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerTabelaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerTabelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the required title and fazenda', () => {
    expect(component.titulo).toBe('Painel de Monitoramento IoT - Sensores de Solo');
    expect(component.fazenda).toBe('Fazenda Modelo UniRV - Setor de Irrigação 04');
  });

  it('should initialize with 4 mandatory sensor readings', () => {
    expect(component.leituras.length).toBe(4);
    expect(component.totalSensores).toBe(4);
    expect(component.totalIdeal).toBe(2);
    expect(component.totalAlerta).toBe(1);
    expect(component.totalCritico).toBe(1);
  });

  it('should render the 4 rows and humidity percentages in the table', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(4);
    expect(compiled.textContent).toContain('55%');
    expect(compiled.textContent).toContain('48%');
    expect(compiled.textContent).toContain('38%');
    expect(compiled.textContent).toContain('60%');
  });

  it('should filter readings by status', () => {
    component.filtroStatus = 'Crítico';
    expect(component.leiturasFiltradas.length).toBe(1);
    expect(component.leiturasFiltradas[0].umidade).toBe(0.38);
  });
});
