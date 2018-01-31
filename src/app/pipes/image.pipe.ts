import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from '../services/index';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  private config: any;
  constructor(
    private _configService: ConfigService
  ) {
    this.config = _configService.getConfig();
  }

  transform(image: string, collection: string = 'user'): any {
    let url = `${this.config.API.HOST}${this.config.API.CONTEXT.IMAGE}/${collection}/${image}`;

    if ( !image ) {
      return url += '/xxx';
    }

    if (image.indexOf('https') !== -1) {
      return image;
    }

    return url;
  }

}
