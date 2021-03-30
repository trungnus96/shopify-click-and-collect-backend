import React, { memo, useState } from "react";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Link from "next/link";

// components
import SampleComponent from "../src/components/SampleComponent";
import { Button } from "@material-ui/core";

// dynamic components
const DynamicComponent = dynamic(() =>
  import("../src/components/DynamicComponent")
);

const HelloPage = styled.div`
  font-weight: 600;
`;

function Hello() {
  // hooks
  const [show_dynamic_component, toggleShowDynamicComponent] = useState(false);

  return (
    <HelloPage>
      <h1>Hello :)</h1>
      <Link href="/">
        <a>Index</a>
      </Link>
      <SampleComponent />
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={() => toggleShowDynamicComponent(true)}
      >
        Show Dynamic Component
      </Button>
      <br />
      {show_dynamic_component && <DynamicComponent />}
    </HelloPage>
  );
}

export default memo(Hello);
