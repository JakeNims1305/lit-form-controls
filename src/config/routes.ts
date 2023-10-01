import { Route } from "@vaadin/router";

export const routes: Route[] = [
  <Route>{ path: '/', component: 'landing-view-lit' },
  <Route>{ path: '/landing-view', component: 'landing-view-lit' },
  <Route>{ path: '/development-view', component: 'development-view-lit' },
  <Route>{ path: '/(.*)', component: 'landing-view-lit' }
];
