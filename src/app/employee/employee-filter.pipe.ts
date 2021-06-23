import { Pipe, PipeTransform } from "@angular/core";
import { Employee } from "../model/employee.model";

@Pipe({
    name:'employeeFilter'
})
export class EmployeeFilterPipe implements PipeTransform{
    transform(employees:Employee[],searchTerm:string):Employee[]{
        if(!employees || !searchTerm){
            return employees;
        }
        return employees.filter(emp=>emp.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
    }
}