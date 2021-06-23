import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { ListEmployeeComponent } from './employee/list-employee.component';
import { CreateComponent } from './employee/create.component';
import { SelectRequiredValidatorDirective } from './shared/select-required-validator.directive';
import { ComparePasswordValidator } from './shared/compare-password-validator.directive';
import { EmployeeService } from './employee/employee.service';
import { DisplayEmployeesComponent } from './employee/display-employees.component';
import { CreateEmployeeCanDeactivateGuardService } from './employee/create-employee-can-deactivate-gaurd.service';
import { EmployeeDetailsComponent } from './employee/employee-details.component';
import { EmployeeFilterPipe } from './employee/employee-filter.pipe';
import { EmployeeListResolverService } from './employee/employee-list.resolver.service';
import { PageNotFoundComponent } from './page-not-found.component';
import { EmployeeDetailsCanActivateGuardService } from './employee/employee-details-can-activate-guard.service';
import { EmployeeDetailResolverService } from './employee/employee-create-edit.resolver.service';

const appRoutes: Routes = [
  { path: 'list', component: ListEmployeeComponent, resolve: { employeeList: EmployeeListResolverService } },
  { path: 'edit/:id', component: CreateComponent, canDeactivate: [CreateEmployeeCanDeactivateGuardService] },
  { path: 'employees/:id', component: EmployeeDetailsComponent, canActivate: [EmployeeDetailsCanActivateGuardService] },
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'notfound', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListEmployeeComponent,
    CreateComponent,
    SelectRequiredValidatorDirective,
    ComparePasswordValidator,
    DisplayEmployeesComponent,
    EmployeeDetailsComponent,
    EmployeeFilterPipe,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BsDatepickerModule.forRoot(),
    HttpClientModule
  ],
  providers: [EmployeeService, CreateEmployeeCanDeactivateGuardService,
    EmployeeListResolverService, EmployeeDetailsCanActivateGuardService, EmployeeDetailResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
