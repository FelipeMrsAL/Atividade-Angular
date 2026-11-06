import { Component } from '@angular/core';
import { ContainerTabelaComponent } from './container-tabela/container-tabela.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContainerTabelaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'agro-sensor-web';
}
