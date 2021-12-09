import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UsuarioService } from './services/usuario.service';
import { ProductoService } from './services/producto.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { ProductosComponent } from './componentes/productos/productos.component';
import { UsuariomodalsComponent } from './modals/usuariomodals/usuariomodals.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EditarProductoComponent } from './componentes/productos/editar-producto/editar-producto.component';
import { CombosComponent } from './componentes/combos/combos.component';
import { EditarCombosComponent } from './componentes/combos/editar-combos/editar-combos.component';
import { MatTreeModule } from '@angular/material/tree';
import { SidenavComponent } from './componentes/sidenav/sidenav.component';
import { LoginComponent } from './componentes/login/login.component';
import { MatTableDataSource } from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import { CrearUsuarioComponent } from './modals/usuario/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './modals/usuario/editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './modals/usuario/eliminar-usuario/eliminar-usuario.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    UsuarioComponent,
    ProductosComponent,
    UsuariomodalsComponent,
    EditarProductoComponent,
    CombosComponent,
    EditarCombosComponent,
    SidenavComponent,
    LoginComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    EliminarUsuarioComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatListModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatDialogModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'increasing',
      preventDuplicates: true,
    }),

  ],
  providers: [UsuarioService, ProductoService],
  bootstrap: [AppComponent],

})
export class AppModule { }
