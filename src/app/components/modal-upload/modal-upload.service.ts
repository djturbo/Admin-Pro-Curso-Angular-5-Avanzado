import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class ModalUploadService {
  TAG = 'ModalUploadService :: ';

  public collection: string;
  public id: string;
  public oculto: string = 'oculto';
  public notificationEmitter = new EventEmitter<any>();

  constructor() {
    console.log(this.TAG, 'CONSTRUCTOR');
   }

   showModal(type: string, id: string) {
     this.id = id;
     this.collection = type;
      this.oculto = '';
   }

   hideModal() {
      this.oculto = 'oculto';
      this.id = '';
      this.collection = '';
   }

}
