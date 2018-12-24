import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { ShareModule } from '../share/share.module';
import { MemberComponent } from './member.component';

@NgModule({
  declarations: [MemberComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    ShareModule
  ]
})
export class MemberModule { }
