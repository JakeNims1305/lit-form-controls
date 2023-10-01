import { css, CSSResult } from "lit";

export const NimsComboboxStyles: CSSResult = css`
  .combobox-container {
    display: flex;
    flex-direction: column;
  }

  input {
    
  }

  lit-virtualizer {
    border-radius: 4px;
  }

  .invalid {
    border: solid red;
  }

  .item {
    background-color: lightgray;
    padding: 0.5rem;
    width: 100%;
  }

  .item-highlighted, .item:hover {
    background-color: lightslategray;
    color: white;
  }

  .item.compact {
    padding: 0.25rem;
  }
`;
