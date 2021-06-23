import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee, EmployeeData } from '../model/employee.model';
import { EmployeeService } from '../employee/employee.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})

export class ListEmployeeComponent implements OnInit {

  // employees: Employee[];
  // filteredEmployees: Employee[];

  employees: EmployeeData[];
  filteredEmployees: EmployeeData[];
  private _searchTerm: string;
  get searchTerm(): string {
    return this._searchTerm;
  }
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }

  filterEmployees(searchString: string): EmployeeData[] {
    return this.employees.filter(emp =>
      emp.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  constructor(private _empService: EmployeeService, private _router: Router, private _route: ActivatedRoute) {
    this.employees = this._route.snapshot.data["employeeList"];
    this.filteredEmployees = this.employees;
  }

  ngOnInit() {
    // this._empService.getEmployees().subscribe(empList=>{
    //    this.employees=empList;
    //    this.filteredEmployees=this.employees;
    // });
    // this.filteredEmployees = this.employees;
  }

  // viewEmployee(empId): void {
  //   this._router.navigate(['/employees', empId]);
  // }

  notifyOnDelete(id: string) {
    const index = this.filteredEmployees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.filteredEmployees.splice(index, 1);
    }
  }

}
