import round from 'lodash-es/round';

export interface KpiToneladas {
  id: string;
  calendario_id: number;
  semanal_importe: number;
  semanal_meta: number;
  semanal_diferencia: number;
  semanal_desviacion: number;
  semanal_kpi: number;
  mensual_importe: number;
  mensual_meta: number;
  mensual_diferencia: number;
  mensual_desviacion: number;
  mensual_kpi: number;
  anual_importe: number;
  anual_meta: number;
  anual_diferencia: number;
  anual_desviacion: number;
  anual_kpi: number;
  kpi: number;
}

export class KpiVentas {
  id: string;
  sucursal: string;
  tipo: string;
  calendario_id: number;
  canceladas: number;
  canceladas_con: number;
  canceladas_cre: number;
  costo: number;
  costo_con: number;
  costo_cre: number;
  devoluciones: number;
  devoluciones_con: number;
  devoluciones_cre: number;
  facturas: number;
  facturas_con: number;
  facturas_cre: number;
  toneladas: number;
  toneladas_con: number;
  toneladas_cre: number;
  utilidad: number;
  utilidad_con: number;
  utilidad_cre: number;
  utilidad_porcentaje: number;
  utilidad_porcentaje_con: number;
  utilidad_porcentaje_cre: number;
  venta: number;
  venta_con: number;
  venta_cre: number;
  partidas: number;
  tikets: number;
  descto_real: number;
  descto_fac: number;
  vales_solicito: number;
  vales_atendio: number;
  ton_solicito?: number;
  ton_atendio?: number;
  toString() {
    return this.sucursal;
  }

  get precioPorKilo() {
    return round(this.venta / this.toneladas, 2);
  }
}

export interface KpiMargen {
  id: number;
}
