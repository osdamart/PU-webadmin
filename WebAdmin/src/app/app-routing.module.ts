import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsuarioComponent} from './componentes/usuario/usuario.component';
import {ProductosComponent} from './componentes/productos/productos.component';
import { UsuariomodalsComponent } from './modals/usuariomodals/usuariomodals.component';
import { EditarProductoComponent } from './componentes/productos/editar-producto/editar-producto.component';
import { CombosComponent } from './componentes/combos/combos.component';
import { EditarCombosComponent } from './componentes/combos/editar-combos/editar-combos.component';
import { SidenavComponent } from './componentes/sidenav/sidenav.component';
import { LoginComponent } from './componentes/login/login.component';

const routes: Routes = [
  {path: 'sidenav',component:SidenavComponent,
  children:[
    {path: 'usuarios', component: UsuarioComponent},
    {path: 'productos', component: ProductosComponent},
    {path: 'crear-usuario', component: UsuariomodalsComponent},
    {path: 'editar-usuario/:id', component: UsuariomodalsComponent},
    {path: 'crear-producto', component: EditarProductoComponent},
    {path: 'editar-producto/:id', component: EditarProductoComponent},
    {path: 'combos', component: CombosComponent},
    {path: 'crear-combo', component: EditarCombosComponent},
    {path: 'editar-combo/:id', component: EditarCombosComponent},
  ]},
  {path: '', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
