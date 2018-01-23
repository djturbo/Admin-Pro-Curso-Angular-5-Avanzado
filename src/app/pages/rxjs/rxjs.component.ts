import { Component, OnInit, OnDestroy } from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  TAG = 'RxjsComponent :: ';

  subscription: Subscription;

  intervalInfinite: any;

  constructor() {

    // Uso del observable creado
    this.cuentaTresObs().retry(2).subscribe(
      contador => console.log('contador: ', contador),
      error => console.error('error en el observable: ', error),
      () => console.log(' El Observador terminó.')
    );
    // Uso de observable con map
    this.cuentaTresObsMap().subscribe(
      contador => console.log('contador mapeado: ', contador),
      error => console.error('error en el observable: ', error),
      () => console.log(' El Observador terminó.')
    );
    // Uso de observable con map y filter
    this.cuentaTresObsFilter().subscribe(
      contador => console.log('contador filtrado solo impares: ', contador),
      error => console.error('error en el observable: ', error),
      () => console.log(' El Observador terminó.')
    );
    // Uso de observable infinito
    this.subscription = this.cuentaTresObsInfinito().subscribe(
      contador => console.log('contador infinito: ', contador),
      error => console.error('error en el observable: ', error),
      () => console.log(' El Observador terminó.')
    );

   }
    cuentaTresObs(): Observable<any> {
      return new Observable(observer => {
        let contador = 1;

        const interval = setInterval(() => {
          observer.next(contador);
          if ( contador === 3) {
            observer.complete();
            clearInterval(interval);
          }
          if (contador === 2 ) {
              observer.error('Error del observable testing');
              // clearInterval(interval);
          }
          contador++;
        }, 1000);
      });
    }
    cuentaTresObsMap(): Observable<any> {
      return new Observable(observer => {
        let contador = 0;


        const interval = setInterval(() => {

          contador++;
          const salida = {
            valor: contador
          }
          observer.next(salida);

          if ( contador === 3) {
            observer.complete();
            clearInterval(interval);
          }

        }, 1000);
      }).retry(2).map((success: any) => {
        return success.valor;
      });
    }
    /**
     * Filtrado
     */
    cuentaTresObsFilter(): Observable<any> {
      return new Observable(observer => {
        let contador = 0;


        const interval = setInterval(() => {

          contador++;
          const salida = {
            valor: contador
          };
          observer.next(salida);

          if ( contador === 3) {
            observer.complete();
            clearInterval(interval);
          }

        }, 1000);
      }).retry(2).map((success: any) => {
        return success.valor;
      }).filter( (valor, index) => {
          if (valor % 2 !== 0) {
            // impar
            return true;
          }
          return false;
      });
    }
    /**
     * Infinito filtrado
     */
    cuentaTresObsInfinito(): Observable<any> {
      return new Observable(observer => {
        let contador = 0;


        this.intervalInfinite = setInterval(() => {

          contador++;
          const salida = {
            valor: contador
          };
          observer.next(salida);

        }, 500);
      }).retry(2).map((success: any) => {
        return success.valor;
      }).filter( (valor, index) => {
          if (valor % 2 !== 0) {
            // impar
            return true;
          }
          return false;
      });
    }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log(this.TAG, 'onDestroy');
    this.subscription.unsubscribe();
    clearInterval(this.intervalInfinite);
  }
}
