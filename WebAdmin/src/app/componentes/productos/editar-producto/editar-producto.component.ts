import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../../services/producto.service';
import {Router, ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  producto: any= {
      nombre: '',
      descripcion: '',
      precio: 0,
      imagen: '',
      visible: 0,
      puntos: 0,
      idtipoproducto: 0
  };
  
  edit: boolean = false;

  constructor(private productoService:ProductoService, private activatedRoute: ActivatedRoute, private router: Router, private location: Location ) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
      if(params.id) {
        this.productoService.getProductoById(params.id).subscribe(
          res => {
            console.log(res);
            this.producto = res;
            this.edit = true;
          },
          err => console.error(err)
        )
      }
  }

  onImageChanged(event: any){
      this.producto.imagen = event.target.files[0]
      console.log(event);
  }

  guardarProducto(){
    const uploadData:any = new FormData();
    uploadData.append('nombre', this.producto.nombre);
    uploadData.append('descripcion', this.producto.descripcion);
    uploadData.append('precio', this.producto.precio);
    uploadData.append('imagen', this.producto.imagen, this.producto.imagen.name);
    uploadData.append('visible', this.producto.visible);
    uploadData.append('idtipoproducto', this.producto.idtipoproducto);

    this.productoService.saveProducto(uploadData).subscribe(
      res => {
        console.log(res);
      },
      err => console.error(err)
    )
  }

  actualizarProducto(){
    this.productoService.updateProducto(this.producto.idproducto,this.producto).subscribe(
      res => {
        alert("El producto ha sido agregado de forma correcta");
        this.router.navigate(['productos']);
      },
      err => console.error(err)
    )
  }

  goBack() {
    // window.history.back();
    this.location.back();

    console.log( 'goBack()...' );
  }

  
}
