import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifResponse } from '../interfaces/gif.interface';

// el parámetro providedIn : 'root' hace que el servicio esté disponible en toda la aplicación
// sin necesidad de incluirlo en ningún módulo o fichero de configuración adicional. 

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _historial: string[] = [];

  // API key para acceder al API de GIPHY.com
  private apiKey : string = "Mhk30bIvNSELdBU94O8uGehdbIk7P0sT";
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';

  //TODO: cambiar any por su tipo
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor (private http: HttpClient ) {

    // if ( localStorage.getItem('historal') ) {
    //   //this._historial = JSON.parse( localStorage.getItem('historial') || '{}' );
    //   this._historial = JSON.parse( localStorage.getItem('historial')! );
    // }
    
    // tb se puede poner... la admiración es para evitar error de compilación pq
    // el getItem puede devolver string o null
    this._historial = JSON.parse( localStorage.getItem('historial')!) || [];

    this.resultados = JSON.parse( localStorage.getItem('lastOutput')!) || [];

  }

  public buscarGifs( query: string) {

    query = query.trim().toLowerCase();
    
    if (!this._historial.includes(query)){
      // insertamos al principio
      this._historial.unshift(query);
      // quitamos 10 elmementos y lo asignamos al historial ... 
      this._historial = this._historial.splice(0,10);

      // guardar en el localStorage del navegador para tener algo de persistencia
      localStorage.setItem('historial', JSON.stringify(this._historial) );

    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);
    
    // la llamada sería 
    // this.http.get<SearchGifResponse>(`${ this.servicioUrl }/search`, { params: params })
    // y esto en ECMAScript 6 es equivalente a 
    // this.http.get<SearchGifResponse>(`${ this.servicioUrl }/search`, { params })
    // porque el parámetro se llama igual que el objeto que le estoy pasando. 
    this.http.get<SearchGifResponse>(`${ this.servicioUrl }/search`, { params })
        .subscribe ( ( resp: any ) => {
          //console.log(resp.data);
          this.resultados = resp.data;
          
          // guardamos en localStorage los resultados de la búsqueda
          localStorage.setItem('lastOutput', JSON.stringify(this.resultados) );
        });

  }


}
