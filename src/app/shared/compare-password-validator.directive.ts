import { Validator, NG_VALIDATORS, AbstractControl } from "@angular/forms";
import { Directive, Input } from "@angular/core";

@Directive({
    selector: '[appComparePasswordValidator]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: ComparePasswordValidator,
        multi: true
    }
    ]

})

export class ComparePasswordValidator implements Validator {

    @Input() appComparePasswordValidator: string;
    validate(control: AbstractControl): { [key: string]: any } | null {
        const comparePassword = control.parent.get(this.appComparePasswordValidator);
        if (comparePassword && comparePassword.value !== control.value) {
            return { 'notEqual': true };
        }
    }

}