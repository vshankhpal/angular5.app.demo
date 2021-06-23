import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { EmployeeData } from '../model/employee.model';
import { Observable } from 'rxjs/Observable';
import { EmployeeService } from './employee.service';
import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeDetailResolverService implements Resolve<EmployeeData> {

    empData: Observable<EmployeeData>;
    empId: string;
    constructor(private _empService: EmployeeService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<EmployeeData> {
        this.empId = route.paramMap.get('id');
        console.log(this.empId + " ID OF EMP");
        // if (this.empId !== 'null') {
        //     return this._empService.getEmployeeById(this.empId);
        // }
        return this._empService.getEmpById(this.empId);
    }
}