export interface Producto{
    id?: number;
    nombre: string;
    descripcion: string;
    precio: number;
    imagen?: File;
    visible: number;
    puntos: number;
    idtipoproducto: number;
}