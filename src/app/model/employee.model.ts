import { Data } from "@angular/router";
import { Guid } from "guid-typescript";

export class Employee {
    id: number;
    name: string;
    gender: string;
    email?: string;//optional
    phoneNumber?: number;//optional
    contactPreference: string;
    dateOfBirth: Date;
    department: string;
    isActive: boolean;
    photoPath?: string;
}

export class EmployeeData {
    id: string;
    name: string;
    gender: string;
    email?: string;//optional
    phoneNumber?: string;//optional
    contactPreference: string;
    dateOfBirth: string;  
    department: string;
    isActive: boolean;
    photoPath?: string;
    partitionKey: string;
    rowKey: string;
}