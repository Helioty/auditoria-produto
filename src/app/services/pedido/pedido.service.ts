import { Injectable } from '@angular/core';
import { BaseService } from '../HTTP/base-service.service';
import { API_URL } from 'src/app/config/app.config.service';
import { ENV } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private baseS: BaseService) { }

  // edit by Helio 10/03/2020
  public async getPedido(idPedido: string) {
    const link =
      ENV.WS_VENDAS + API_URL + 'PedidoVenda/' +
      localStorage.getItem('empresa') + '/' +
      idPedido;

    return new Promise((resolve, reject) => {
      this.baseS.get(link).then((result: any) => {
        resolve(result);
      }, (error) => {
        console.log(error);
        reject(error);
      });
    });
  }

}
