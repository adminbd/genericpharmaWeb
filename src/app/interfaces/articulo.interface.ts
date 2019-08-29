export interface Articulo {
    id: number,
    codigo: string,
    nombre: string,
    stock: number,
    descripcion: string,
    imagen: string,
    vencimiento: Date,
    idPaquete: string,
    idClasificacion: string,
    idProveedor?: any
}