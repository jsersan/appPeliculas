import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const URL = environment.imgPath;

// Tenemos urls muy largas, sería un probelamsi debemos darle mantenimiento.
// Lo arreglamos en el enviroments


@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, size: string = 'w500'): string {

  if (!img) {
    return './assets/no-image-banner.jpg';
  }

  const imgURL = `${ URL }/${ size }${ img }`;
  //console.log('URL', imgURL);

  return imgURL;
  }

}
