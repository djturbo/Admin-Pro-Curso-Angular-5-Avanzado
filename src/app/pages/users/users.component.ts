import { Component, OnInit} from '@angular/core';
import { User } from '../../model/user.model';
import { UserService } from '../../services/index';

import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: []
})
export class UsersComponent implements OnInit {
  TAG = 'UsersComponent :: ';

  loading: boolean = false;
  users: User[] = [];
  from: string = '0';
  size: string = '5';
  pageInfo: any = {
    total: 0,
    from: 0,
    size: 5
  };
  constructor(
    private _userService: UserService,
    public _modalUploadService: ModalUploadService
  ) {

  }


  changePage(newFrom: number) {
    newFrom = this.pageInfo.from + newFrom;
    if (newFrom < 0 || newFrom >= this.pageInfo.total) {
      return;
    }
    this.loadUsers(newFrom);
  }

  loadUsers(from: number) {
    this.loading = true;
    this.users = [];

    this._userService.findAll(from + '', this.size).subscribe(
      success => {
          console.log(this.TAG, '_userService.findAll success: ', success);
          this.users = success.users;
          this.pageInfo.total = success.count;
          this.pageInfo.from = from;
          this.loading = false;
        },
        error => {
          console.error(this.TAG, '_userService.findAll error: ', error);
          this.loading = false;
      }
    );
  }

  searchUser(toSearch: string) {
    console.log(this.TAG, 'searchUser :: word to search: ', toSearch);
    if (toSearch.length > 3) {
      this.loading = true;
        this._userService.searchForUser(toSearch).subscribe(
          success => {
            console.log(this.TAG, 'searchUser result: ', success);
            this.users = success;
            this.loading = false;
          },
          error => {
            console.log(this.TAG, 'searchUser error: ', error);
            this.loading = false;
          }
        );
    } else {
      this.loadUsers(0);
    }
  }
  removeUser(user: User) {
    if ( user._id === this._userService.getAuthUser()._id) {
      swal('Advertencia', 'No se puede eliminar al usuario que está autenticado', 'warning');
      return;
    }

    swal({
      title: '¿Estás segur@?',
      text: 'No se podrán recuperar al usuario eliminado!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'No, dejalo'
    }).then((result) => {
      if (result.value) {
        this._userService.remove(user._id).subscribe(
          success => {
            swal('Info', 'Usuario eliminado correctamente', 'success');
            this.loadUsers(this.pageInfo.from);
          }, error => {
            swal('Error', 'Error al borrar al usuario', 'error');
          }
        );
      // result.dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
      } else if (result.dismiss === 'cancel') {
        swal(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        );
      }
    });
  }

  saveUser(user: User) {
    this._userService.update(user).subscribe(
      success => {
        console.log(this.TAG, 'saveUser the user was saved successfully: user: ', success);
        swal('Información', 'Usuario guardado correctamente', 'success');
      },
      error => {
        console.log(this.TAG, 'saveUser error: ', error);
        swal('Error', 'Error al guardar el usuario', 'error');
      }
    );
  }

  changeImage(user: User) {
    this._modalUploadService.showModal('user', user._id);

  }

  ngOnInit() {
    this.loadUsers(0);
    /** Cuando se cambie la imagen de un usuario se repintan los registros */
    this._modalUploadService.notificationEmitter
    .subscribe(
      success => {
        this.loadUsers(this.pageInfo.from);
      }
    );
  }

}
