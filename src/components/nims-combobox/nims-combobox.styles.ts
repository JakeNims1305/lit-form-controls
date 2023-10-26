import { css, CSSResult } from "lit";

export const NimsComboboxStyles: CSSResult = css`
  :host {
    --item-padding: 1rem;
    --item-padding--compact:  0.5rem;
  }

  input {
    padding: 12px 20px;
  }

  input.compact {
    padding: 8px 16px;
  }

  lit-virtualizer {
    position: relative !important;
    border-radius: 4px;
    height: 300px;
  }

  lit-virtualizer.compact {
    height: 150px;
  }

  .combobox-container {
    display: relative;
    display: flex;
    flex-direction: column;
  }

  .invalid {
    border: solid red;
  }

  .item {
    background-color: lightgray;
    padding: var(--item-padding);
    width: 100%;
  }

  .item-highlighted, .item:hover {
    background-color: lightslategray;
    color: white;
  }

  .item.compact {
    padding: var(--item-padding--compact);
  }

  .helper-text {

  }

  .invalid-text {
    color: red;
  }
`;
