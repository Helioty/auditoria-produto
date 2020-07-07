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
  public pedidoItemEnderecos: ItemEnderecos[] = [];
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
    console.log(this.pedido);
    this.getProdutosPedido(this.pedido.numPedido);
    this.separaObjetos(this.enderecos);
  }

  ionViewWillLeave() {
    console.clear();
  }

  async getProdutosPedido(numPedido: string) {
    if (this.depOrigem === undefined) {
      this.depOrigem = '';
      console.log('foi limpo');
    }
    await this.common.showLoader();
    await this.enderecoS.retornaProdutosPedido(numPedido, this.depOrigem).then((result: any) => {
      console.log(result);
      this.itens = result;
      this.common.loading.dismiss();
    }, (error) => {
      this.common.loading.dismiss();
      console.log(error);
    });
  }

  separaObjetos(objts: string[]) {
    console.log(objts);
    objts.forEach(item => {
      const a = item.split('/');
      const b = a[2].split('-');
      const F = new ItemEnderecos();
      F.numPedido = a[0];
      F.cliente = a[1];
      F.nuStatus = b[0];
      F.status = b[1];
      F.enderecos = a[3];
      this.showEnderecos = true;
      this.pedidoItemEnderecos.push(F);
    });
  }

}
