import { CSSResultOrNative, html, HTMLTemplateResult, LitElement, nothing, TemplateResult } from "lit";
import { INimsCombobox } from "./nims-combobox.interface"
import { NimsComboboxStyles } from "./nims-combobox.styles";
import { FormControlMixin, requiredValidator, Validator } from "@open-wc/form-control";
import { property, query, state } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
import { Utilities } from "../../shared/Utilities";
import { LitVirtualizer } from "@lit-labs/virtualizer";

import '@lit-labs/virtualizer';
import { invalidValueValidator } from "./nims-combobox.validators";

export class NimsCombobox extends FormControlMixin(LitElement) implements INimsCombobox {
  static override get styles(): CSSResultOrNative[] {
    return [NimsComboboxStyles];
  }

  static get canonicalName() {
    return 'nims-combobox';
  }

  static get shadowRootOptions(): ShadowRootInit {
    return <ShadowRootInit>{
      mode: 'open',
      delegatesFocus: true,
    };
  }

  static get formControlValidators(): Validator[] {
    return [
      requiredValidator,
      invalidValueValidator,
    ];
  }

  @property({ type: Boolean, attribute: 'required' })
  required = false;

  @property({ type: Boolean, attribute: 'disabled' })
  disabled = false;

  @property({ type: Boolean, attribute: 'compact' })
  compact = false;

  @property({ type: String, attribute: 'name' })
  name = '';

  @property({ type: String, attribute: 'helper-text' })
  helperText = '';

  @property({ type: String, attribute: 'error-message' })
  errorMessage = '';

  @property({ type: String, attribute: 'value' })
  value = '';

  @property({ type: Array, attribute: 'items' })
  items: string[] = [];

  @state()
  private _open = false;

  @query('#validation-target')
  validationTarget?: HTMLInputElement;

  @query('lit-virtualizer')
  virtualizer?: LitVirtualizer;

  @query('.item-highlighted')
  highlightedItemElement?: HTMLSpanElement;

  #touched = false;

  #highlightedItemIndex = 0;

  //--------------------------------------------------------------------------//
  validationMessageCallback(message: string): void {
    this.errorMessage = message;
  }

  resetFormControl(): void {
    this.#touched = false;
    this.#highlightedItemIndex = 0;
    this._open = false;
    this.value = '';
    this.setValue('');
  }

  // Getters -----------------------------------------------------------------//
  get showErrorMessage() {
    return this.#touched;
  }

