import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeituraSolo } from '../interfaces/sensores.interface';

@Component({
  selector: 'app-container-tabela',
  standalone: true,
  imports: [CommonModule],
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

  constructor() { }

  ngOnInit(): void { }
}
