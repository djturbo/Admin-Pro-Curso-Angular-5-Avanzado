import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../services/index';
import { User } from '../../model/user.model';
import { Hospital } from '../../model/hospital.model';
import { Medico } from '../../model/medico.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: []
})
export class SearchComponent implements OnInit {

  TAG = 'SearchComponent :: ';

  users: User[] = [];
  hospitals: Hospital[] = [];
  medicos: Medico[] = [];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _searchService: SearchService
  ) {
    const toSearch = _activatedRoute.snapshot.params.toSearch;
    this.searchInAll(toSearch);
   }

    searchInAll(toSearch: string) {
      if (toSearch) {
        this._searchService.searchInAll(toSearch).subscribe(
          success => {
              console.log(this.TAG, 'FIND: ', success);
              this.users = success.users;
              this.hospitals = success.hospitales;
              this.medicos = success.medicos;
          }, error => {
            console.log(this.TAG, 'Error de búsqueda ', error);
          }
        );
      }
    }

  ngOnInit() {
  }

}
