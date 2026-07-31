import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-errors',
  imports: [],
  template:`
  @if(field().touched() && field().invalid()) {

    @for(error of field().errors(); track error.message) {

        <p class="text-sm text-red-600">
            {{ error.message }}
        </p>

    }

}
  `,
})
export class FormErrors {
  readonly field = input.required<any>();
}
