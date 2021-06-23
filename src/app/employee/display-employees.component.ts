import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee,EmployeeData } from '../model/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-display-employees',
  templateUrl: './display-employees.component.html',
  styleUrls: ['./display-employees.component.css']
})
export class DisplayEmployeesComponent implements OnInit {

  @Input() employee: EmployeeData;
  @Input() searchTerm: string;
  @Output() notifyDelete: EventEmitter<string> = new EventEmitter<string>();
  private selectedEmployeeId: string;
  private isEmployeeDelete: false;

  constructor(private _route: ActivatedRoute, private _router: Router, private _empService: EmployeeService) { }

  ngOnInit() {
    this.selectedEmployeeId = this._route.snapshot.paramMap.get('id');
  }

  viewEmployee(): void {
    this._router.navigate(['/employees', this.employee.id]);
  }

  editEmployee(): void {
    this._router.navigate(['/edit', this.employee.id]);
  }

  // deleteEmployee() {
  //   this._empService.deleteEmployee(this.employee.id);
  //   this.notifyDelete.emit(this.employee.id);
  // }

  deleteEmployee() {
    this._empService.deleteEmployee(this.employee.partitionKey,this.employee.rowKey).subscribe(
      () => console.log(`Employee with ID = ${this.employee.id} Deleted`),
      (err) => console.log(err)
    );
    this.notifyDelete.emit(this.employee.id);
  }



}
