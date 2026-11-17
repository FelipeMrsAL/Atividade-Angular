export interface LeituraSolo {
  id?: string;
  data: string;
  n: number;       // Teor de Nitrogenio (mg/kg)
  p: number;       // Teor de Fosforo (mg/kg)
  k: number;       // Teor de Potassio (mg/kg)
  umidade: number; // Porcentagem de umidade do solo (ex: 0.55 = 55%)
  status?: string; // Situacao operacional (ex: "Ideal", "Alerta", "Critico")
  talhao?: string;
  cultura?: string;
}
