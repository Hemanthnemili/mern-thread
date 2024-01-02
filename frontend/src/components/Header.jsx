// eslint-disable-next-line no-unused-vars
import { Flex, Image } from "@chakra-ui/react";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useColorMode } from "@chakra-ui/react";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex justifyContent={"center"} mt={"6"} mb="12">
      <Image
        cursor={"pointer"}
        w={6}
        alt="logo"
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
      />
    </Flex>
  );
}

export default Header;
