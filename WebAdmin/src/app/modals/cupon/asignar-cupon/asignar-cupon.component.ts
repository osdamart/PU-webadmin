import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from 'src/app/services/producto.service';
import { CuponProductoService } from 'src/app/services/cupon-producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/modelos/productos';
import { Cupon } from 'src/app/modelos/cupones';
import { cuponProducto } from 'src/app/modelos/cupon-producto';


@Component({
  selector: 'app-asignar-cupon',
  templateUrl: './asignar-cupon.component.html',
  styleUrls: ['./asignar-cupon.component.css']
})
export class AsignarCuponComponent implements OnInit {

  //inicializo lista para los nombres de los productos
  asignables: Producto[]=[];
  idcupon = this.data.idcupon;
  asignados: Producto[]=[];
  //idproducto: number;
  matches: cuponProducto[]=[]; 

  form: FormGroup = this.fb.group({
    idproducto:[0],
  })

  constructor(private productoService:ProductoService,
    private cuponProductoService:CuponProductoService,
    public dialogRef:MatDialogRef<AsignarCuponComponent>,
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
    this.cuponProductoService.getData().subscribe(data =>{
      for (const [key, value] of Object.entries(data)) {
        if (value.idcupon === this.idcupon ){
          this.matches.push(value);
        } 
      }console.log(this.matches);
    });
  }

  guardarCuponMatch(){

    const uploadData:any = new FormData();
    uploadData.append('idcupon',this.idcupon);
    uploadData.append('idproducto',this.form.value.idproducto);
    console.log(this.idcupon);
    console.log(this.form.value.idproducto);
    console.log(uploadData);

    this.cuponProductoService.saveCuponProducto(uploadData).subscribe(
      res => {
        console.log(res);
        this.closeDialog();
        this.toastr.success("Se ha aplicado el cupón al producto seleccionado")
      }
    )
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
