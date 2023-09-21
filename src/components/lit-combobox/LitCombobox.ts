import { css, CSSResultOrNative, html, HTMLTemplateResult, LitElement } from "lit";
import { ILitCombobox } from "./lit-combobox.interface"
import { LitComboboxStyles } from "./lit-combobox.styles";

export class LitCombobox extends LitElement implements ILitCombobox {
  static override get styles(): CSSResultOrNative[] {
    return [
      LitComboboxStyles,
      css``
    ];
  }

  // Lifecycle Methods -------------------------------------------------------//
  override connectedCallback(): void {
    super.connectedCallback();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  // Render ------------------------------------------------------------------//
  override render(): HTMLTemplateResult {
    return html`
      Im a combobox
    `;
  }
}
