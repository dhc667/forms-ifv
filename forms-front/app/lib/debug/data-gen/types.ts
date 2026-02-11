export interface DataGeneratorOptions {
  count?: number;
  startDate?: Date;
  endDate?: Date;
}

export interface FormRow {
  id: string;
  titulo: string;
  elaborado: string;
  revisado: string;
  aprobado: string;
  fecha: string;
}

export interface SchemaRow {
  id: string;
  titulo: string;
  version: string;
  creadoPor: string;
  fechaCreacion: string;
  estado: 'activo' | 'borrador' | 'archivado';
}

export interface MyFormRow {
  id: string;
  titulo: string;
  estado: 'draft' | 'pending' | 'approved';
  fechaEnvio?: string;
  revisadoPor?: string;
  aprobadoPor?: string;
}