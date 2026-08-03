import { Component, model, computed, input, signal } from "@angular/core";

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.html',
})
export class TagInputComponent {

  readonly tags = model<string[] | undefined>([]);

  readonly placeholder = input('Add tag');

  readonly label = input('Tags');

  readonly value = signal('');

  addTag(): void {
    const tag = this.value().trim();

    if (!tag) {
      return;
    }

    const tags = this.tags() ?? [];

    if (tags.includes(tag)) {
      this.value.set('');
      return;
    }

    this.tags.set([...tags, tag]);
    this.value.set('');
  }

  removeTag(tag: string): void {
    this.tags.update(tags =>
      (tags ?? []).filter(t => t !== tag)
    );
  }

}