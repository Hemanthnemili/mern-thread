import { Button, Flex } from "@chakra-ui/react";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Link to={`/:username`}>
      <Flex w={"full"} justifyContent={"center"}>
        <Button mx={"auto"}>Visit profile page</Button>
      </Flex>
    </Link>
  );
}

export default Home;
