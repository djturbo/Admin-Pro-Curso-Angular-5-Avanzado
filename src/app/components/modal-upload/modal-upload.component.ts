import { Component, OnInit } from '@angular/core';
import { UserService, AuthService } from '../../services';

import swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  TAG = 'ModalUploadComponent :: ';

  imageToUpload: File;

  confirmPassword: string;
  tempImage: string;

  constructor(
    public _authService: AuthService,
    private _fileUploadService: FileUploadService,
    public _modalUploadService: ModalUploadService
  ) { }
  onImageToUploadChange(file: File) {
    console.log(this.TAG, 'onImageToUploadChange :: ', event);

    if ( file.type.indexOf('image') < 0 ) {
      swal('Solo imágenes', 'El archivo seleccionado no es una imagen', 'warning');
      return;
    }
    this.imageToUpload = file;


    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.tempImage = reader.result;
    };

  }

  changeImage() {
    this._fileUploadService.upload(this.imageToUpload, this._modalUploadService.collection, this._modalUploadService.id)
    .then(
      success => {
        this.closeModal();
        this._modalUploadService.notificationEmitter.emit(success);
        swal('Info Success', 'Fichero subido correctamente.', 'success');
      }
    ).catch(
      error => {
        console.log(this.TAG, 'ERROR DE CARGA DE ARVHICO: ERROR: ', error);
        swal('Información de Error', 'Error al subir la imagen', 'error');
      }
    );
  }

  closeModal() {
    this.tempImage = null;
    this.imageToUpload = null;
    this._modalUploadService.hideModal();
  }

  ngOnInit() {
    console.log(this.TAG, 'onInit');
  }

}
