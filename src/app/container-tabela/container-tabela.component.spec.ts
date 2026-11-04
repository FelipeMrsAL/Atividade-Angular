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
});
