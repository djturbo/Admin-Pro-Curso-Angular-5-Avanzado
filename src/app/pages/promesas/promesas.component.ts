import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {


      this.contarTres().then((success) => {
        console.log('terminó la promesa: success: ', success);
      }).catch((error) => {
        console.log('error en la promesa error: ', error);
      });
   }

  contarTres(): Promise<any> {
    return new Promise((resolve, reject) =>{
      let contador = 0;
      const interval = setInterval(() => {
          contador += 1;
          console.log('contador: ', contador);
          if (contador === 3) {
            resolve('Todo ok');
            // reject('error testing');
            clearInterval(interval);
          }
      }, 1000);
    });
  }

  ngOnInit() {
  }

}
