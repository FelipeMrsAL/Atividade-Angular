# AgroMonitor IoT — Monitoramento de Sensores de Solo (`agro-sensor-web`)

Aplicação Web Single Page Application (SPA) desenvolvida em **Angular** (arquitetura modular com `AppModule` e TypeScript) para a visualização e gerenciamento de leituras físico-químicas de sensores agrícolas de solo, referente à atividade prática da disciplina **Desenvolvimento Web — Frameworks Front-End e Fundamentos do Angular** (Prof. Me. Sergio Souza Novak — UniRV).

---

## 1. Identificação dos Integrantes

| Integrante | Matrícula UniRV |
| --- | --- |
| Felipe Martins de Almeida | 24107SFT013 |
| Maria Eduarda Costa Toledo | 24107SFT067 |
---

## 2. Descrição do Projeto

O projeto implementa a aplicação **AgroMonitor IoT** seguindo todas as etapas e protótipos de referência do documento da atividade prática:

- **Etapa 1 — Criação do Projeto (`agro-sensor-web`):** Estruturado com Angular CLI, roteamento (`AppRoutingModule`), `AppModule` (`src/app/app.module.ts`) e `.gitignore` configurado para não versionar `node_modules/`.
- **Etapa 2 — Interface de Dados (`LeituraSolo`):** Definida em `src/app/interfaces/sensores.interface.ts` tipando `id?`, `data`, `n` (Nitrogênio em mg/kg), `p` (Fósforo em mg/kg), `k` (Potássio em mg/kg), `umidade` (decimal convertido para `%`) e `status?` (`Ideal`, `Alerta`, `Crítico`), além de `talhao?` e `cultura?`.
- **Etapas 3, 4 e 5 — Componente `container-tabela` e Protótipos de Referência (Figuras 1, 2 e 3):**
  - Cabeçalho institucional interpolado (`{{ titulo }}` e `{{ fazenda }}`) com selo `Safra 2026/2`.
  - Cards de indicadores rápidos (**KPIs**) no topo com contadores automáticos (*Total de Sensores*, *Solo em Nível Ideal*, *Em Alerta / Atenção* e *Em Estado Crítico*).
  - Barra de busca instantânea (por código, talhão ou cultura), filtro dropdown por status operacional e botão **+ Novo Sensor**.
  - Tabela semântica `.tabela-sensores` iterada com `*ngFor`, apresentando Identificador, Talhão/Lavoura, Nutrientes N-P-K (mg/kg), Umidade do Solo (`s.umidade * 100`%), distintivos visuais coloridos (`.badge`) para o Status Operacional, Última Telemetria (Data/Hora) e botões de Ações (edição e exclusão).
  - Modais **Cadastrar Novo Sensor IoT** (Figura 2) e **Alterar Dados do Sensor** (Figura 3).
- **Etapa 6 — Integração no Componente Raiz:** Componente integrado em `src/app/app.component.html` por meio do seletor `<app-container-tabela></app-container-tabela>`.

---

## 3. Tecnologias Utilizadas

- **Angular 18** (`@angular/core`, `@angular/common`, `@angular/forms`, `@angular/platform-browser`, `@angular/router`)
- **Angular CLI** (`@angular/cli`)
- **TypeScript 5.5**
- **HTML5 Semântico e CSS3 Responsivo**
- **Karma + Jasmine** (Testes unitários)

---

## 4. Instruções de Instalação e Inicialização

```bash
# 1. Clonar o repositório
git clone https://github.com/FelipeMrsAL/Atividade-Angular.git
cd Atividade-Angular

# 2. Instalar as dependências
npm install

# 3. Iniciar o servidor local de desenvolvimento
ng serve
```

A aplicação estará disponível no navegador em:

**[http://localhost:4200](http://localhost:4200)**

---

## 5. Captura de Tela da Aplicação (`http://localhost:4200`)

![AgroMonitor IoT renderizado em http://localhost:4200](docs/screenshots/painel-sensores.png)
