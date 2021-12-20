export interface Cupon{
    id?: number;
    cantidad: number;
    nombre: string;
    descripcion: string;
    imagen?: File;
    visible: number;
    estado: number;
    limitediario: number;
    descuento: number;
    preciominimo: number;
    fechainicio: Date;
    fechafin: Date;
    idtipocupon: number;
}