import React from 'react';
import { Helmet } from 'react-helmet';
import { TITLE } from '../constants';

export const NotFound = () => {
  return (
    <div>
      <Helmet>
        <title>Not Found | {`${TITLE}`}</title>
      </Helmet>
      <h1>Not Found</h1>
    </div>
  );
}