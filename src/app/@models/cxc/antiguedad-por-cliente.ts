export interface AntiguedadPorCliente {
  id: string;
  fecha: string;
  clienteId: string;
  cliente: string;
  tipo: string;
  total: number;
  saldo: number;
  porVencer: number;
  vencido: number;
  de1_30: number;
  de31_60: number;
  de61_90: number;
  mas90: number;
  facturas: number;
  atrasoMaximo: number;
  participacion: number;
  plazo: number;
  limiteDeCredito: number;
  tipoVencimiento: string;
  dateCreated: string;
  lastUpdated: string;
  createUser: string;
  updateUser: string;
}

export type SortKeys = 'saldo' | 'vencido' | 'porVencer';

export const SortCriteria: { [key: string]: string } = {
  saldo: 'Saldo',
  vencido: 'Vencido',
  porVencer: 'Por Vencer',
};
