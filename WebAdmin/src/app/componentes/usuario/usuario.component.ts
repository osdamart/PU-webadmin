import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {UsuarioService} from '../../services/usuario.service';
import {MatSort} from '@angular/material/sort';
import {Usuario} from '../../modelos/usuarios';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog';
import { UsuariomodalsComponent } from '../../modals/usuariomodals/usuariomodals.component';
import { EditarUsuarioComponent } from 'src/app/modals/usuario/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from 'src/app/modals/usuario/eliminar-usuario/eliminar-usuario.component';
import { CrearUsuarioComponent } from 'src/app/modals/usuario/crear-usuario/crear-usuario.component';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {


  usuarios: any = [];
  ELEMENT_DATA: Usuario[]=[];
  columnsToDisplay: string[] = ['rol','name','ide_card','email','cell_phone','fechanac','opciones'];
  dataSource = new MatTableDataSource<Usuario>(this.ELEMENT_DATA);
  contador: number;
  listaAdmins: Usuario[]=[];

  constructor(private usuarioService:UsuarioService,
    private dialog: MatDialog, ) { }

  @ViewChild(MatSort) sort: MatSort;



  ngOnInit() {
    this.obtenerUsuarios();
    
  }

  obtenerUsuarios(){
    this.usuarioService.getData().subscribe(
      data => {
        console.log(data)
        for (const [key,value] of Object.entries(data)) {
          console.log(key)
          console.log(value)
          if ( value.idrolusuario === 2){
            this.listaAdmins.push(value);
          }
        }console.log(this.listaAdmins)
        this.dataSource.data=this.listaAdmins  as Usuario[];
        this.dataSource.sort = this.sort;
        this.contador = this.dataSource.data.length;
    });
  }

  eliminarUsuario(id: string){
    this.usuarioService.deleteUsuario(id).subscribe(
      res => {
        console.log(res);
        this.obtenerUsuarios()
      },
      err => console.error(err)
    )
  }

  blockUser(id:string, usuario:any){
    usuario.status=0;
    this.usuarioService.updateUsuario(id,usuario).subscribe(
      res => {      
        console.log(res);
        this.refresh();
      },
      err => console.error(err)
    )
  }

  unblockUser(id:string, usuario:any){
    usuario.status=1;
    this.usuarioService.updateUsuario(id,usuario).subscribe(
      res => {      
        console.log(res);
        this.refresh();
      },
      err => console.error(err)
    )
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  createDialog(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.dialog.open(CrearUsuarioComponent,dialogConfig)
    .afterClosed().subscribe(result=>{
      this.refresh();
    });
  }

  editDialog(id: number, ide_card: string, cell_phone: number, name:string, lastname:string, email:string, fechanac: Date, status:number, idrolusuario: number, password:string ){
    
    this.dialog.open(EditarUsuarioComponent,{
      data: {id:id, ide_card:ide_card, cell_phone:cell_phone, name:name, lastname:lastname, email:email, fechanac:fechanac, status:status, idrolusuario:idrolusuario, password:password}
    }).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }

  deleteDialog(id:number, name:string){
    this.dialog.open(EliminarUsuarioComponent,{
      data: {id:id, name:name}
    }).afterClosed().subscribe(result=>{
      this.refresh();
    });
  }

  refresh(): void {
    this.listaAdmins=[];
    if(this.listaAdmins===null){
      this.obtenerUsuarios();
    }
  }

}