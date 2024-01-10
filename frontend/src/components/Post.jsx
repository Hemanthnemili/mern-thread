/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { Avatar, Box, Container, Flex, Image, Text } from "@chakra-ui/react";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import Actions from "./Actions";
import useShowToast from "../hooks/useShowToast";
import { formatDistanceToNow } from "date-fns";

// eslint-disable-next-line react/prop-types
function Post({ post, postedBy }) {
  const [user, setUser] = useState(null);
  const toast = useShowToast();
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/user/profile/" + postedBy);
        const data = await res.json();
        console.log(data);
        if (data.error) {
          toast("Error", data.error, "error");
          return;
        }
        setUser(data);
      } catch (error) {
        toast("Error", error, "error");
      }
    };
    getUser();
  }, [postedBy, toast]);

  if (!user) return null;

  console.log(user);

  return (
    <Link to={`/${user.username}/post/${post._id}`}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} align={"center"}>
          <Avatar
            size="md"
            name={user.name}
            src={user.profilePic}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${user.username}`);
            }}
          />
          <Box w="1px" h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            {post.replies.length === 0 && <Text textAlign={"center"}>🤣</Text>}
            {post.replies[0] && (
              <Avatar
                size={"xs"}
                name="john"
                position={"absolute"}
                src={post.replies[0].userProfilePic}
                top={"0px"}
                left={"15px"}
                padding={"2px"}
              />
            )}

            {post.replies[1] && (
              <Avatar
                size={"xs"}
                name="john"
                position={"absolute"}
                src={post.replies[1].userProfilePic}
                top={"0px"}
                left={"15px"}
                padding={"2px"}
              />
            )}
            {post.replies[2] && (
              <Avatar
                size={"xs"}
                name="john"
                position={"absolute"}
                src={post.replies[2].userProfilePic}
                top={"0px"}
                left={"15px"}
                padding={"2px"}
              />
            )}
          </Box>
        </Flex>

        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text
                fontSize={"sm"}
                fontWeight={"bold"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${user.username}`);
                }}
              >
                {user.username}
              </Text>
              <Image src="/verified.png" alt="verified" w={4} h={4} ml={1} />
            </Flex>

            <Flex gap={4} alignItems={"center"}>
              <Text
                color={"gray.light"}
                fontSize={"sm"}
                width={36}
                textAlign={"right"}
              >
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </Text>
            </Flex>
          </Flex>

          <Text fontSize={"sm"}>{post.text}</Text>
          <Box
            borderRadius={6}
            overflow={"hidden"}
            border={"1px solid"}
            borderColor={"gray.light"}
          >
            <Image src={post.img} w={"full"} />
          </Box>

          <Flex gap={3} my={1}>
            <Actions post={post} />
          </Flex>

          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
              {post.replies.length} replies
            </Text>
            <Box w={"1"} h={"1"} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text fontSize={"sm"} color={"gray.light"}>
              {post.likes.length} likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
}

export default Post;
