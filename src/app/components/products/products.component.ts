import { Component, OnInit } from '@angular/core';
import { ContentHeaderService } from '../../servicios/content-header.service';
import { ArticulosService } from '../../servicios/articulos.service';
import { Articulo } from 'src/app/interfaces/articulo.interface';
import { ToastrService } from 'ngx-toastr';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [
    `
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid red;
    }
    `
  ]
})
export class ProductsComponent implements OnInit {

  item: Articulo = {
    id: 0,
    codigo: "",
    nombre: "",
    stock: 0,
    descripcion: "",
    imagen: "",
    vencimiento: null,
    idPaquete: "",
    idClasificacion: ""
  };
  titleModal: string;
  dtItems: any[] = [];
  paquetes: any[] = [];
  clasificacion: any[] = [];
  // loadAPI: Promise<any>;
  selectedFile: ImageSnippet;
  formDataFile: FormData;
  model: any;
  title = 'sweetAlert'

  constructor(private _contentHeaderService: ContentHeaderService,
    private _articuloService: ArticulosService,
    private toastr: ToastrService) {

    // this.loadAPI = new Promise((resolve) => {
    //   this.loadScript();
    //   resolve(true);
    // });
    this.loadDataProducts();
    this.dataSelectors();
  }

  // public loadScript() {
  //   var dynamicScripts = ["assets/functions.js"];
  //   for (let i = 0; i < dynamicScripts.length; i++) {
  //     let node = document.createElement('script');
  //     node.src = dynamicScripts[i];
  //     node.type = 'text/javascript';
  //     node.async = false;
  //     node.charset = 'utf-8';
  //     node.id = 'functions';
  //     document.getElementsByTagName('head')[0].appendChild(node);
  //   }
  // };


  ngOnInit() {
    this._contentHeaderService.setTitleHeader('Articulos');
  }

  public loadDataProducts(termino?: string) {

    // Articulos -- termino es un parametro opcional para realizar busquedas
    if (termino) {

    } else {
      this._articuloService.getArticulos().then(data => {
        this.dtItems = [];
        for (let key$ in data) {
          this.dtItems.push(data[key$]);
        }
      });
    }
  }

  public dataSelectors() {
    // Paquetes
    this._articuloService.getPaquete().then(data => {
      for (let key$ in data) {
        this.paquetes.push(data[key$]);
      }
    });

    // Clasificacion
    this._articuloService.getClasificacion().then(data => {
      for (let key$ in data) {
        this.clasificacion.push(data[key$]);
      }
    });
  }

  formatDate(date: any) {
    var d = new Date(date),
      month = (d.getMonth() + 1),
      day = d.getDate(),
      year = d.getFullYear();
    return [year, month, day];
  }

  newItem() {
    this.titleModal = "Nuevo articulo";
    this.model = {};
    this.item = {
      id: 0,
      codigo: "",
      nombre: "",
      stock: 0,
      descripcion: "",
      imagen: "",
      vencimiento: null,
      idPaquete: "",
      idClasificacion: ""
    };
  }

  editItem(art: any) {
    // desbloquear boton guardar si es necesario
    var btnSave = document.getElementById("saveBtn") as any;
    btnSave.disabled = false;
    // titulo del modal
    this.titleModal = "Editar articulo";
    var currentDate = this.formatDate(art.Vencimiento);
    this.model = new NgbDate(currentDate[0], currentDate[1], currentDate[2])
    // seteo de datos
    this.item = {
      id: art.Id,
      codigo: art.Codigo,
      nombre: art.Nombre,
      stock: art.Stock,
      descripcion: art.Descripcion,
      imagen: art.Imagen,
      vencimiento: new Date(currentDate.join('/')),
      idPaquete: art.IdPaquete,
      idClasificacion: art.IdClasificacion
    };
  }

  deleteItem(art: any) {
    Swal.fire({
      title: `Desea eliminar ${art.Nombre}?`,
      text: "Esta accion no puede revertirse!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Eliminar!'
    }).then((result) => {
      if (result.value) {
        this._articuloService.eliminarArticulo(art.Id).subscribe(status => {
          if (status == 'success') {
            Swal.fire(
              'Eliminado!',
              'Registro eliminado de manera exitosa.',
              'success'
            )
            this.loadDataProducts();
          }
        });
      } else {

      }
    })
  }

  processFile(img: any) {
    // debugger;
    const file: File = img.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
      const formData = new FormData();
      const image: File = this.selectedFile.file;
      formData.append('image', image);
      this.item.formData = formData;
      this.formDataFile = formData;
    });

  }

  guardar() {
    // // bloquea el boton guardar durante el proceso de guardado
    var btnSave = document.getElementById("saveBtn") as any;
    btnSave.disabled = true;

    if (this.item.id == 0) {
      /** CREAR */

      let selectedDate = [this.model.year, this.model.month, this.model.day];
      this.item.vencimiento = new Date(selectedDate.join('/'));

      // ejecuta el servicio para guardar la informacion en el servidor
      this._articuloService.nuevoArticulo(this.item).subscribe(data => {
        if (data == 'success') {
          var modal = document.getElementById("closeBtn") as any;
          modal.click();
          this.loadDataProducts();
          this.toastr.success('Guardado con exito!!!', 'GenePharmaApp', { positionClass: 'toast-bottom-right' });
        } else {
          this.toastr.error('Ha ocurrido un error', 'GenePharmaApp');
          console.log(data);
        }
      });
    } else {
      /** EDITAR */
      let selectedDate = [this.model.year, this.model.month, this.model.day];
      this.item.vencimiento = new Date(selectedDate.join('/'));

      this._articuloService.editarArticulo(this.item).subscribe(data => {
        if (data == 'success') {
          var modal = document.getElementById("closeBtn") as any;
          modal.click();
          this.loadDataProducts();
          this.toastr.success('Editado con exito!!!', 'GenePharmaApp', { positionClass: 'toast-bottom-right' });
        } else {
          this.toastr.error('Ha ocurrido un error', 'GenePharmaApp');
          console.log(data);
        }
      });
    }

  }
}
