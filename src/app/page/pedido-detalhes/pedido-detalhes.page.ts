import { Component, OnInit } from '@angular/core';
import { PedidoHeader } from 'src/app/class/pedido';

@Component({
  selector: 'app-pedido-detalhes',
  templateUrl: './pedido-detalhes.page.html',
  styleUrls: ['./pedido-detalhes.page.scss'],
})
export class PedidoDetalhesPage implements OnInit {

  public pedido: PedidoHeader;
  public showPedido = false;

  constructor() { }

  ngOnInit() {
  }

}
