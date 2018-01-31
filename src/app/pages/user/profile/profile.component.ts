import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/user/auth.service';
import { User } from '../../../model/user.model';
import { NgForm } from '@angular/forms';

import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  TAG = 'ProfileComponent :: ';
  successUpdate: boolean;
  imageToUpload: File;

  user: User;
  authUser: User;
  confirmPassword: string;

  constructor(
    public _authService: AuthService,
    private _userService: UserService
  ) { }

  updateUser(frmUser: NgForm) {
    if (this.user.password !== this.authUser.password ) {
        if (this.confirmPassword !== this.user.password) {
            swal('Contraseña Inválida', 'Las contraseñas no coinciden', 'warning');
            return false;
        }
    }
    if (frmUser.valid) {
        this._userService.update(this.user).subscribe(
          success => {
              console.log(this.TAG, 'updateUser :: updated user: ', success);
              swal('Actualización de Usuario', `${success.name} ${success.surname}`, 'success');
          },
          error => {
            console.error(this.TAG, 'ERROR: ', error);
          }
        );
    }
  }
  onImageToUploadChange(file: File) {
    console.log(this.TAG, 'onImageToUploadChange :: ', event);
    if (file) {
      this.imageToUpload = file;
    }
  }

  changeImage() {
      this._userService.updateImage(this.imageToUpload, this.user._id)
      .then(
        success => {
            console.log(this.TAG, 'updateImage SUCCESS, ', success);
        }
      )
      .catch(
        error => {
          console.error(this.TAG, 'updateImage ERROR, ', error);
        }
      );
  }

  ngOnInit() {
    this.user = this._authService.getAuthUser();
    this.authUser = JSON.parse(JSON.stringify(this.user));
  }

}
