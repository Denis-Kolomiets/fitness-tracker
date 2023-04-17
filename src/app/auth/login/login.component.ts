import { Component, OnInit } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {}

  loginGroupForm = new FormGroup({
    login: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required])
  })

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login({
      email: this.loginGroupForm.value.login as string,
      password: this.loginGroupForm.value.password as string
    })
  }
}
