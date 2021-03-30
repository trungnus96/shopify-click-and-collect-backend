import React, { memo } from "react";
import styled from "styled-components";

import { Button } from "@material-ui/core";

const StyledDynamicComponent = styled.div`
  margin-top: 68px;
  color: lightskyblue;
  font-size: 20px;
  font-weight: 500;
`;

function DynamicComponent() {

  return (
    <StyledDynamicComponent>
      <h2>This is DynamicComponent</h2>
      <Button variant="contained" color="primary">
        Click me!
      </Button>
    </StyledDynamicComponent>
  );
}

export default memo(DynamicComponent);
