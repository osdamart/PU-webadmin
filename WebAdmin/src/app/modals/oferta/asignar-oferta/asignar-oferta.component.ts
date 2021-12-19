import { Component, OnInit, Inject, AfterViewInit, AfterViewChecked, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from 'src/app/services/producto.service';
import { OfertaProductoService } from 'src/app/services/oferta-producto';
import { OfertaService } from 'src/app/services/oferta.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/modelos/productos';
import { Oferta } from 'src/app/modelos/ofertas';
import { ofertaProducto } from 'src/app/modelos/oferta-producto';


@Component({
  selector: 'app-asignar-oferta',
  templateUrl: './asignar-oferta.component.html',
  styleUrls: ['./asignar-oferta.component.css']
})
export class AsignarOfertaComponent implements OnInit{

  //inicializo lista para los nombres de los productos
  asignables: Producto[]=[];
  idoferta = this.data.idoferta;
  asignados: Producto[]=[];
  //idproducto: number;
  matches: ofertaProducto[]=[]; 

  form: FormGroup = this.fb.group({
    idproducto:[0],
  })

  constructor(private productoService:ProductoService,
    private ofertaProductoService:OfertaProductoService,
    public dialogRef:MatDialogRef<AsignarOfertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder, private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.obtenerAsignados();
    //this.obtenerAsignados();
    setTimeout(()=>{
      
      for (let ele of this.asignables){
        for(let ili of this.matches){
          if (ele.idproducto==ili.idproducto){
            this.asignados.push(ele);
          }
        }
      }console.log(this.asignados);

      },1000)
  } 



  obtenerProductos(){
    this.productoService.getData().subscribe(data =>{
      for (const [key, value] of Object.entries(data)) {
        if (value.idtipoproducto === 1 || value.idtipoproducto === 4){
          this.asignables.push(value);
        } 
      }
      console.log(this.asignables);
    });
  }

  obtenerAsignados(){

    this.obtenerProductos();
    this.obtenerMatches();
    
  }

  obtenerMatches(){
    this.ofertaProductoService.getData().subscribe(data =>{
      for (const [key, value] of Object.entries(data)) {
        if (value.idoferta === this.idoferta ){
          this.matches.push(value);
        } 
      }console.log(this.matches);
    });
  }

  guardarOfertaMatch(){

    const uploadData:any = new FormData();
    uploadData.append('idoferta',this.idoferta);
    uploadData.append('idproducto',this.form.value.idproducto);
    console.log(this.idoferta);
    console.log(this.form.value.idproducto);
    console.log(uploadData);

    this.ofertaProductoService.saveOfertaProducto(uploadData).subscribe(
      res => {
        console.log(res);
        this.closeDialog();
        this.toastr.success("Se ha aplicado la oferta al producto seleccionado")
      }
    )
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
