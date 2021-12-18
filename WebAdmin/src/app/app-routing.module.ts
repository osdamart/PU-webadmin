import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsuarioComponent} from './componentes/usuario/usuario.component';
import {ProductosComponent} from './componentes/productos/productos.component';
import { UsuariomodalsComponent } from './modals/usuariomodals/usuariomodals.component';
import { CombosComponent } from './componentes/combos/combos.component';
import { EditarCombosComponent } from './componentes/combos/editar-combos/editar-combos.component';
import { SidenavComponent } from './componentes/sidenav/sidenav.component';
import { LoginComponent } from './componentes/login/login.component';
import { AdminsComponent } from './componentes/admins/admins.component';
import { PrincipalesComponent } from './componentes/principales/principales.component';
import { AdicionalesComponent } from './componentes/adicionales/adicionales.component';
import { BebidasComponent } from './componentes/bebidas/bebidas.component';
import { OfertasComponent } from './componentes/ofertas/ofertas.component';
import { CuponesComponent } from './componentes/cupones/cupones.component';

const routes: Routes = [
  {path: 'sidenav',component:SidenavComponent,
  children:[
    {path: 'usuarios', component: UsuarioComponent},
    {path: 'administradores', component: AdminsComponent},
    {path: 'productos', component: ProductosComponent},
    {path: 'principales', component: PrincipalesComponent},
    {path: 'adicionales', component: AdicionalesComponent},
    {path: 'bebidas', component: BebidasComponent},
    {path: 'combos', component: CombosComponent},
    {path: 'ofertas', component: OfertasComponent},
    {path: 'cupones', component: CuponesComponent},
    {path: 'crear-usuario', component: UsuariomodalsComponent},
    {path: 'editar-usuario/:id', component: UsuariomodalsComponent},
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
