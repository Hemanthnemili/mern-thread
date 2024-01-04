// eslint-disable-next-line no-unused-vars
import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { BsThreads, BsThreeDots } from "react-icons/bs";
import Actions from "./Actions";

function Comment() {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar src="/zuck-avatar.png" size={"sm"} />
        <Flex gap={1} w={"full"} flexDirection={"column"}>
          <Flex
            justifyContent={"space-between"}
            w={"full"}
            alignItems={"center"}
          >
            <Text fontSize={"sm"} fontWeight={"bold"}>
              Randoon
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Text color={"gray.light"} fontSize={"sm"}>
                2d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text>Hey this looks graeat</Text>
          <Actions liked={liked} setLiked={setLiked} />
          <Text fontSize={"sm"} color={"gray.light"}>
            {" "}
            {100 + (liked ? 1 : 0)} likes
          </Text>
        </Flex>
      </Flex>
      <Divider my={4} />
    </>
  );
}

export default Comment;
