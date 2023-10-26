import { FormValue, SyncValidator } from "@open-wc/form-control";
import { INimsCombobox } from "./nims-combobox.interface";

export const invalidValueValidator = <SyncValidator>{
  attribute: 'value',
  key: 'badInput',
  message(instance, value) {
    return `${value} is invalid`;
  },
  isValid(instance: HTMLElement & INimsCombobox, value: FormValue) {
    console.log('Form Value:', value);
  },
};
