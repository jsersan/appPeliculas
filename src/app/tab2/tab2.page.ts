import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Pelicula } from '../tabs/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  textoBuscar = '';
  buscando = false;

  peliculas: Pelicula[] = []; // Es donde voy a cargar el reultado de la búsqueda.

  ideas: string[] = ['Spiderman', 'Avenger', 'El señor de los Anillos', 'La vida es bella'];

  constructor( private moviesService: MoviesService,
               private modalCtrl: ModalController ) {  }

  buscar ( event) {
    const valor: string = event.detail.value;

    if (valor.length === 0) {
      this.buscando = false;
      this.peliculas = [];
      return;
    }

    console.log(valor);
    this.buscando = true;
    this.moviesService.buscarPeliculas( valor)
        .subscribe( resp => {
          console.log(resp);
          this.peliculas = resp['results'];
          this.buscando = false;
    });
  }

  async detalle( id: string) {

      const modal = await this.modalCtrl.create({
        component: DetalleComponent,
        componentProps: {      // Los objetos que quiero mandar, en este caso el id
            id
        }
      });
  
      modal.present();
    }

  
}


