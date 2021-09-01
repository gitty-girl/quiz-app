import { Switch, Route, Redirect } from "react-router-dom";

import { useState } from "react";

import { ROUTES } from "./config/routes";

import { Home, Result, Quiz, NotFound } from "./pages";

const Routes = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const [score, setScore] = useState(0);

  return (
    <div className="container">
      <Switch>
        <Route path={ROUTES.HOME} exact>
          <Home
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
          />
        </Route>

        <Route path={ROUTES.QUIZ}>
          <Quiz
            selectedCategory={selectedCategory}
            selectedDifficulty={selectedDifficulty}
            score={score}
            setScore={setScore}
          />
        </Route>

        <Route path={ROUTES.RESULT}>
          <Result score={score} />
        </Route>

        <Route path={ROUTES.NOT_FOUND} component={NotFound} />

        <Route render={() => <Redirect to="/not-found" />} />

        <Route
          render={() => (
            <Redirect to={ROUTES.NOT_FOUND}>
              <NotFound />
            </Redirect>
          )}
        />
      </Switch>
    </div>
  );
};

export default Routes;
