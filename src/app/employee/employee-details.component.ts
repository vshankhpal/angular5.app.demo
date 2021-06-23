import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';
import { Employee,EmployeeData } from '../model/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: EmployeeData;

  constructor(private _route: ActivatedRoute, private empService: EmployeeService) { }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    this.employee = this.empService.getEmployeeById(id);
  }


}
