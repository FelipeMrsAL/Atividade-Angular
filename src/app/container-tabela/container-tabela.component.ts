import { Component, OnInit } from '@angular/core';
import { LeituraSolo } from '../interfaces/sensores.interface';

@Component({
  selector: 'app-container-tabela',
  templateUrl: './container-tabela.component.html',
  styleUrls: ['./container-tabela.component.css']
})
export class ContainerTabelaComponent implements OnInit {
  titulo: string = 'Painel de Monitoramento IoT - Sensores de Solo';
  fazenda: string = 'Fazenda Modelo UniRV - Setor de Irrigacao 04';

  // Dados de teste obrigatórios da Etapa 4 do documento
  leituras: LeituraSolo[] = [
    { data: '04/11/2026 08:00', n: 150, p: 110, k: 125, umidade: 0.55, status: 'Ideal' },
    { data: '04/11/2026 09:30', n: 142, p: 105, k: 118, umidade: 0.48, status: 'Alerta' },
    { data: '04/11/2026 11:00', n: 130, p: 98, k: 110, umidade: 0.38, status: 'Critico' },
    { data: '04/11/2026 12:30', n: 155, p: 112, k: 130, umidade: 0.60, status: 'Ideal' }
  ];

  // Dados do Protótipo de Referência AgroMonitor IoT (Figura 1, 2 e 3)
  sensores: LeituraSolo[] = [
    {
      id: 'SNS-001',
      talhao: 'Talhão 12 - Norte',
      cultura: 'Soja',
      n: 165,
      p: 120,
      k: 140,
      umidade: 0.62,
      status: 'Ideal',
      data: '2026-11-04 11:45'
    },
    {
      id: 'SNS-002',
      talhao: 'Talhão 04 - Sul',
      cultura: 'Milho',
      n: 110,
      p: 85,
      k: 95,
      umidade: 0.38,
      status: 'Alerta',
      data: '2026-11-04 11:30'
    },
    {
      id: 'SNS-003',
      talhao: 'Talhão 08 - Leste',
      cultura: 'Algodão',
      n: 70,
      p: 50,
      k: 60,
      umidade: 0.18,
      status: 'Crítico',
      data: '2026-11-04 11:15'
    },
    {
      id: 'SNS-004',
      talhao: 'Talhão 15 - Oeste',
      cultura: 'Soja',
      n: 155,
      p: 115,
      k: 130,
      umidade: 0.58,
      status: 'Ideal',
      data: '2026-11-04 11:00'
    },
    {
      id: 'SNS-005',
      talhao: 'Talhão 02 - Central',
      cultura: 'Sorgo',
      n: 95,
      p: 75,
      k: 88,
      umidade: 0.32,
      status: 'Alerta',
      data: '2026-11-04 10:45'
    }
  ];

  termoBusca: string = '';
  filtroStatus: string = 'Todos';
  culturasDisponiveis: string[] = ['Soja', 'Milho', 'Algodão', 'Sorgo', 'Café', 'Cana-de-Açúcar'];

  modalAberto: boolean = false;
  modoEdicao: boolean = false;
  indiceEdicao: number | null = null;

  formularioSensor: {
    id: string;
    talhao: string;
    cultura: string;
    umidadePercentual: number | null;
    n: number | null;
    p: number | null;
    k: number | null;
    status: string;
  } = {
    id: 'SNS-006',
    talhao: '',
    cultura: 'Soja',
    umidadePercentual: null,
    n: null,
    p: null,
    k: null,
    status: 'Ideal'
  };

  constructor() { }

  ngOnInit(): void { }

  get sensoresFiltrados(): LeituraSolo[] {
    return this.sensores.filter((s) => {
      const termo = this.termoBusca.trim().toLowerCase();
      const bateBusca =
        !termo ||
        (s.id && s.id.toLowerCase().includes(termo)) ||
        (s.talhao && s.talhao.toLowerCase().includes(termo)) ||
        (s.cultura && s.cultura.toLowerCase().includes(termo));

      const statusNormalizado = this.normalizarStatus(s.status);
      const filtroNormalizado = this.normalizarStatus(this.filtroStatus);
      const bateStatus =
        this.filtroStatus === 'Todos' || statusNormalizado === filtroNormalizado;

      return bateBusca && bateStatus;
    });
  }

  get totalSensores(): number {
    return this.sensores.length;
  }

