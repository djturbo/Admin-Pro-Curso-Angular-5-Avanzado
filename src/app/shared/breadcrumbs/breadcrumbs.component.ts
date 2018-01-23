import { Component, OnInit } from '@angular/core';
import { Router, ActivationStart, ActivationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  TAG = 'BreadcrumbsComponent :: ';
  label = '';

  constructor(
    private _router: Router,
    private _title: Title,
    private _meta: Meta
  ) {
    this.getDataRoute()
    .subscribe(
      data => {
        console.log(this.TAG, 'router event: ', data);
        this.label = data.title;
        this._title.setTitle(data.title);
        const metaTag: MetaDefinition = {
          name: 'description', 
          content: this.label
        };
        this._meta.updateTag(metaTag);
      }
    );
  }
  getDataRoute(): Observable<any> {
    return this._router.events
    .filter( event => event instanceof ActivationEnd )
    .filter( (event: ActivationEnd) => event.snapshot.firstChild === null)
    .map((event: ActivationEnd) => event.snapshot.data);
  }

  ngOnInit() {
  }

}
