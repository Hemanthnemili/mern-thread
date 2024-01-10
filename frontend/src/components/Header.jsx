// eslint-disable-next-line no-unused-vars
import { Flex, Image } from "@chakra-ui/react";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useColorMode } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  const user = useRecoilValue(userAtom);

  return (
    <Flex justifyContent={"space-between"} mt={"6"} mb="12">
      {user && (
        <Link to={"/"}>
          <AiFillHome size={24} />
        </Link>
      )}

      <Image
        cursor={"pointer"}
        w={6}
        alt="logo"
        src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
        onClick={toggleColorMode}
      />

      {user && (
        <Link to={`/${user.username}`}>
          <RxAvatar size={24} />
        </Link>
      )}
    </Flex>
  );
}

export default Header;
