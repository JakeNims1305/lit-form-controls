import {
  css,
  CSSResultOrNative,
  html,
  HTMLTemplateResult,
  LitElement,
} from 'lit';
import { ILitFormControls } from './lit-form-controls.interface';
import { LitFormControlsStyles } from './lit-form-controls.styles';
import { query } from 'lit/decorators.js';
import { Router } from '@vaadin/router';
import { routes } from './config/routes';

import './components/lit-combobox/lit-combobox-ts';

export class LitFormControls extends LitElement implements ILitFormControls {
  static override get styles(): CSSResultOrNative[] {
    return [LitFormControlsStyles, css``];
  }

  #router?: Router;

  @query('#outlet')
  outlet?: HTMLElement;

  // Lifecycle Methods -------------------------------------------------------//
  protected firstUpdated(_changedProperties: Map<PropertyKey, unknown>): void {
    this.#router = new Router(this.outlet);
    this.#router.setRoutes(routes);
  }

  // Render Methods ----------------------------------------------------------//
  override render(): HTMLTemplateResult {
    return html`
      <a href="/lit-combobox">Combobox</a>
      <main id="outlet"></main>
    `;
  }
}
