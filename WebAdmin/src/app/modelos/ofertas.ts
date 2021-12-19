export interface Oferta{
    id?: number;
    nombre: string;
    descripcion: string;
    descuento: number;
    imagen?: File;
    visible: number;
    estado: number;
    fechainicio: Date;
    fechafin: Date;
    idtipooferta: number;
}