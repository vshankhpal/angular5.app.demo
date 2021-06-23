import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Employee, EmployeeData } from '../model/employee.model';
import { Observable } from 'rxjs/Observable';
import { EmployeeService } from './employee.service';
import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeListResolverService implements Resolve<EmployeeData[]> {

    constructor(private _empService:EmployeeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EmployeeData[]> {
        return this._empService.getEmployees();
    }
}