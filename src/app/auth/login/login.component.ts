import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginGroupForm = new FormGroup({
    login: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  })
  ngOnInit() {
  }

  onSubmit() {
    console.log(this.loginGroupForm)  
  }
}
