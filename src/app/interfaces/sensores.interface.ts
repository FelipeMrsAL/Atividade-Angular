export type StatusSensor = 'Ideal' | 'Alerta' | 'Crítico';

export interface LeituraSolo {
  id?: string;
  talhao?: string;
  cultura?: string;
  data: string;
  n: number;       // Teor de Nitrogênio (mg/kg)
  p: number;       // Teor de Fósforo (mg/kg)
  k: number;       // Teor de Potássio (mg/kg)
  umidade: number; // Porcentagem de umidade do solo (ex: 0.55 = 55%)
  status?: StatusSensor | string; // Situação operacional ("Ideal", "Alerta", "Crítico")
}
