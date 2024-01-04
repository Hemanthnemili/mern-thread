// eslint-disable-next-line no-unused-vars
import { Avatar, Box, Container, Flex, Image, Text } from "@chakra-ui/react";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Actions from "./Actions";

// eslint-disable-next-line react/prop-types
function UserPost({ likes, replies, postImg, postTitle }) {
  const [liked, setLiked] = useState(false);
  return (
    <Link to={"/hemanth/post/1"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} align={"center"}>
          <Avatar size="md" name="zuckberg" src="/zuck-avatar.png" />
          <Box w="1px" h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size={"xs"}
              name="john"
              position={"absolute"}
              src="https://bit.ly/dan-abramov"
              top={"0px"}
              left={"15px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="john"
              position={"absolute"}
              src="https://bit.ly/kent-c-dodds"
              bottom={"0px"}
              right={"-5px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="john"
              position={"absolute"}
              src="https://bit.ly/code-beast"
              bottom={"0px"}
              left={"5px"}
              padding={"2px"}
            />
          </Box>
        </Flex>

        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"sm"} fontWeight={"bold"}>
                hemanth
              </Text>
              <Image src="/verified.png" alt="verified" w={4} h={4} ml={1} />
            </Flex>

            <Flex gap={4} alignItems={"center"}>
              <Text color={"gray.light"} fontStyle={"sm"}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>

          <Text fontSize={"sm"}>{postTitle}</Text>
          <Box
            borderRadius={6}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"gray.light"}
          >
            <Image src={postImg} w={"full"} />
          </Box>

          <Flex gap={3} my={1}>
            {" "}
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>

          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
              {replies} replies
            </Text>
            <Box w={"1"} h={"1"} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text fontSize={"sm"} color={"gray.light"}>
              {likes} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
}

export default UserPost;
