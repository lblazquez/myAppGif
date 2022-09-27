import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GifsPageComponent } from './gifs-page/gifs-page.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { ResultadosComponent } from './resultados/resultados.component';



@NgModule({
  declarations: [
    GifsPageComponent,
    BuscadorComponent,
    ResultadosComponent
  ],
  imports: [
    CommonModule
  ], 
  exports: [
    GifsPageComponent
  ]
})
export class GifsModule { }
