import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth/auth.service';
import { BaseService } from './HTTP/base-service.service';
import { CommonService } from './common/common.service';
import { DataService } from './data/data.service';
import { EnderecoService } from './endereco/endereco.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    BaseService,
    CommonService,
    DataService,
    EnderecoService
  ]
})
export class ServicesModule { }
