import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { authenticate } from "./store/session";


// ---------------------- Components ---------------------
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import LoginFormPage from "./components/LoginFormPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import ProviderHomePage from "./components/PatientPages/ProviderHomePage";
import SinglePatientPage from "./components/PatientPages/SinglePatientPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>

          <Route path="/signup">
            <SignupFormPage />
          </Route>

          <ProtectedRoute exact path="/">
            <ProviderHomePage/>
          </ProtectedRoute>

          <ProtectedRoute exact path='/patients/:id'>
            <SinglePatientPage/>
          </ProtectedRoute>

        </Switch>
      )}
    </>
  );
}

export default App;
