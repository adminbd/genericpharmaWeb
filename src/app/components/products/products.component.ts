import { Component, OnInit } from '@angular/core';
import { ContentHeaderService } from '../../servicios/content-header.service';
import { ArticulosService } from '../../servicios/articulos.service';
import { Articulo } from 'src/app/interfaces/articulo.interface';

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
    id: null,
    codigo: "",
    nombre: "",
    stock: null,
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
  loadAPI: Promise<any>;

  constructor(private _contentHeaderService: ContentHeaderService,
    private _articuloService: ArticulosService) {

    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve(true);
    });
    this.loadDataProducts();
    this.dataSelectors();
  }


  public loadDataProducts(termino?: string) {

    // Articulos -- termino es un parametro opcional para realizar busquedas
    if (termino) {

    } else {
      this._articuloService.getArticulos().subscribe(data => {
        this.dtItems = [];
        for (let key$ in data) {
          this.dtItems.push(data[key$]);
        }
      });
    }
  }

  public dataSelectors() {
    // Paquetes
    this._articuloService.getPaquete().subscribe(data => {
      for (let key$ in data) {
        this.paquetes.push(data[key$]);
      }
    });

    // Clasificacion
    this._articuloService.getClasificacion().subscribe(data => {
      for (let key$ in data) {
        this.clasificacion.push(data[key$]);
      }
    });
  }

  public loadScript() {
    var dynamicScripts = ["assets/functions.js"];
    for (let i = 0; i < dynamicScripts.length; i++) {
      let node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      node.id = 'functions';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  };


  ngOnInit() {
    this._contentHeaderService.setTitleHeader('Articulos');
  }

  nuevoProducto() {
    this.titleModal = "Nuevo articulo";
    this.item = {
      id: null,
      codigo: "",
      nombre: "",
      stock: null,
      descripcion: "",
      imagen: "",
      vencimiento: null,
      idPaquete: "",
      idClasificacion: ""
    };
  }

  showMsg(us: any) {
    this.titleModal = "Editar articulo";
    console.log(us);
  }

  guardar() {
    // bloquea el boton guardar durante el proceso de guardado
    var btnSave = document.getElementById("saveBtn") as any;
    btnSave.disabled = true;

    // ejecuta el servicio para guardar la informacion en el servidor
    this._articuloService.nuevoArticulo(this.item).subscribe(data => {
      if (data == "success") {
        var modal = document.getElementById("closeBtn") as any;
        modal.click();
        this.loadDataProducts();
      }
    });
  }
}
