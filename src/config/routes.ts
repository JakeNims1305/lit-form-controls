import { Route } from "@vaadin/router";

export const routes: Route[] = [
  <Route>{ path: '/', component: 'landing-view-lit' },
  <Route>{ path: '/landing-view', component: 'landing-view-lit' },
  <Route>{ path: '/nims-combobox', component: 'nims-combobox-lit' },
  <Route>{ path: '/(.*)', component: 'landing-view-lit' }
];
