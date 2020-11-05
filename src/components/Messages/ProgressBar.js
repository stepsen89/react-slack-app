// @flow strict

import * as React from 'react';
import { Progress } from 'semantic-ui-react';

//stateless component
const ProgressBar = ({ uploadState, percentUploaded }) => (
  uploadState === "uploading" && (
    <Progress
      className="progress__bar"
      percent={percentUploaded}
      indicating
      size="medium"
      inverted
      progress />
  )
);

export default ProgressBar;