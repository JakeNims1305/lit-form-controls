import { beforeEach, describe, expect, test } from "vitest";
import { fixture, html } from '@open-wc/testing';
import { NimsCombobox } from "../components/nims-combobox/NimsCombobox";
import { FRUITS } from "./mocks/fruits";

import '../components/nims-combobox/nims-combobox-ts';

describe('NimsCombobox', () => {
  let element: NimsCombobox;

  beforeEach(async () => {
    element = await fixture<NimsCombobox>(html`
      <nims-combobox-lit
        name="combobox"
        compact
        .items="${FRUITS}"
      ></nims-combobox-lit>
    `);
  });

  test('should pass the a11y audit', () => {
    expect(element).to.be.accessible;
  });
});
