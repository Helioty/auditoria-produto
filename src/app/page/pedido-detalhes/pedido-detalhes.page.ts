import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common/common.service';
import { EnderecoService } from 'src/app/services/endereco/endereco.service';
import { Item, ItemEnderecos } from 'src/app/class/item';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pedido-detalhes',
  templateUrl: './pedido-detalhes.page.html',
  styleUrls: ['./pedido-detalhes.page.scss'],
})
export class PedidoDetalhesPage implements OnInit {

  public showPedido = false;
  public showEnderecos = false;

  public pedido: Item;
  public pedidoItemEnderecos: ItemEnderecos;
  public enderecos: string[] = [];

  public depOrigem;

  public itens: any[];

  constructor(
    private common: CommonService,
    private enderecoS: EnderecoService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: any) => {
      this.pedido = JSON.parse(params['pedido']);
      this.enderecos = params['pedidoEnderecos'];
    });
    this.showPedido = true;
    this.getProdutosPedido(this.pedido.numPedido);
    this.separaObjetos(this.enderecos);
  }

  async getProdutosPedido(numPedido: string) {
    if (this.depOrigem == undefined) {
      this.depOrigem = '';
      console.log('foi limpo')
    }
    await this.common.showLoader();
    await this.enderecoS.retornaProdutosPedido(numPedido, this.depOrigem).then((result: any) => {
      console.log(result);
      this.itens = result;
      this.common.loading.dismiss();
    }, (error) => {
      console.log(error);
      this.common.loading.dismiss();
    });
  }

  separaObjetos(objts: string[]) {
    for (let i = 0; i < objts.length; i++) {
      const a = objts[i].split('/');
      const b = a[2].split('-');
      this.pedidoItemEnderecos = new ItemEnderecos();
      this.pedidoItemEnderecos.numPedido = a[0];
      this.pedidoItemEnderecos.cliente = a[1];
      this.pedidoItemEnderecos.nuStatus = b[0];
      this.pedidoItemEnderecos.status = b[1];
      if (a.length >= 4) {
        for (let g = 3; g < a.length; g++) {
          this.pedidoItemEnderecos.enderecos.push(a[g]);
        }
      }
    }
  }

}
