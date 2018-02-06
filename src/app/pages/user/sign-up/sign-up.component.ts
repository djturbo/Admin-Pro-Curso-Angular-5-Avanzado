import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Routes, Router } from '@angular/router';

import swal from 'sweetalert2';
import { UserService } from '../../../services';
import { User } from '../../../model/user.model';

declare function initPlugins();
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [
    './sign-up.component.css'
  ]
})
export class SignUpComponent implements OnInit {
  TAG = 'SignUpComponent :: ';

  frmGroup: FormGroup;

  constructor(
    private _userService: UserService,
    private _router: Router
  ) { }

  signUp() {
    console.log(this.TAG, 'frmGroup: ', this.frmGroup);
    if (this.frmGroup.invalid) {
      return false;
    }
    if (this.frmGroup.controls['conditions'].value === false) {
      console.log(this.TAG, 'debe aceptar las condiciones.');
      swal('Error!', 'debe aceptar las condiciones!', 'error');
      return false;
    }
    const user = new User(
      this.frmGroup.controls['name'].value,
      this.frmGroup.controls['email'].value,
      this.frmGroup.controls['password'].value,
      this.frmGroup.controls['surname'].value
    );
    this._userService.create(user).subscribe(
      success => {
        console.log(this.TAG, 'Create User: ', success);
        this._router.navigate(['/user/sign-in']);
      },
      err => {
        console.error(this.TAG, 'Error al crear usuario: Error: ', err);
        swal('Error Alta Usuario', err.error.error.message, 'error');
      }
    );
  }

  compareValues(val1: string, val2: string) {
    return (formGroup: FormGroup) => {
      const field1 = formGroup.controls[val1].value;
      const field2 = formGroup.controls[val2].value;
      if (field1 === field2) {
        return null;
      }
      return {
          same_values: true
      };
    };
  }

  ngOnInit() {
    initPlugins();
    this.frmGroup = new FormGroup({
      name:             new FormControl(null, Validators.required),
      surname:          new FormControl(null, Validators.required),
      email:            new FormControl(null, [Validators.email, Validators.required]),
      password:         new FormControl(null, Validators.required),
      confirmPassword:  new FormControl(null, Validators.required),
      conditions:       new FormControl(false)

    }, { validators: this.compareValues('password', 'confirmPassword') });

    // Se pueden poner valores por defecto
    this.frmGroup.setValue({
      name:            'test4',
      surname:         'test4 test4',
      email:           'test4@test.com',
      password:        '123456',
      confirmPassword: '123456',
      conditions:      true
    });
  }

}
