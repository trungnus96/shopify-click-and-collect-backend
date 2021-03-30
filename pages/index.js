import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Link from "next/link";

// actions
import { increaseCount } from "../src/actions/counter";

// components
import { Button } from "@material-ui/core";

const IndexPage = styled.div`
  border: 2px solid ${props => props.theme.colors.black};
  padding: 10px;
  text-align: center;
  width: 268px;
  margin: 50px auto;
`;

function Index(props) {
  // redux props
  const { counter } = props;
  const { value } = counter;

  // redux action props
  const { increaseCount } = props;

  // props
  const { from_server } = props;

  return (
    <IndexPage>
      <Link href="/hello">
        <a>Hello</a>
      </Link>
      <div>{from_server}</div>
      <h2>Counter: {value}</h2>
      <Button variant="contained" color="primary" onClick={increaseCount}>
        +
      </Button>
    </IndexPage>
  );
}

Index.getInitialProps = () => {
  // do not use React.memo
  return { from_server: "This is from server" }
}


function mapStateToProps(state) {
  const { counter } = state;
  return {
    counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      increaseCount
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
