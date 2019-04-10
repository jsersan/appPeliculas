import { Component, OnInit } from '@angular/core';
import { PeliculaDetalle, Genre } from '../tabs/interfaces/interfaces';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  // Debo cargar un array de películas de los favoritos

  peliculas: PeliculaDetalle[] = [];
  generos: Genre[] = [];

  favoritoGenero: any[] = [];

  constructor( private dataLocal: DataLocalService,
               private moviesService: MoviesService ) { }

  // Esto dispara cada vez que se cargue la página

  async ionViewWillEnter() {
    this.peliculas = await this.dataLocal.cargarFavoritos();
    this.generos = await this.moviesService.cargarGeneros();
    console.log(this.peliculas);

    this.pelisPorGenero( this.generos, this.peliculas );
  }

  pelisPorGenero ( generos: Genre[], peliculas: PeliculaDetalle[] ) {

    this.favoritoGenero = [];

    generos.forEach( genero => {

      this.favoritoGenero.push({
        genero: genero.name,
        pelis: peliculas.filter( peli => {
          return peli.genres.find( genre => genre.id === genero.id);
        })
      });
    });

    console.log(this.favoritoGenero);
  }

}
