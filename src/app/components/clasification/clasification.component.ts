import { Component, OnInit } from '@angular/core';
import { ContentHeaderService } from '../../servicios/content-header.service';
import { ClasificationService } from '../../servicios/clasification.service';
import { Clasificacion } from '../../interfaces/clasificacion.interface';
import { ResponseInfo } from '../../interfaces/response.interface';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clasification',
  templateUrl: './clasification.component.html',
  styles: [
    `
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }
    `
  ]
})
export class ClasificationComponent implements OnInit {
  clasification: Clasificacion = {
    id: 0,
    descripcion: "",
    activo: true,
  };
  titleModal: string;
  dtClasification: any[] = [];
  constructor(private _contentHeaderService: ContentHeaderService,
    private _clasificationService: ClasificationService,
    private toastr: ToastrService) {
    this.loadDataClasification();
  }

  ngOnInit() {
    this._contentHeaderService.setTitleHeader('Clasificacion');
  }

  loadDataClasification() {
    this._clasificationService.getClasificaciones().then(data => {
      this.dtClasification = [];
      for (let key$ in data) {
        this.dtClasification.push(data[key$]);
      }
    });
  }

  newClasification() {
    this.titleModal = "Nueva clasificacion";
    this.clasification = {
      id: 0,
      descripcion: "",
      activo: true
    }
  }

  editClasification(clasifi: any) {
    // desbloquear boton guardar si es necesario
    var btnSave = document.getElementById("saveBtn") as any;
    btnSave.disabled = false;
    // titulo del modal
    this.titleModal = "Editar clasificacion";
    this.clasification = {
      id: clasifi.Id,
      descripcion: clasifi.Descripcion,
      activo: true
    }
  }

  deleteClasification(clas: any) {
    Swal.fire({
      title: `Desea eliminar ${clas.Descripcion}?`,
      text: "Esta accion no puede revertirse!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar!'
    }).then((result) => {
      if (result.value) {
        this._clasificationService.eliminarClasificacion(clas.Id).subscribe((res: ResponseInfo) => {
          if (res.status == 'success') {
            Swal.fire(
              'Eliminado!',
              res.message,
              'success'
            )
            this.loadDataClasification();
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

    if (this.clasification.id == 0) {
      /** CREAR */

      // ejecuta el servicio para guardar la informacion en el servidor
      this._clasificationService.nuevaClasificacion(this.clasification).subscribe((data: ResponseInfo) => {
        if (data.status == 'success') {
          var modal = document.getElementById("closeBtn") as any;
          modal.click();
          this.loadDataClasification();
          this.toastr.success(data.message, 'GenePharmaApp', { positionClass: 'toast-bottom-right' });
        } else {
          this.toastr.error(data.message, 'GenePharmaApp');
          console.log(data);
        }
      });
    } else {
      /** EDITAR */
      this._clasificationService.editarClasificacion(this.clasification).subscribe((data: ResponseInfo) => {
        if (data.status == 'success') {
          var modal = document.getElementById("closeBtn") as any;
          modal.click();
          this.loadDataClasification();
          this.toastr.success(data.message, 'GenePharmaApp', { positionClass: 'toast-bottom-right' });
        } else {
          this.toastr.error(data.message, 'GenePharmaApp');
          console.log(data);
        }
      });
    }
  }
}

