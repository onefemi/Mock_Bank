import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  { path: "", redirectTo: "/register", pathMatch: 'full' },
  { path: "register", component: RegistrationComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "transaction", component: TransactionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
