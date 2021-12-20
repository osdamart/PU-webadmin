export interface Oferta{
    idoferta?: number;
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