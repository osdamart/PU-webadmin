export interface Oferta{
    id?: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen?: File;
    visible: number;
    puntos: number;
    idtipoproducto: number;
}