import { Injectable } from '@angular/core';
import { Storage} from '@ionic/storage';
import { PeliculaDetalle } from '../tabs/interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculas: PeliculaDetalle[] = [];

  constructor( private storage: Storage,
               private toastCtrl: ToastController) {
    this.cargarFavoritos();
  }


  async presentToast( message: string ) {
       const toast = await this.toastCtrl.create({
         message,
         duration: 1500
       });
      toast.present();
  }

  guardarPelicula( pelicula: PeliculaDetalle ) {

    let existe = false;
    let mensaje = '';

    for ( const peli of this.peliculas ) {
      if (peli.id === pelicula.id) {
        existe = true;
        break;
      }
    }

    console.log('Existe', existe);

    if (existe) { // Debo borrarla
      this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id);
      mensaje = 'Borrado de favoritos';
    } else {
      this.peliculas.push( pelicula );
      mensaje = 'Agregada a favoritos';
    }

    this.presentToast( mensaje );
    this.storage.set('peliculas', this.peliculas);

    return !existe;

  }

  async cargarFavoritos() {

    const peliculas = await this.storage.get('peliculas');

    // Nuestro array ahora son las películas almacenadas.
    this.peliculas = peliculas || []; // Si películas es null debo mandar un arreglo vacío.

    return this.peliculas;

  }

  async existePelicula( id ) {

    await this.cargarFavoritos();
    const existe = this.peliculas.find( peli => peli.id === id);

    // Si existe va a retornar todo el objeto de la película y si no va a retornar un undefined.

    return (existe) ? true : false;
  }
}
