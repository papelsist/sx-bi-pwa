export interface Semana {
  id: number;
  ejercicio: number;
  mes: number;
  semana: number;
  fecha_final: string;
  fecha_inicial: string;
  semestre?: number;
  trimestre?: number;
  imestre?: number;
  cuatrimestre?: number;
  calificacion?: number;
  dias_acumulados_mes?: number;
  dias_acumulados_year?: number;
  dias_lab_mes?: number;
  dias_lab_sem?: number;
  dias_lab_year?: number;
  dias_mes?: number;
  dias_sem?: number;
  dias_year?: number;
  dom_mes?: number;
  fest_mes?: number;
  fest_sem?: number;
  fest_year?: number;
  version?: number;
}
