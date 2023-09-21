import { css, CSSResultOrNative, html, HTMLTemplateResult, LitElement } from "lit";
import { INimsCombobox } from "./nims-combobox.interface"
import { NimsComboboxStyles } from "./nims-combobox.styles";

export class NimsCombobox extends LitElement implements INimsCombobox {
  static override get styles(): CSSResultOrNative[] {
    return [
      NimsComboboxStyles,
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
      Nims Combobox
    `;
  }
}
