import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/Auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      confirmpassword: new FormControl('', Validators.required)
    }, this.passwordMatchValidation);
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('Register succeed');
    }, error => {
      this.alertify.error(error);
    });
  }

  passwordMatchValidation(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('confirmpassword').value ? null : {'mismatch': true};
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
