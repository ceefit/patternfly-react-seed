import * as React from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { accessibleRouteChangeHandler } from '@app/utils/utils';
import { Readme } from '@app/Readme/Readme';
import { NotFound } from '@app/NotFound/NotFound';
import { useDocumentTitle } from '@app/utils/useDocumentTitle';
import { LastLocationProvider, useLastLocation } from 'react-router-last-location';
import { TimeSeriesPage } from '@app/TimeseriesPage/TimeSeriesPage';
import { PatternflyChartPage } from '@app/PatternflyChartPage/PatternflyChartPage';
import { VictoryChartsPage } from '@app/VictoryChartsPage/VictoryChartsPage';

let routeFocusTimer: number;

export interface IAppRoute {
  label?: string;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  exact?: boolean;
  path: string;
  title: string;
  isAsync?: boolean;
}

const routes: IAppRoute[] = [
  {
    component: Readme,
    exact: true,
    label: 'Readme',
    path: '/',
    title: 'Readme'
  },
  {
    component: PatternflyChartPage,
    exact: true,
    isAsync: true,
    label: 'Patternfly Chart',
    path: '/patternfly-chart',
    title: 'Patternfly Chart'
  },
  {
    component: TimeSeriesPage,
    exact: true,
    isAsync: true,
    label: 'Time Series Chart',
    path: '/timeseries-chart',
    title: 'Time Series Chart'
  },
  {
    component: VictoryChartsPage,
    exact: true,
    isAsync: true,
    label: 'Victory Chart',
    path: '/victory-chart',
    title: 'Victory Chart'
  }
];

// a custom hook for sending focus to the primary content container
// after a view has loaded so that subsequent press of tab key
// sends focus directly to relevant content
const useA11yRouteChange = (isAsync: boolean) => {
  const lastNavigation = useLastLocation();
  React.useEffect(() => {
    if (!isAsync && lastNavigation !== null) {
      routeFocusTimer = accessibleRouteChangeHandler();
    }
    return () => {
      clearTimeout(routeFocusTimer);
    };
  }, [isAsync, lastNavigation]);
}

const RouteWithTitleUpdates = ({
  component: Component,
  isAsync = false,
  title,
  ...rest
}: IAppRoute) => {
  useA11yRouteChange(isAsync);
  useDocumentTitle(title);

  function routeWithTitle(routeProps: RouteComponentProps) {
    return (
      <Component {...rest} {...routeProps} />
    );
  }

  return <Route render={routeWithTitle} />;
};

const PageNotFound = ({ title }: { title: string }) => {
  useDocumentTitle(title);
  return <Route component={NotFound} />;
}

const AppRoutes = () => (
  <LastLocationProvider>
    <Switch>
      {routes.map(({ path, exact, component, title, isAsync }, idx) => (
        <RouteWithTitleUpdates
          path={path}
          exact={exact}
          component={component}
          key={idx}
          title={title}
          isAsync={isAsync}
        />
      ))}
      <PageNotFound title="404 Page Not Found" />
    </Switch>
  </LastLocationProvider>
);

export { AppRoutes, routes };
