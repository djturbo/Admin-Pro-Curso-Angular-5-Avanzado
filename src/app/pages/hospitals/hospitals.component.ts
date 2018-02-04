import { Component, OnInit} from '@angular/core';
import { Hospital } from '../../model/hospital.model';
import { HospitalService } from '../../services/index';

import swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitals',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.css']
})
export class HospitalsComponent implements OnInit {
  TAG = 'HospitalsComponent :: ';

  loading: boolean = false;
  hospitals: Hospital[] = [];
  hospital: Hospital = {
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
    private _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) {

  }


  changePage(newFrom: number) {
    newFrom = this.pageInfo.from + newFrom;
    if (newFrom < 0 || newFrom >= this.pageInfo.total) {
      return;
    }
    this.loadHospitals(newFrom);
  }

  loadHospitals(from: number) {
    this.loading = true;
    this.hospitals = [];

    this._hospitalService.findAll(from + '', this.size).subscribe(
      success => {
          console.log(this.TAG, 'loadHospitals success: ', success);
          this.hospitals = success.hospitales;
          this.pageInfo.total = success.count;
          this.pageInfo.from = from;
          this.loading = false;
        },
        error => {
          console.error(this.TAG, 'loadHospitals error: ', error);
          this.loading = false;
      }
    );
  }

  searchHospital(toSearch: string) {
    console.log(this.TAG, 'searchHospital :: word to search: ', toSearch);
    if (toSearch.length > 3) {
      this.loading = true;
        this._hospitalService.searchForHospital(toSearch).subscribe(
          success => {
            console.log(this.TAG, 'searchHospital result: ', success);
            this.hospitals = success;
            this.loading = false;
          },
          error => {
            console.log(this.TAG, 'searchHospital error: ', error);
            this.loading = false;
          }
        );
    } else {
      this.loadHospitals(0);
    }
  }
  removeHospital(hospital: Hospital) {
    swal({
      title: '¿Estás segur@?',
      text: 'No se podrán recuperar al hospital eliminado!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar!',
      cancelButtonText: 'No, dejalo'
    }).then((result) => {
      if (result.value) {
        this._hospitalService.remove(hospital._id).subscribe(
          success => {
            swal('Info', 'Hospital eliminado correctamente', 'success');
            this.loadHospitals(this.pageInfo.from);
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

  saveHospital(hospital: Hospital) {
    this._hospitalService.update(hospital).subscribe(
      success => {
        console.log(this.TAG, 'saveHospital the hospital was saved successfully: hospital: ', success);
        swal('Información', 'Hospital guardado correctamente', 'success');
      },
      error => {
        console.log(this.TAG, 'saveHospital error: ', error);
        swal('Error', 'Error al guardar el hospital', 'error');
      }
    );
  }
  async createHospital() {
    const {value: name} = await swal({
      title: 'Nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Insertar nombre del hospital',
      showCancelButton: true,
      inputValidator: (value) => {
        return !value && 'Tienes que insertar el nombre del hospital!'
      }
    });

    if (name) {
      this.hospital.name = name;
      this._hospitalService.create(this.hospital).subscribe(
        success => {
            swal('Success Create', 'Hospital creado satisfactoriamente', 'success');
            this.loadHospitals(this.pageInfo.from);
        }, error => {
            swal('Error', 'Error al crear el hospital', 'error');
        }
      );
    }

  }
  changeImage(hospital: Hospital) {
    this._modalUploadService.showModal('hospital', hospital._id);

  }

  ngOnInit() {
    this.loadHospitals(0);
    /** Cuando se cambie la imagen de un hospital se repintan los registros */
    this._modalUploadService.notificationEmitter
    .subscribe(
      success => {
        this.loadHospitals(this.pageInfo.from);
      }
    );
  }

}

