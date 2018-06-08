import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { TablesComponent } from './tables.component';
import { PageHeaderModule } from './../../shared';

import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [CommonModule, TablesRoutingModule, PageHeaderModule, FormsModule],
    declarations: [TablesComponent]
})
export class TablesModule {}
