import React, { memo } from "react";
import styled from "styled-components";

const StyledSampleComponent = styled.div`
  color: lightsalmon;
`;

function SampleComponent() {

  return (
    <StyledSampleComponent>
      This is SampleComponent
    </StyledSampleComponent>
  );
}

export default memo(SampleComponent);
