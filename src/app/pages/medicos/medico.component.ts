import { Component, OnInit } from '@angular/core';
import { MedicoService, HospitalService } from '../../services/index';
import { Hospital } from '../../model/hospital.model';
import { Medico } from '../../model/medico.model';
import { ActivatedRoute, Route } from '@angular/router';

import swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  TAG = 'MedicoComponent :: ';

  selectedHospital: Hospital = new Hospital('');
  action: string;
  title = '';
  tempImage: any;
  imageToUpload: File;

  hospitals: Hospital[] = [];
  loading: boolean = false;
  medico: Medico = {
    name: '',
    image: '',
    hospital: ''
  };

  constructor(
    private _hospitalService: HospitalService,
    private _medicoService: MedicoService,
    private _activatedRoute: ActivatedRoute
  ) { }

  loadHospitals() {
    this.loading = true;
    this.hospitals = [];

    this._hospitalService.findAll(0 + '', 100 + '').subscribe(
      success => {
          console.log(this.TAG, 'loadHospitals success: ', success);
          this.hospitals = success.hospitales;

          this.loading = false;
        },
        error => {
          console.error(this.TAG, 'loadHospitals error: ', error);
          this.loading = false;
      }
    );
  }
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
      this._medicoService.updateImage(this.imageToUpload, this.medico._id)
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
  saveDoctor() {
      if (this.action === 'nuevo') {
        this._medicoService.create(this.medico).subscribe(
          success => {
              this.medico = success.medico;
              swal('Success Create', 'Medico creado satisfactoriamente', 'success');
          }, error => {
              swal('Error', 'Error al crear el medico', 'error');
          }
        );
    } else {
      this._medicoService.update(this.medico).subscribe(
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
  }
  onChangeHospitalValue(event) {
    console.log(this.TAG, 'onChangeHospitalValue event: ', event.target.value);
    if (event.target.value) {
      this.selectedHospital = this.hospitals.map(item => item._id = event.target.value)[0];
    } else {
      this.selectedHospital.image = '';
    }
  }
  ngOnInit() {
    this.loadHospitals();
    const id = this._activatedRoute.snapshot.params['id'];
    if (id === 'nuevo') {
      this.action = 'nuevo';
      this.title = 'Crear Médico';
      this.medico = {
        name: '',
        hospital: '',
        image: ''
      };
    } else {
      this.action = 'edit';
      this.title = 'Acturalizar Médico';
        this._medicoService.findById(id).subscribe(
          success => {
            console.log(this.TAG, 'ngOnInit load medico: ', success);
            this.medico.name = success.medico.name;
            this.medico.hospital = success.medico.hospital._id;
            this.medico.image = success.medico.image;
            this.selectedHospital.image = this.medico.hospital['image'];
          },
          error => {
            console.log(this.TAG, 'ngOnInit load medico ERROR: ', error);
          }
        );
    }
  }

}
