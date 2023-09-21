import {
  css,
  CSSResultOrNative,
  html,
  HTMLTemplateResult,
  LitElement,
} from 'lit';
import { IRootBoilerplate } from './root-boilerplate.interface';
import { RootBoilerplateStyles } from './root-boilerplate.styles';
import { customElement } from 'lit/decorators.js';

@customElement('root-boilerplate-lit')
export class RootBoilerplate extends LitElement implements IRootBoilerplate {
  static override get styles(): CSSResultOrNative[] {
    return [RootBoilerplateStyles, css``];
  }

  // Component Methods -------------------------------------------------------//

  // Event Handlers ----------------------------------------------------------//

  // Lifecycle Methods -------------------------------------------------------//
  override connectedCallback(): void {
    super.connectedCallback();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  // Render Methods ----------------------------------------------------------//
  override render(): HTMLTemplateResult {
    return html`
      Go
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'root-boilerplate-lit': RootBoilerplate;
  }
}
