import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaMDB, PeliculaDetalle, RespuestaCredits, Genre } from '../tabs/interfaces/interfaces';
import { environment } from '../../environments/environment';
import { TouchSequence } from 'selenium-webdriver';

const URL    = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private popularesPage = 0;
  generos: Genre[] = [];

  constructor( private http: HttpClient ) {}

    private ejecutarQuery<T>( query: string ) {

      // Nuestro query va a ser el url.

      query = URL + query;

      // Le concateno lo siguiente

      query += `&api_key=${ apiKey }&language=es&include_image_language=es`;

      return this.http.get<T>( query );

    }

    getPopulares() {

      this.popularesPage++;

      const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage }`;

      // Todos los querys de discover devuelve un tipo de respuesta RespuestaMDB

      return this.ejecutarQuery<RespuestaMDB>(query);

    }

    getFeature() {

      // Para calcular el último mes independiente de la fecha:

      // hoy.getMonth()+1 >> quiero ir al mes siguiente

      const hoy = new Date();
      const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate(); // Me da la fecha del último día del mes actual
      const mes = hoy.getMonth() + 1; // El array empieza en 0

      let mesString;

      if ( mes > 10 ) {
        mesString = '0' + mes;
      } else {
        mesString = mes;
      }

      // Cambiamos el formato de las fechas para que aparezca yyyy-mm-aa
      // Formamos estas fechas:

      const inicio = `${hoy.getFullYear() }-${ mesString } - 01`; // Le resto el 01 porque quiero el primer día.
      const fin    = `${hoy.getFullYear() }-${ mesString } - ${ ultimoDia }`; // Para tener el último día.

      // tslint:disable-next-line:max-line-length
      return this.ejecutarQuery<RespuestaMDB>(`/discover/movie?primary_release_date.gte = ${inicio}&primary_release_date.lte=${fin}`);
    }

    getPeliculaDetalle( id: string ) {
      return this.ejecutarQuery<PeliculaDetalle>(`/movie/${id}?a=1`); // ?a=1 se pone para que no una con query
    }

    getActoresPelicula( id: string ) {
      return this.ejecutarQuery<RespuestaCredits>(`/movie/${id}/credits?a=1`); // ?a=1 se pone para que no una con query
    }

    buscarPeliculas( texto: string ) {
      return this.ejecutarQuery(`/search/movie?query=${ texto }`);
    }

    cargarGeneros(): Promise<Genre[]> {

      return new Promise( resolve => {
        this.ejecutarQuery(`/genre/movie/list?a=1`)
        .subscribe( resp => {
          this.generos = resp['genres'];
          console.log(this.generos);
          resolve(this.generos);
        });
      });


    }

  }


