import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Department } from '../model/department.model';
import { Employee, EmployeeData } from '../model/employee.model';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { EmployeeService } from '../employee/employee.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {

  @ViewChild('employeeForm') public createEmployeeForm: NgForm;
  defaultBsconfig: Partial<BsDatepickerConfig>;
  previewPhoto: boolean = false;
  panelTitle: string;
  eid: string;
  employeeData: EmployeeData;
  emp: EmployeeData;
  departments: Department[] = [
    { id: 1, name: 'Help Desk' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Payroll' }
  ];

  constructor(private _empService: EmployeeService, private _router: Router, private _route: ActivatedRoute) {
    this.defaultBsconfig = Object.assign({}, { containerClass: "theme-dark-blue", dateInputFormat: "DD/MM/YYYY" });
  }


  togglePreviewPhoto() {
    this.previewPhoto = !this.previewPhoto;
  }

  ngOnInit() {

    this._route.paramMap.subscribe(parameterMap => {
      const id = parameterMap.get('id');
      this.eid = parameterMap.get('id');
      if (id === 'null') {
        this.createEmployee(id);
      }
      else {
        this._empService.getEmpById(this.eid).subscribe((response) => {
          this.emp = <EmployeeData>response.result;
          this.editEmpDetail(this.emp );
        });
      }
    });
    //this.employeeData = this._route.snapshot.data["employeeDetail"];

  }

  private createEmployee(id: string) {
    if (id === 'null') {
      this.employeeData = {
        id: Guid.create().toString(),
        name: null,
        gender: null,
        contactPreference: null,
        phoneNumber: null,
        email: '',
        dateOfBirth: null,
        department: 'select',
        isActive: null,
        photoPath: null,
        partitionKey: null,
        rowKey: null
      }
      this.createEmployeeForm.reset();
      this.panelTitle = "Create Employee";
    }
    // else {
    //   //this.employeeData = Object.assign({}, this._empService.getEmployeeById(id));
    //   this.employeeData = Object.assign({}, this.emp);
    //   console.log(this.employeeData);
    //   this.panelTitle = "Edit Employee";
    // }
  }

  private editEmpDetail(empData: EmployeeData) {
    this.employeeData = empData;
    this.panelTitle = "Edit Employee";
  }

  saveEmployeeDetail(): void {
    //const newEmployee: Employee = Object.assign({}, this.employee);
    this._empService.saveNewEmployee(this.employeeData).subscribe((data: any) => {
      console.log(data);
      this.createEmployeeForm.reset();
      this._router.navigate(['list']);
    },
      (error: any) => { console.log(error) });
  }

}
