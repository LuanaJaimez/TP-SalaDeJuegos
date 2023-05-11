import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formReg: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) {
    this.formReg = new FormGroup({
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

  showErrorUserExist()
  {
    this.toaster.error('Error, ya existe un usuario con esas credenciales');
  }

  ngOnInit(): void {
    this.formReg = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.userService.register(this.formReg.value)
      .then(response => {
        console.log(response);
        this.showSuccess();
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.log(error);
        if (error = 'auth/email-already-in-use'){
          this.showErrorUserExist()
        }
        else{
          this.showError();
        }
      });
  }

}