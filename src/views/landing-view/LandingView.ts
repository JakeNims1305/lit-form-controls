import { css, CSSResultOrNative, html, HTMLTemplateResult, LitElement } from "lit";
import { ILandingView } from "./landing-view.interface"
import { LandingViewStyles } from "./landing-view.styles";

export class LandingView extends LitElement implements ILandingView {
  static override get styles(): CSSResultOrNative[] {
    return [
      LandingViewStyles,
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
      Landing View
    `;
  }
}
