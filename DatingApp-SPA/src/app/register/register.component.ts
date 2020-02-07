import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/Auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, Validators, FormBuilder} from '@angular/forms';
import { BsDatepickerConfig, BsLocaleService, trLocale, defineLocale } from 'ngx-bootstrap';
import { User } from '../_modules/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  locale = 'tr';

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private formBuilder: FormBuilder,
    private localService: BsLocaleService,
    private router: Router
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
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success('Kayıt başarılı');
      }, error => {
        this.alertify.error(error);
      }, () => {
        this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }
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
