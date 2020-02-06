import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/Auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService, trLocale, defineLocale } from 'ngx-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  locale = 'tr';

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private formBuilder: FormBuilder,
    private localService: BsLocaleService
  ) {
    defineLocale('tr', trLocale);
    this.localService.use('tr');
  }

  ngOnInit() {
    this.bsConfig = {
      containerClass: 'theme-default',
      isAnimated: true,
      dateInputFormat: 'DD-MM-YYYY',
    };
    this.createRegisterForm();
  }


  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmpassword: ['', Validators.required],
        dateOfBirth: [null, Validators.required],
        gender: ['male'],
        city: ['', Validators.required]
      },
      { validator: this.passwordMatchValidation }
    );
  }

  register() {
    this.authService.register(this.model).subscribe(
      () => {
        this.alertify.success('Register succeed');
      },
      error => {
        this.alertify.error(error);
      }
    );
  }

  passwordMatchValidation(formGroup: FormGroup) {
    return formGroup.get('password').value ===
      formGroup.get('confirmpassword').value
      ? null
      : { mismatch: true };
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
