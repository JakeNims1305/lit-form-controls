import { css, CSSResultOrNative, html, HTMLTemplateResult, LitElement } from "lit";
import { IDevelopmentView } from "./development-view.interface"
import { DevelopmentViewStyles } from "./development-view.styles";
import { FRUITS } from "../../test/mocks/fruits";

import '../../components/nims-combobox/nims-combobox-ts';

export class DevelopmentView extends LitElement implements IDevelopmentView {
  static override get styles(): CSSResultOrNative[] {
    return [
      DevelopmentViewStyles,
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
      <fieldset>
        <form>
          <nims-combobox-lit 
            required
            .items="${FRUITS}"
          >
            <div slot="label">
              Nims Combobox
            </div>
          </nims-combobox-lit>
          <div>Testing</div>
        </form>
      </fieldset>
    `;
  }
}