  get totalIdeal(): number {
    return this.sensores.filter((s) => this.normalizarStatus(s.status) === 'ideal').length;
  }

  get totalAlerta(): number {
    return this.sensores.filter((s) => this.normalizarStatus(s.status) === 'alerta').length;
  }

  get totalCritico(): number {
    return this.sensores.filter((s) => this.normalizarStatus(s.status) === 'critico').length;
  }

  normalizarStatus(status?: string): string {
    if (!status) return 'ideal';
    const valor = status.toLowerCase();
    if (valor.includes('crit') || valor.includes('crít')) return 'critico';
    if (valor.includes('alert')) return 'alerta';
    return 'ideal';
  }

  obterClasseBadge(status?: string): string {
    const tipo = this.normalizarStatus(status);
    if (tipo === 'critico') return 'badge-critico';
    if (tipo === 'alerta') return 'badge-alerta';
    return 'badge-ideal';
  }

  formatarStatusUpper(status?: string): string {
    const tipo = this.normalizarStatus(status);
    if (tipo === 'critico') return 'CRÍTICO';
    if (tipo === 'alerta') return 'ALERTA';
    return 'IDEAL';
  }

  abrirModalNovo(): void {
    this.modoEdicao = false;
    this.indiceEdicao = null;
    const proximoNum = this.sensores.length + 1;
    this.formularioSensor = {
      id: `SNS-${String(proximoNum).padStart(3, '0')}`,
      talhao: '',
      cultura: 'Soja',
      umidadePercentual: null,
      n: null,
      p: null,
      k: null,
      status: 'Ideal'
    };
    this.modalAberto = true;
  }

  abrirModalEdicao(sensor: LeituraSolo, index: number): void {
    const idxReal = this.sensores.indexOf(sensor);
    this.modoEdicao = true;
    this.indiceEdicao = idxReal !== -1 ? idxReal : index;
    const statusTipo = this.normalizarStatus(sensor.status);
    const statusLabel =
      statusTipo === 'critico' ? 'Crítico' : statusTipo === 'alerta' ? 'Alerta' : 'Ideal';

    this.formularioSensor = {
      id: sensor.id || `SNS-${String(index + 1).padStart(3, '0')}`,
      talhao: sensor.talhao || '',
      cultura: sensor.cultura || 'Soja',
      umidadePercentual: Math.round(sensor.umidade * 100),
      n: sensor.n,
      p: sensor.p,
      k: sensor.k,
      status: statusLabel
    };
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  salvarSensor(): void {
    const umidadePct =
      this.formularioSensor.umidadePercentual !== null &&
      this.formularioSensor.umidadePercentual !== undefined
        ? Number(this.formularioSensor.umidadePercentual)
        : 55;
    const nVal =
      this.formularioSensor.n !== null && this.formularioSensor.n !== undefined
        ? Number(this.formularioSensor.n)
        : 150;
    const pVal =
      this.formularioSensor.p !== null && this.formularioSensor.p !== undefined
        ? Number(this.formularioSensor.p)
        : 110;
    const kVal =
      this.formularioSensor.k !== null && this.formularioSensor.k !== undefined
        ? Number(this.formularioSensor.k)
        : 125;

    const dataAtual =
      this.modoEdicao && this.indiceEdicao !== null
        ? this.sensores[this.indiceEdicao].data
        : '2026-11-04 12:00';

    const novoRegistro: LeituraSolo = {
      id: this.formularioSensor.id.trim() || `SNS-${String(this.sensores.length + 1).padStart(3, '0')}`,
      talhao: this.formularioSensor.talhao.trim() || 'Talhão 04 - Sul',
      cultura: this.formularioSensor.cultura || 'Soja',
      n: nVal,
      p: pVal,
      k: kVal,
      umidade: Number((umidadePct / 100).toFixed(2)),
      status: this.formularioSensor.status,
      data: dataAtual
    };

    if (this.modoEdicao && this.indiceEdicao !== null) {
      this.sensores[this.indiceEdicao] = novoRegistro;
    } else {
      this.sensores.unshift(novoRegistro);
    }

    this.fecharModal();
  }

  excluirSensor(sensor: LeituraSolo): void {
    const idx = this.sensores.indexOf(sensor);
    if (idx !== -1) {
      this.sensores.splice(idx, 1);
    }
  }
}
