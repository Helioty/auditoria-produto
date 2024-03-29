import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonService } from 'src/app/services/common/common.service';
import { EnderecoService } from 'src/app/services/endereco/endereco.service';
import { NavigationExtras } from '@angular/router';
import { Item } from 'src/app/class/item';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  public taskScanner: any;
  public valorScanner: string;
  public focusStatus = true;

  public itens: any[] = [];

  public existeEndereco = false;
  public enderecoAtual = '';
  public enderecoAtualParaExibicao = '';

  constructor(
    public auth: AuthService,
    public common: CommonService,
    private endereco: EnderecoService,
    private navControl: NavController,
    private platform: Platform
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.focusOn();
    this.common.goToFullScreen();
  }

  ionViewDidEnter() {
    this.common.goToFullScreen();
  }

  ionViewWillLeave() {
    this.focusOff();
  }

  ionViewDidLeave() {
    // console.clear();
  }

  // Cria o loop que da foco no input
  focusOn() {
    if (this.platform.is('cordova')) {
      this.taskScanner = setInterval(() => {
        try {
          this.valorScanner = '';
          if (this.focusStatus) {
            document.getElementById('scanner').focus();
          }
        } catch (error) { }
      }, 300);
    }
  }

  focusPlay() {
    this.focusStatus = true;
  }

  focusPause() {
    this.focusStatus = false;
    document.getElementById('scanner').blur();
  }

  // Encerra o loop de foco no input
  focusOff() {
    setTimeout(() => {
      clearInterval(this.taskScanner);
    }, 150);
  }

  scaneado(evento: any) {
    try {
      if (evento.target && evento.target.value.length >= 2) {
        this.focusPause();
        const codigo: string = evento.target.value;

        if (this.existeEndereco) {
          this.focusPlay();
        } else {
          this.getPedidosEnde(codigo);
          this.focusPlay();
        }
      }
    } catch (error) {
      this.focusPlay();
    }
  }

  // by Helio, pega as notas do endereço escaneado
  async getPedidosEnde(ende: string) {
    await this.common.showLoader();
    this.itens = [];
    this.endereco.retornaPedidosEndereco(ende).then((result: any) => {
      this.separaObjetos(result);
      this.existeEndereco = true;
      this.enderecoAtual = ende;
      this.formataEnderecoParaExibicao(ende);
      console.log(result);
      this.common.loading.dismiss();
    }, (error) => {
      this.common.loading.dismiss();
      console.log(error);
    });
  }

  // by Helio, formata o endereço para exibição
  formataEnderecoParaExibicao(endereco: string) {
    if (endereco.length > 18) {
      const a = endereco.split('-');
      let b = '';
      a.forEach((parte, index) => {
        if (index === (a.length - 1)) {
          b = b + parte.substr(2);
        } else {
          b = b + parte.substr(2) + '-';
        }
      });
      this.enderecoAtualParaExibicao = b;
    } else {
      this.endereco.getAdress(endereco).then((result: any) => {
        this.enderecoAtualParaExibicao = result.endereco;
      });
    }
  }

  // by Helio, organiza as notas do endereço
  separaObjetos(objts: any) {
    objts.forEach((el: string) => {
      const a = el.split('/');
      const b = a[2].split('-');
      const pedido = new Item();
      pedido.numPedido = a[0];
      pedido.cliente = a[1];
      pedido.nuStatus = b[0];
      pedido.status = b[1];
      this.itens.push(pedido);
    });
    // for (let i = 0; i < objts.length; i++) {
    //   const a = objts[i].split('/');
    //   const b = a[2].split('-');
    //   const pedido = new Item();
    //   pedido.numPedido = a[0];
    //   pedido.cliente = a[1];
    //   pedido.nuStatus = b[0];
    //   pedido.status = b[1];
    //   this.itens.push(pedido);
    // }
  }

  // by Helio, limpa os dados da auditoria ao finalizar
  clearAuditoria() {
    this.existeEndereco = false;
    this.enderecoAtual = '';
    this.enderecoAtualParaExibicao = '';
    this.itens = [];
  }

  // by Helio
  getEnderecosPedido(pedido: Item) {
    this.endereco.retornaEnderecosPedido(pedido.numPedido).then((result: any) => {
      this.goToPedidoDetalhes(result, pedido);
    }, (error) => {

    });
  }

  // by Helio, vai para a tela de detalhes do pedido
  goToPedidoDetalhes(pedidoEnde: string[], pedido: Item) {
    const navExtra: NavigationExtras = {
      queryParams: {
        pedidoEnderecos: pedidoEnde,
        pedido: JSON.stringify(pedido)
      }
    };
    this.navControl.navigateForward(['/pedido-detalhes'], navExtra);
  }

}
