import React, { Component } from "react";
import { Loader, Dimmer } from "semantic-ui-react";

export class Spinner extends Component {
  render() {
    return (
      <Dimmer active>
        <Loader size="huger" content={"Loading...."} />;
      </Dimmer>
    );
  }
}

export default Spinner;
