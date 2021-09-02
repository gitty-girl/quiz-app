import React from "react";
import { Route, Redirect } from "react-router-dom";

const GuardedRoute = ({ path, children, guard, ...rest }) => {
  if (guard) {
    return <Redirect to="/" />;
  }

  return (
    <Route path={path} {...rest}>
      {children}
    </Route>
  );
};

export default GuardedRoute;
