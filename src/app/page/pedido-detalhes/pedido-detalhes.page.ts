import { EnderecoService } from 'src/app/services/endereco/endereco.service';
import { Component, OnInit } from '@angular/core';
import { PedidoHeader } from 'src/app/class/pedido';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedido-detalhes',
  templateUrl: './pedido-detalhes.page.html',
  styleUrls: ['./pedido-detalhes.page.scss'],
})
export class PedidoDetalhesPage implements OnInit {

  public pedido: PedidoHeader;
  public showPedido = false;

  public pedidoEnd
  public numPedido;
  public depOrigem;

  constructor(
    private endereco: EnderecoService,
    private activatedRoute: ActivatedRoute
  ) {
    
   }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.pedidoEnd = params;
      this.numPedido = this.pedidoEnd.numPedido;
    });

    this.getProdutosPedido();

    
  }

  async getProdutosPedido(){
    if(this.depOrigem == undefined){
      this.depOrigem = "";
    }
    await this.endereco.retornaProdutosPedido(localStorage.getItem('empresa'), this.numPedido, this.depOrigem).then(result=>{
      console.log(result);
    })
  }
  

}
