import React from 'react';
import './App.css';
import { useReactiveVar } from '@apollo/client';
import { isLoggedInVar } from './apollo';
import { LoggedOutRouter } from './routers/logged-out-router';
import { LoggedInRouter } from './routers/logged-in-router';

function App() {
  const isLoggedIn: boolean = useReactiveVar(isLoggedInVar);
  return (
    isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />
  );
}

export default App;
