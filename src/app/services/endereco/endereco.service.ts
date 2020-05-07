import { Injectable } from '@angular/core';
import { BaseService } from '../HTTP/base-service.service';
import { API_URL } from 'src/app/config/app.config.service';
import { ENV } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

  constructor(private baseS: BaseService) { }

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
    const link = ENV.WS_WMS + API_URL + 'PickingConferencia/picking' +
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

  removePedidoEndereco(ende: string, notas: string[]) {
    const link = ENV.WS_WMS + API_URL + 'PickingConferencia/' + localStorage.getItem('empresa') +
      '/removeNotasDoca?endereco=' + ende;

    return new Promise((resolve, reject) => {
      this.baseS.post(link, notas).then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  adicionarPedidoEndereco(codEmpresa: string, nf: string, ende: string, volu: any) {
    const link = ENV.WS_WMS + API_URL + 'PickingConferencia/' +
      codEmpresa + '/' + nf + '/addnoEnderecoNFAudit?endereco=' +
      ende + '&volume=' + volu.split('/')[0];

    return new Promise((resolve, reject) => {
      this.baseS.post(link, {}).then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  // retorna todos os enderecos para a nota e seus volumes
  retornaEnderecoNota(codEmpresa: string, nf: string) {
    const link = ENV.WS_WMS + API_URL + 'PickingConferencia/' +
      codEmpresa + '/' + nf + '/endereco';

    return new Promise((resolve, reject) => {
      this.baseS.get(link).then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

  // retorna o endereco de onde o volume 1 da nota deveria esta
  retornaEnderecoNotaVolume(codEmpresa: string, nf: string, volu: string) {
    const link = ENV.WS_WMS + API_URL + 'PickingConferencia/' +
      codEmpresa + '/' + nf + '/endereco?volume=' + volu;

    return new Promise((resolve, reject) => {
      this.baseS.get(link).then((result) => {
        resolve(result);
      }, (error) => {
        reject(error);
      });
    });
  }

}
