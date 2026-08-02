import { Component, effect, input, Signal } from '@angular/core';
import { Field, FieldState, ValidationError } from '@angular/forms/signals';

@Component({
  selector: 'app-form-errors',
  imports: [],
  template:`
  @if (state().touched() && state().invalid()) {

  @for (error of state().errors(); track error.message) {

      <p>{{ error.message }}</p>

  }

}
  `,
})
export class FormErrors {
  readonly state = input.required<FieldState<any>>();
}
