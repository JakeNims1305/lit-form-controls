import { Route } from "@vaadin/router";

import '../lit-form-controls-ts';

export const routes: Route[] = [
  <Route>{ path: '/', component: 'lit-combobox' },
  <Route>{ path: '/(.*)', component: 'lit-combobox'},
];
