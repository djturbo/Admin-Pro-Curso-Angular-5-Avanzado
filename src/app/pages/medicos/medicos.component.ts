import { Component, OnInit} from '@angular/core';
import { MedicoService } from '../../services/index';

import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Medico } from '../../model/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  TAG = 'MedicosComponent :: ';

  loading: boolean = false;
  medicos: Medico[] = [];
  medico: Medico = {
    image: null,
    name: ''
  };
  from: string = '0';
  size: string = '5';
  pageInfo: any = {
    total: 0,
    from: 0,
    size: 5
  };
  constructor(
    private _medicoService: MedicoService,
    public _modalUploadService: ModalUploadService
  ) {

  }


  changePage(newFrom: number) {
    newFrom = this.pageInfo.from + newFrom;
    if (newFrom < 0 || newFrom >= this.pageInfo.total) {
      return;
    }
    this.loadMedicos(newFrom);
  }

  loadMedicos(from: number) {
    this.loading = true;
    this.medicos = [];

    this._medicoService.findAll(from + '', this.size).subscribe(
      success => {
          console.log(this.TAG, 'loadMedicos success: ', success);
          this.medicos = success.medicos;
          this.pageInfo.total = success.count;
          this.pageInfo.from = from;
          this.loading = false;
        },
        error => {
          console.error(this.TAG, 'loadMedicos error: ', error);
          this.loading = false;
      }
    );
  }

  searchMedico(toSearch: string) {
    console.log(this.TAG, 'searchHospital :: word to search: ', toSearch);
    if (toSearch.length > 3) {
      this.loading = true;
        this._medicoService.searchForMedico(toSearch).subscribe(
          success => {
            console.log(this.TAG, 'searchHospital result: ', success);
            this.medicos = success;
            this.loading = false;
          },
          error => {
            console.log(this.TAG, 'searchHospital error: ', error);
            this.loading = false;
          }
        );
    } else {
      this.loadMedicos(0);
    }
  }
  removeMedico(medico: Medico) {
    swal({
      title: '¿Estás segur@?',
      text: 'No se podrán recuperar al medico eliminado!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'No, dejalo'
    }).then((result) => {
      if (result.value) {
        this._medicoService.remove(medico._id).subscribe(
          success => {
            swal('Info', 'Medico eliminado correctamente', 'success');
            this.loadMedicos(this.pageInfo.from);
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

  saveMedico(medico: Medico) {
    this._medicoService.update(medico).subscribe(
      success => {
        console.log(this.TAG, 'saveMedico the medico was saved successfully: medico: ', success);
        swal('Información', 'Medico guardado correctamente', 'success');
      },
      error => {
        console.log(this.TAG, 'saveMedico error: ', error);
        swal('Error', 'Error al guardar el medico', 'error');
      }
    );
  }
  async createMedico() {
    const {value: name} = await swal({
      title: 'Nombre del medico',
      input: 'text',
      inputPlaceholder: 'Insertar nombre del medico',
      showCancelButton: true,
      inputValidator: (value) => {
        return !value && 'Tienes que insertar el nombre del medico!'
      }
    });

    if (name) {
      this.medico.name = name;
      this._medicoService.create(this.medico).subscribe(
        success => {
            swal('Success Create', 'Medico creado satisfactoriamente', 'success');
            this.loadMedicos(this.pageInfo.from);
        }, error => {
            swal('Error', 'Error al crear el medico', 'error');
        }
      );
    }

  }
  changeImage(medico: Medico) {
    this._modalUploadService.showModal('medico', medico._id);

  }

  ngOnInit() {
    this.loadMedicos(0);
    /** Cuando se cambie la imagen de un medico se repintan los registros */
    this._modalUploadService.notificationEmitter
    .subscribe(
      success => {
        this.loadMedicos(this.pageInfo.from);
      }
    );
  }

}
