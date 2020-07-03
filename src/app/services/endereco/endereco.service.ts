import { Injectable } from '@angular/core';
import { BaseService } from '../HTTP/base-service.service';
import { API_URL } from 'src/app/config/app.config.service';
import { ENV } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private baseS: BaseService) { }

  getAdress(adress: string) {
    const link = ENV.WS_WMS + 'enderecamento.' + API_URL + 'getAddress?empresa=' + localStorage.getItem('empresa') + '&address=' + adress;
    // console.log(link);
    // console.log(ENV.WS_WMS + API_URL);

    return new Promise((resolve, reject) => {
      this.baseS.get(link).then((result: any) => {
        console.log('Dados do Endereço');
        console.log(result);
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  retornaPedidosEndereco(ende: string) {
    const link = ENV.WS_WMS + API_URL + 'PickingConferencia/' +
      localStorage.getItem('empresa') + '/pickings?endereco=' + ende;
    console.log(link);

    return new Promise((resolve, reject) => {
      this.baseS.get(link).then((result: any) => {
        console.log('Resultado do retornaPedidosEndereco');
        console.log(result);
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  retornaEnderecosPedido(pedi: string) {
    const link = ENV.WS_WMS + API_URL + 'PickingConferencia/picking/' +
      localStorage.getItem('empresa') + '/' + pedi + '/endereco';
    console.log(link);

    return new Promise((resolve, reject) => {
      this.baseS.get(link).then((result: any) => {
        console.log('Resultado do retornaEnderecosPedido');
        console.log(result);
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  retornaProdutosPedido(numPedido: string, depOrigem: string) {
    let link: string;
    if (depOrigem === '') {
      link = 'https://auditoria-picking.' + API_URL + 'api/getProdutosPedido/' + localStorage.getItem('empresa') + '&' + numPedido + '&' + depOrigem;
      // link = ENV.WS_WMS + API_URL + 'PickingConferencia/' + localStorage.getItem('empresa') + '/' + numPedido + '/items?deposito=' + depOrigem;
    } else {
      link = 'https://auditoria-picking.' + API_URL + 'api/getProdutosPedido/' + localStorage.getItem('empresa') + '&' + numPedido;
      // link = ENV.WS_WMS + API_URL + 'PickingConferencia/' + localStorage.getItem('empresa') + '/' + numPedido + '/items';
    }

    return new Promise((resolve, reject) => {
      this.baseS.get(link).then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

}
