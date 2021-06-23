import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { EmployeeService } from "./employee.service";
import { Injectable } from "@angular/core";

@Injectable()
export class EmployeeDetailsCanActivateGuardService implements CanActivate {

    constructor(private _empService: EmployeeService, private _router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const employeeDetails = !!this._empService.getEmployeeById(route.paramMap.get('id'));
        
        if (employeeDetails) {
            return true;
        } else {
            this._router.navigate(['/notfound']);
            return false;
        }
    }
}