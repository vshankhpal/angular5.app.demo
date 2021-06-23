import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { CreateComponent } from './create.component';

@Injectable()
export class CreateEmployeeCanDeactivateGuardService
    implements CanDeactivate<CreateComponent> {

    constructor() { }

    canDeactivate(component: CreateComponent): boolean {
        if (component.createEmployeeForm.dirty) {
            return confirm('Are you sure you want to discard your changes?');
        }

        return true;
    }
}
