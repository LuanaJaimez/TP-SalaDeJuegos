import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  showSuccess()
  {
    this.toaster.success('Exito!');
  }

  showError()
  {
    this.toaster.error('Error');
  }

  ngOnInit(): void {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.userService.login(this.formLogin.value)
      .then(response => {
        console.log(response);
        this.showSuccess();
        //localStorage.setItem('user', JSON.stringify(this.formLogin + Date()));
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.log(error);
        this.showError();
      });
  }

  onClick() {
    this.userService.loginWithGoogle()
      .then(response => {
        console.log(response);
        this.showSuccess();
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.log(error);
        this.showError();
      });
  }

  fillForm() : void {
    this.formLogin = this.fb.group({
      email: ['email@test.com'],
      password: ['123456789'],
    });
  }
}