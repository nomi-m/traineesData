import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataComponent } from './data/data.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { MonitorComponent } from './monitor/monitor.component';

const routes: Routes = [
  { path: 'data', component: DataComponent },
  { path: 'analysis', component: AnalysisComponent },
  { path: 'monitor', component: MonitorComponent },
  { path: '', redirectTo: '/data', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
