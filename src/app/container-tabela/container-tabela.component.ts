import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeituraSolo, StatusSensor } from '../interfaces/sensores.interface';

@Component({
  selector: 'app-container-tabela',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './container-tabela.component.html',
  styleUrls: ['./container-tabela.component.css']
})
export class ContainerTabelaComponent implements OnInit {
  titulo: string = 'Painel de Monitoramento IoT - Sensores de Solo';
  fazenda: string = 'Fazenda Modelo UniRV - Setor de Irrigação 04';

  leituras: LeituraSolo[] = [
    {
      id: 'SNS-001',
      talhao: 'Talhão 01 - Norte',
      cultura: 'Soja',
      data: '04/11/2026 08:00',
      n: 150,
      p: 110,
      k: 125,
      umidade: 0.55,
      status: 'Ideal'
    },
    {
      id: 'SNS-002',
      talhao: 'Talhão 02 - Sul',
      cultura: 'Milho',
      data: '04/11/2026 09:30',
      n: 142,
      p: 105,
      k: 118,
      umidade: 0.48,
      status: 'Alerta'
    },
    {
      id: 'SNS-003',
      talhao: 'Talhão 03 - Leste',
      cultura: 'Algodão',
      data: '04/11/2026 11:00',
      n: 130,
      p: 98,
      k: 110,
      umidade: 0.38,
      status: 'Crítico'
    },
    {
      id: 'SNS-004',
      talhao: 'Talhão 04 - Oeste',
      cultura: 'Soja',
      data: '04/11/2026 12:30',
      n: 155,
      p: 112,
      k: 130,
      umidade: 0.60,
      status: 'Ideal'
    }
  ];

  termoBusca: string = '';
  filtroStatus: string = 'Todos';
  culturasDisponiveis: string[] = ['Soja', 'Milho', 'Algodão', 'Sorgo', 'Café'];

  modalAberto: boolean = false;
  modoEdicao: boolean = false;
  indiceEdicao: number | null = null;

  formularioSensor: {
    id: string;
    talhao: string;
    cultura: string;
    data: string;
    n: number;
    p: number;
    k: number;
    umidadePercentual: number;
    status: StatusSensor;
  } = this.criarFormularioPadrao();

  constructor() { }

  ngOnInit(): void { }

  get leiturasFiltradas(): LeituraSolo[] {
    return this.leituras.filter((item) => {
      const termo = this.termoBusca.trim().toLowerCase();
      const correspondeBusca =
        !termo ||
        (item.id && item.id.toLowerCase().includes(termo)) ||
        (item.talhao && item.talhao.toLowerCase().includes(termo)) ||
        (item.cultura && item.cultura.toLowerCase().includes(termo)) ||
        item.data.toLowerCase().includes(termo);

      const correspondeStatus =
        this.filtroStatus === 'Todos' || item.status === this.filtroStatus;

      return correspondeBusca && correspondeStatus;
    });
  }

  get totalSensores(): number {
    return this.leituras.length;
  }

  get totalIdeal(): number {
    return this.leituras.filter((s) => s.status === 'Ideal').length;
  }

  get totalAlerta(): number {
    return this.leituras.filter((s) => s.status === 'Alerta').length;
  }

  get totalCritico(): number {
    return this.leituras.filter(
      (s) => s.status === 'Crítico' || s.status === 'Critico'
    ).length;
  }

  private criarFormularioPadrao() {
    const proximoNumero = this.leituras ? this.leituras.length + 1 : 5;
    const idGerado = `SNS-${String(proximoNumero).padStart(3, '0')}`;
    return {
      id: idGerado,
      talhao: '',
      cultura: 'Soja',
      data: '04/11/2026 14:00',
      n: 145,
      p: 105,
      k: 120,
      umidadePercentual: 55,
      status: 'Ideal' as StatusSensor
    };
  }

  abrirModalNovo(): void {
    this.modoEdicao = false;
    this.indiceEdicao = null;
    this.formularioSensor = this.criarFormularioPadrao();
    this.modalAberto = true;
  }

  abrirModalEdicao(leitura: LeituraSolo, index: number): void {
    const indiceOriginal = this.leituras.indexOf(leitura);
    this.modoEdicao = true;
    this.indiceEdicao = indiceOriginal !== -1 ? indiceOriginal : index;
    this.formularioSensor = {
      id: leitura.id || `SNS-${String(index + 1).padStart(3, '0')}`,
      talhao: leitura.talhao || `Setor 0${index + 1}`,
      cultura: leitura.cultura || 'Soja',
      data: leitura.data,
      n: leitura.n,
      p: leitura.p,
      k: leitura.k,
      umidadePercentual: Math.round(leitura.umidade * 100),
      status: (leitura.status as StatusSensor) || 'Ideal'
    };
    this.modalAberto = true;
  }

  fecharModal(): void {
    this.modalAberto = false;
  }

  atualizarStatusAutomatico(): void {
    const u = Number(this.formularioSensor.umidadePercentual);
    if (u >= 50) {
      this.formularioSensor.status = 'Ideal';
    } else if (u >= 40) {
      this.formularioSensor.status = 'Alerta';
    } else {
      this.formularioSensor.status = 'Crítico';
    }
  }

  salvarSensor(): void {
    const umidadeDecimal = Number((this.formularioSensor.umidadePercentual / 100).toFixed(2));
    const registro: LeituraSolo = {
      id: this.formularioSensor.id.trim() || `SNS-${String(this.leituras.length + 1).padStart(3, '0')}`,
      talhao: this.formularioSensor.talhao.trim() || 'Talhão Padrão',
      cultura: this.formularioSensor.cultura,
      data: this.formularioSensor.data.trim() || '04/11/2026 14:00',
      n: Number(this.formularioSensor.n),
      p: Number(this.formularioSensor.p),
      k: Number(this.formularioSensor.k),
      umidade: umidadeDecimal,
      status: this.formularioSensor.status
    };

    if (this.modoEdicao && this.indiceEdicao !== null) {
      this.leituras[this.indiceEdicao] = registro;
    } else {
      this.leituras.push(registro);
    }

    this.fecharModal();
  }

  excluirSensor(leitura: LeituraSolo): void {
    const idx = this.leituras.indexOf(leitura);
    if (idx !== -1) {
      this.leituras.splice(idx, 1);
    }
  }
}
