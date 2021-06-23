import { Injectable } from '@angular/core';
import { Employee } from '../model/employee.model';
import { EmployeeData } from '../model/employee.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

@Injectable()
export class EmployeeService {

    constructor(private httpClient: HttpClient) { }

    private listEmployees: Employee[] = [
        {
            id: 1,
            name: 'Mark',
            gender: 'Male',
            contactPreference: 'Email',
            email: 'mark@pragimtech.com',
            dateOfBirth: new Date('10/25/1988'),
            department: '3',
            isActive: true,
            photoPath: 'assets/images/mark.png'
        },
        {
            id: 2,
            name: 'Mary',
            gender: 'Female',
            contactPreference: 'Phone',
            phoneNumber: 2345978640,
            dateOfBirth: new Date('11/20/1979'),
            department: '2',
            isActive: true,
            photoPath: 'assets/images/mary.png'
        },
        {
            id: 3,
            name: 'John',
            gender: 'Male',
            contactPreference: 'Phone',
            phoneNumber: 5432978640,
            dateOfBirth: new Date('3/25/1976'),
            department: '3',
            isActive: false,
            photoPath: 'assets/images/john.png'
        },
    ];

    private listOfEmployee: EmployeeData[];

    result: EmployeeData;

    // getEmployees(): Observable<Employee[]> {
    //     //return Observable.of(this.listEmployees).delay(2000);
    //     return this.httpClient.get<Employee[]>('http://localhost:63887/api/allemployees')
    //         .pipe(catchError(this.handleError));;
    // }

    getEmployees(): Observable<EmployeeData[]> {
        return this.httpClient.get<EmployeeData[]>('https://functionappfortblstorage.azurewebsites.net/api/GetRecordList?code=t7n7/zkif8X4kMsXG9hB9nPcoznKpYfMO3QD6C3Z7Z96p6MXPWD1cA==')
            .pipe(catchError(this.handleError));;
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error instanceof ErrorEvent) {
            console.error('Client Side Error :', errorResponse.error.message);
        } else {
            console.error('Server Side Error :', errorResponse);
        }
        // return an observable with a meaningful error message to the end user
        return new ErrorObservable('There is a problem with the service.We are notified & working on it.Please try again later.');
    }

    getEmployeeById(empId: string): EmployeeData {

        this.getEmployees().subscribe((data: EmployeeData[]) => {
            this.listOfEmployee = data
        },
            (error: any) => { console.log(error) });

        let employeeRecord = this.listOfEmployee.find(emp => emp.id === empId);
        return employeeRecord;
    }

    getEmpById(empId: string): Observable<any> {

        return this.httpClient.get<any>('https://functionappfortblstorage.azurewebsites.net/api/GetRecord?code=AY6yG7VNPc2YO0YRb58YkDl4snWisILWFjvi7O8zJ5QY99o8ThzgiA==&rowKey='+empId)
            .pipe(catchError(this.handleError));
    }

    public retPostData;

    public PostDataToLogicApp() {
        const url = "https://prod-45.eastus2.logic.azure.com:443/workflows/8a4bb31c9cc244b5b2bcdd5ec2afb111/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=y5T51yzmm_OMyApYiMOkE-5bOhxE3MbJBgSLc22rIvs";
        this.httpClient.post(url, { id: "123", username: "Vivek Shankhpal", password: "1234", contact: "9752885882", email: "vivekshankhpal@gmail.com" }).subscribe
            (data => {
                this.retPostData = data;
            });
        console.log(this.retPostData);
    }

    // public PostData(employee: Employee) : string {
    //     const url ="http://localhost:63887/api/allemployees";
    //     const retVal = this.httpClient.post(url, employee).subscribe
    //     (data => {this.retPostData = data;
    //     });  
    //     console.log(this.retPostData);
    //     return retVal.toString();
    //   }

    //   public PutData() {
    //     const url="http://localhost:49528/api/Home/10";
    //     this.httpClient.put(url, {DataVar1:'val1', DataVar2:'val2'})
    //     .subscribe(data => console.log(data));
    //   }

    //   public DeleteData() {
    //     const url ="http://localhost:49528/api/Home/5";
    //     this.httpClient.delete(url).subscribe(data=> console.log(data),err=>{console.log("Error Occured")});
    //   }

    // saveNewEmployee(employee: Employee): Observable<string> {
    //     if (employee.id === null) {
    //          console.log(employee);
    //         return this.httpClient.post<string>('http://localhost:63887/api/allemployees',
    //         employee,
    //         {
    //             headers:new HttpHeaders({
    //                 'Content-Type': 'application/json'
    //             })
    //         })
    //         .pipe(catchError(this.handleError));

    //     }
    //     else {
    //         const indexVal = this.listEmployees.findIndex(emp => emp.id === employee.id);
    //         this.listEmployees[indexVal] = employee;
    //     }
    // }


    saveNewEmployee(employee: EmployeeData): Observable<any> {

        if (employee.partitionKey === null && employee.rowKey === null) {
            console.log(employee);
            return this.httpClient.post<any>('https://prod-45.eastus2.logic.azure.com:443/workflows/8a4bb31c9cc244b5b2bcdd5ec2afb111/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=y5T51yzmm_OMyApYiMOkE-5bOhxE3MbJBgSLc22rIvs',
                employee,
                {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    })
                })
                .pipe(catchError(this.handleError));
        }
        else {
            // const indexVal = this.listEmployees.findIndex(emp => emp.id === employee.id);
            // this.listEmployees[indexVal] = employee;
            console.log(employee);
            return this.httpClient.post<any>('https://functionappfortblstorage.azurewebsites.net/api/InsertAndUpdateRecord?code=GNFajEEY9Y/LaXEMde6QNWmjtFgSH9updeJhoLgnOZ8Ccg1ESuJa1A==',
                employee,
                {
                    headers: new HttpHeaders({
                        'Content-Type': 'application/json'
                    }),
                    responseType: 'text' as 'json'
                }
            )
                .pipe(catchError(this.handleError));
        }
    }


    deleteEmployee(partitionKey: string, rowKey: string): Observable<any> {

        return this.httpClient.delete<any>("https://functionappfortblstorage.azurewebsites.net/api/DeleteRecord?code=4R5SGhpxjF4bX1QCBSXCIFyzbVQNHCxW5R5aLZWaS4mNSBSPHGQGWA==&partitionKey=" + partitionKey + "&rowKey=" + rowKey,
            { responseType: 'text' as 'json' })
            .pipe(catchError(this.handleError));

    }
}