  // Component Methods -------------------------------------------------------//
  #closeDropdown() {
    this._open = false;
    this.#highlightedItemIndex = 0;
  }

  #openDropdown() {
    this.#highlightedItemIndex = 0;
    this._open = true;
  }

  #filterItems(items: string[], query: string) {
    return items.filter(item => Utilities.fuzzyMatch(item, query));
  }

  // Event Handlers ----------------------------------------------------------//
  #onInput = (event: Event) => {
    const element = event.target as HTMLInputElement;
    const { value } = element;

    const filteredItems = this.#filterItems(this.items, value);
    if (filteredItems.length) {
      this.#openDropdown();
    }

    this.value = value;
    this.setValue(value);
    event.preventDefault();
  };

  #onFocus = () => {
    if (!this.#touched) this.#touched = true;
  };

  #onBlur = () => {
    this.#closeDropdown();
  };

  #onClick = () => {
    this._open = true;
  };

  #onSelect = (event: Event) => {
    const element = event.target as HTMLSpanElement;
    const { value } = element.dataset;
    if (value !== undefined) {
      if (this.value !== value) {
        this.value = value;
        this.setValue(this.value);
        if (this.validationTarget) {
          this.validationTarget.value = value;
          this.validationTarget.dispatchEvent(new Event('input'));
        }
      }
    }
    this.#closeDropdown();
  };

  #onArrowUp = () => {
    const filteredItems = this.items.filter(item => Utilities.fuzzyMatch(item, this.value));
    if (this.#highlightedItemIndex > 0) {
      if (this.highlightedItemElement) {
        this.virtualizer?.element(this.#highlightedItemIndex-1)?.scrollIntoView();
        const itemElements = this.shadowRoot?.querySelectorAll('.item') as NodeListOf<HTMLSpanElement>;
        const previousItem = filteredItems[this.#highlightedItemIndex-1];
        const previousElement = [...itemElements].find(element => element.dataset?.value === previousItem) as HTMLSpanElement | undefined;
        this.highlightedItemElement.classList.remove('item-highlighted');
        previousElement?.classList.add('item-highlighted');
        this.#highlightedItemIndex--;
      }
    }
  };
  
  #onArrowDown = () => {
    const filteredItems = this.items.filter(item => Utilities.fuzzyMatch(item, this.value));
    if (this.#highlightedItemIndex < filteredItems.length) {
      this.virtualizer?.element(this.#highlightedItemIndex)?.scrollIntoView();
      if (!this.highlightedItemElement) {
        const firstElement = this.shadowRoot?.querySelector('.item') as HTMLSpanElement | null;
        firstElement?.classList.add('item-highlighted');
      } else if (this.#highlightedItemIndex < filteredItems.length - 1) {
        const itemElements = this.shadowRoot?.querySelectorAll('.item') as NodeListOf<HTMLSpanElement>;
        const nextItem = filteredItems[this.#highlightedItemIndex+1];
        const nextElement = [...itemElements].find(element => element.dataset?.value === nextItem) as HTMLSpanElement | undefined;
        this.highlightedItemElement.classList.remove('item-highlighted');
        nextElement?.classList.add('item-highlighted');
        this.#highlightedItemIndex++;
      }
    }
  };

  #onEnter = () => {
    if (this.highlightedItemElement) {
      const { value } = this.highlightedItemElement.dataset;
      if (value !== undefined) {
        if (this.value !== value) {
          this.value = value;
          this.setValue(this.value);
          if (this.validationTarget) {
            this.validationTarget.value = value;
            this.validationTarget.dispatchEvent(new Event('input'));
          }
        }
      }
      this.#closeDropdown();
    }
  };

  #onKeydown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        this.#onArrowUp();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!this._open) {
          this.#openDropdown();
        } else {
          this.#onArrowDown();
        }
        break;
      case 'Enter':
        event.preventDefault();
        this.#onEnter();
        break;
      case 'Escape':
        event.preventDefault();
        if (this._open) {
          this.#closeDropdown();
        }
        break;
      default:
        break
    }
  }

  #onInvalid = (event: Event) => {
    event.preventDefault();
    this.validationTarget?.focus()
  };

  // Lifecycle Methods -------------------------------------------------------//
  override connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('invalid', this.#onInvalid);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeEventListener('invalid', this.#onInvalid);
  }

  // Render ------------------------------------------------------------------//
  #renderItem = (item: string, index: number): HTMLTemplateResult => html`
    <span 
      class="
        item
        ${this.compact ? 'compact' : ''}
      "
      data-value="${item}" 
      data-index="${index}"
      @click="${this.#onSelect}"
    >
      ${item}
    </span>
  `;

  override render(): HTMLTemplateResult {
    return html`
      <div class="combobox-container">
        <label class="label" for="combobox">
          <slot name="label"></slot>
          ${!this.required ? html`<span>(optional)</span>` : ''}
        </label>
        <input
          id="validation-target"
          class="
            ${this.compact ? 'compact' : ''}
            ${this.errorMessage ? 'invalid' : ''}
          "
          name="combobox"
          role="combobox"
          aria-expanded="${this._open}"
          type="text"
          ?required="${this.required}"
          .value="${live(this.value)}"
          @input="${this.#onInput}"
          @focus="${this.#onFocus}"
          @blur="${this.#onBlur}"
          @click="${this.#onClick}"
          @keydown="${this.#onKeydown}"
        />
        <span 
          class="
            helper-text
            ${this.errorMessage ? 'invalid-text' : ''}
          "
        >
          ${this.errorMessage ? this.errorMessage : this.helperText}
        </span>
        ${this._open ? html`
          <lit-virtualizer
            scroller
            role="list listbox"
            class="${this.compact ? 'compact' : ''}"
            .items="${this.items.filter(item => Utilities.fuzzyMatch(item, this.value))}"
            .renderItem="${this.#renderItem}"
          ></lit-virtualizer>
        ` : nothing}
      </div>
    `;
  }
}
