import { Component, OnInit } from '@angular/core';
import { Platform, AlertController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CommonService } from 'src/app/services/common/common.service';
import { EnderecoService } from 'src/app/services/endereco/endereco.service';

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
    private alert: AlertController,
    private endereco: EnderecoService,
    private navControl: NavController,
    private platform: Platform
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.focusOn();
    console.log('WillEnter Rapido');
    this.common.goToFullScreen();
  }

  ionViewDidEnter() {
    this.common.goToFullScreen();
  }

  ionViewWillLeave() {
    this.focusOff();
  }

  ionViewDidLeave() {
    console.clear();
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
          // this.checaPedido(codigo);
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
      console.log(error);
      this.common.loading.dismiss();
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
      this.enderecoAtualParaExibicao = endereco;
    }
  }

  // by Helio, organiza as notas do endereço
  separaObjetos(objts: any) {
    for (let i = 0; i < objts.length; i++) {
      const a = objts[i].split('/');
      const b = a[1].split('-');
      const c = a[2].split('-');
      const pedido = {
        numPedido: a[0],
        numNotaFi: b[0],
        volumeAtual: b[1],
        volumeFinal: c[0],
        nomeCliente: c[1],
        escaneado: false
      };
      this.itens.push(pedido);
    }
  }

  // by Helio, limpa os dados da auditoria ao finalizar
  clearAuditoria() {
    this.existeEndereco = false;
    this.enderecoAtual = '';
    this.enderecoAtualParaExibicao = '';
    this.itens = [];
  }

  // by Helio
  getEnderecosPedido(pedido: string) {
    this.endereco.retornaEnderecosPedido(pedido).then(() => {

    }, (error) => {

    });
  }

  // by Helio, vai para a tela de detalhes do pedido
  goToPedidoDetalhes() {
    // this.navControl.navigateForward();
  }

}
