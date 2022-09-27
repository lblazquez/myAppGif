import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

// vamos a trabajar directamente con los elementos del DOM para recuperar los valores
// del formulario, no vamos a usar el módulo FormsModule de gestión de formularios 

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html'
})
export class BuscadorComponent {

  //buscar( event: any ) {
  // buscar( event: KeyboardEvent ) {
  //   console.log(event);
  // }

  // la directiva ViewChild me permite acceder a elementos del DOM del componente y 
  // manejarlo como queramos (ocultar, cambiar estilo, etc. )

  // el signo de admiración (non-null asertion operator) es para indicar a typescript 
  // que el elemento cajaTxtBuscar va a existir  y que ts no debe levantar un error 
  // porque no se haya inicializado ese elemento
  //@ViewChild('txtBuscar') cajaTxtBuscar!: ElementRef;

  // aquí ya 'tipamos' el ElementRef
  @ViewChild('txtBuscar') cajaTxtBuscar!: ElementRef<HTMLInputElement>;


  constructor ( private _gifsService: GifsService ) { }

  buscar(){

    const termino = this.cajaTxtBuscar.nativeElement.value

    // console.log ("El contendio de la caja de texto es ", termino );

    // borramos el elemento del DOM. 
    this.cajaTxtBuscar.nativeElement.value = "";

    // evitamos buscar términos vacíos. 
    if (termino.trim().length === 0) return; 

    this._gifsService.buscarGifs(termino);


  }

}
