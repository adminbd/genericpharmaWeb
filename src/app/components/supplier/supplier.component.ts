import { Component, OnInit } from '@angular/core';
import { ContentHeaderService } from '../../servicios/content-header.service';
import { ProveedorService } from '../../servicios/proveedor.service';
import { Proveedor } from '../../interfaces/proveedor.interface';
import { ResponseInfo } from '../../interfaces/response.interface';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-supplier',
    templateUrl: './supplier.component.html',
    styles: [
        `
        .ng-invalid.ng-touched:not(form) {
          border: 1px solid red;
        }
        `
    ]
})

export class SupplierComponent implements OnInit {
    supplier: Proveedor = {
        id: 0,
        nombre: "",
        direccion: "",
        telefono: "",
        idPais: "",
        activo: true,
    };
    titleModal: string;
    dtSuppliers: any[] = [];
    paises: any[] = [];
    constructor(private _contentHeaderService: ContentHeaderService,
        private _proveedorService: ProveedorService,
        private toastr: ToastrService) {
        this.loadDataSupplier();
        this.dataSelectorPais();
    }

    ngOnInit() {
        this._contentHeaderService.setTitleHeader('Proveedores');
    }

    loadDataSupplier() {
        this._proveedorService.getProveedores().then(data => {
            this.dtSuppliers = [];
            for (let key$ in data) {
                this.dtSuppliers.push(data[key$]);
            }
        });
    }

    dataSelectorPais() {
        // Paises
        this._proveedorService.getPaises().then(data => {
            for (let key$ in data) {
                this.paises.push(data[key$]);
            }
        });
    }

    newSupplier() {
        this.titleModal = "Nuevo proveedor";
        this.supplier = {
            id: 0,
            nombre: "",
            direccion: "",
            telefono: "",
            idPais: "",
            activo: true
        }
    }

    editSupplier(supplier: any) {
        // desbloquear boton guardar si es necesario
        var btnSave = document.getElementById("saveBtn") as any;
        btnSave.disabled = false;
        // titulo del modal
        this.titleModal = "Editar proveedor";
        this.supplier = {
            id: supplier.Id,
            nombre: supplier.Nombre,
            direccion: supplier.Direccion,
            telefono: supplier.Telefono,
            idPais: supplier.IdPais,
            activo: true
        }
    }

    deleteSupplier(sup: any) {
        Swal.fire({
            title: `Desea eliminar ${sup.Nombre}?`,
            text: "Esta accion no puede revertirse!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Eliminar!'
        }).then((result) => {
            if (result.value) {
                this._proveedorService.eliminarProveedor(sup.Id).subscribe((res: ResponseInfo) => {
                    if (res.status == 200) {
                        Swal.fire(
                            'Eliminado!',
                             res.message,
                            'success'
                        )
                        this.loadDataSupplier();
                    } else {
                        Swal.fire(
                            'Error!',
                            res.message,
                            'error'
                        )
                    }
                });
            } else {
                // nada por hacer
            }
        })
    }

    guardar() {
        // // bloquea el boton guardar durante el proceso de guardado
        var btnSave = document.getElementById("saveBtn") as any;
        btnSave.disabled = true;

        if (this.supplier.id == 0) {
            /** CREAR */

            // ejecuta el servicio para guardar la informacion en el servidor
            this._proveedorService.nuevoProveedor(this.supplier).subscribe((data: ResponseInfo) => {
                if (data.status == 200) {
                    var modal = document.getElementById("closeBtn") as any;
                    modal.click();
                    this.loadDataSupplier();
                    this.toastr.success(data.message, 'GenePharmaApp', { positionClass: 'toast-bottom-right' });
                } else {
                    this.toastr.error(data.message, 'GenePharmaApp');
                    console.log(data);
                }
            });
        } else {
            /** EDITAR */
            this._proveedorService.editarProveedor(this.supplier).subscribe((data: ResponseInfo) => {
                if (data.status == 200) {
                    var modal = document.getElementById("closeBtn") as any;
                    modal.click();
                    this.loadDataSupplier();
                    this.toastr.success(data.message, 'GenePharmaApp', { positionClass: 'toast-bottom-right' });
                } else {
                    this.toastr.error(data.message, 'GenePharmaApp');
                    console.log(data);
                }
            });
        }
    }
}