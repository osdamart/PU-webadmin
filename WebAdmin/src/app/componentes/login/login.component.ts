import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  datainfo: any = {    
    email: '',
    password: ''
  };
  constructor(private router:Router, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
  }

  onLogin(){
    this.usuarioService.loginUsuario(this.datainfo).subscribe(      
      res => {
        console.log(res);
        this.router.navigate(['/sidenav']);
      },
      err => console.error(err)
    )
  }

}
