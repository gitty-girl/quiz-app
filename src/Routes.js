import { Switch, Route, Redirect } from "react-router-dom";

import { useState } from "react";

import { ROUTES } from "./config/routes";

import { Settings, Result, Quiz, NotFound } from "./pages";

function Routes() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const [score, setScore] = useState(0);

  return (
    <Switch>
      <Route path={ROUTES.SETTINGS} exact>
        <Settings
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

      <Route
        render={() => (
          <Redirect to={ROUTES.NOT_FOUND}>
            <NotFound />
          </Redirect>
        )}
      />
    </Switch>
  );
}

export default Routes;
