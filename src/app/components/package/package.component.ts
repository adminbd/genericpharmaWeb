import { Component, OnInit } from '@angular/core';
import { ContentHeaderService } from '../../servicios/content-header.service';
import { PaqueteService } from '../../servicios/paquete.service';
import { Paquete } from '../../interfaces/paquete.interface';
import { ResponseInfo } from '../../interfaces/response.interface';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styles: [
    `
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }
    `
  ]
})
export class PackageComponent implements OnInit {
  package: Paquete = {
    id: 0,
    descripcion: "",
    activo: true,
  };
  titleModal: string;
  dtPackages: any[] = [];
  constructor(private _contentHeaderService: ContentHeaderService,
    private _paqueteService: PaqueteService,
    private toastr: ToastrService) {
    this.loadDataPackage();
  }

  ngOnInit() {
    this._contentHeaderService.setTitleHeader('Paquete');
  }

  loadDataPackage() {
    this._paqueteService.getPaquetes().then(data => {
      this.dtPackages = [];
      for (let key$ in data) {
        this.dtPackages.push(data[key$]);
      }
    });
  }

  newPackage() {
    this.titleModal = "Nuevo paquete";
    this.package = {
      id: 0,
      descripcion: "",
      activo: true
    }
  }

  editPackage(pkg: any) {
    // desbloquear boton guardar si es necesario
    var btnSave = document.getElementById("saveBtn") as any;
    btnSave.disabled = false;
    // titulo del modal
    this.titleModal = "Editar paquete";
    this.package = {
      id: pkg.Id,
      descripcion: pkg.Descripcion,
      activo: true
    }
  }

  deletePackage(pkg: any) {
    Swal.fire({
      title: `Desea eliminar ${pkg.Descripcion}?`,
      text: "Esta accion no puede revertirse!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar!'
    }).then((result) => {
      if (result.value) {
        this._paqueteService.eliminarPaquete(pkg.Id).subscribe((res: ResponseInfo) => {
          if (res.status == 'success') {
            Swal.fire(
              'Eliminado!',
              res.message,
              'success'
            )
            this.loadDataPackage();
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

    if (this.package.id == 0) {
      /** CREAR */

      // ejecuta el servicio para guardar la informacion en el servidor
      this._paqueteService.nuevoPaquete(this.package).subscribe((data: ResponseInfo) => {
        if (data.status == 'success') {
          var modal = document.getElementById("closeBtn") as any;
          modal.click();
          this.loadDataPackage();
          this.toastr.success(data.message, 'GenePharmaApp', { positionClass: 'toast-bottom-right' });
        } else {
          this.toastr.error(data.message, 'GenePharmaApp');
          console.log(data);
        }
      });
    } else {
      /** EDITAR */
      this._paqueteService.editarPaquete(this.package).subscribe((data: ResponseInfo) => {
        if (data.status == 'success') {
          var modal = document.getElementById("closeBtn") as any;
          modal.click();
          this.loadDataPackage();
          this.toastr.success(data.message, 'GenePharmaApp', { positionClass: 'toast-bottom-right' });
        } else {
          this.toastr.error(data.message, 'GenePharmaApp');
          console.log(data);
        }
      });
    }
  }

}


