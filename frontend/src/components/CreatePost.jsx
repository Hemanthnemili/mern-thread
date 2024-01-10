/* eslint-disable no-unused-vars */
import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Input,
  Text,
  Textarea,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import usePreviewImg from "../hooks/usePreviewImg";
import { BsFillImageFill } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { json } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";

const MAX_CAR = 500;

function CreatePost() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [postText, setPostText] = useState("");
  const imgref = useRef(null);
  const [remainChar, setRemainChar] = useState(MAX_CAR);
  const [loading, setLoading] = useState(false);
  const toast = useShowToast();
  const user = useRecoilValue(userAtom);

  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();

  const handleText = (e) => {
    const text = e.target.value;
    if (text.length > MAX_CAR) {
      const truncatedText = text.slice(0, MAX_CAR);
      setPostText(truncatedText);
      setRemainChar(0);
    } else {
      setPostText(text);
      setRemainChar(MAX_CAR - text.length);
    }
  };

  const handleCreatePost = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postedBy: user._id,
          text: postText,
          img: imgUrl,
        }),
      });

      const data = await res.json();

      if (data.error) {
        toast("Error", data.error, "error");
        return;
      }

      toast("Success", "Post created successfully", "success");
      onClose();
      setImgUrl("");
      setPostText("");
    } catch (error) {
      toast("Error", error, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        position={"fixed"}
        bottom={10}
        right={10}
        leftIcon={<AddIcon />}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
      >
        post
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post </ModalHeader>
          <ModalCloseButton />
          <ModalBody py={6}>
            <FormControl>
              <Textarea
                placeholder="Post content goes here"
                onChange={handleText}
                value={postText}
              />

              <Text
                fontWeight={"bold"}
                fontSize={"sm"}
                textAlign={"right"}
                m={"1"}
                color={"red.800"}
              >
                {remainChar}/{MAX_CAR}
              </Text>

              <Input
                type="file"
                hidden
                ref={imgref}
                onChange={handleImageChange}
              />
              <BsFillImageFill
                style={{ marginLeft: "5px", cursor: "pointer" }}
                size={16}
                onClick={() => imgref.current.click()}
              />
            </FormControl>

            {imgUrl && (
              <Flex mt={5} w={"full"} position={"relative"}>
                <Image src={imgUrl} alt="selected Image" />
                <CloseButton
                  onClick={() => setImgUrl("")}
                  bg={"gray.800"}
                  position={"absolute"}
                  top={2}
                  right={2}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreatePost}
              isLoading={loading}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreatePost;
