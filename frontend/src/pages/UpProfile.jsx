import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Avatar,
  Center,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import usePreviewImg from "../hooks/usePreviewImg";

export default function UserProfileEdit() {
  const [user, setUser] = useRecoilState(userAtom);
  const showToast = useShowToast();

  showToast;

  console.log(user);
  const [inputs, setInputs] = useState({
    name: user.name,
    usernmae: user.username,
    email: user.email,
    bio: user.bio,
    profilePic: user.profilePic,
    password: "",
  });

  const fileRef = useRef(null);

  const { handleImageChange, imgUrl } = usePreviewImg();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:9696/user/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
      });
      const data = await res.json();
      console.log(data);

      // if(data.error){
      //   showToast('Error', data.error, 'error');
      //   return
      // }
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            Update Profile
          </Heading>
          <FormControl id="userName">
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar size="xl" src={imgUrl || user.profilePic} />
              </Center>
              <Center w="full">
                <Button w="full" onClick={() => fileRef.current.click()}>
                  Change Avatar
                </Button>
                <input
                  type="file"
                  onChange={handleImageChange}
                  ref={fileRef}
                  hidden
                  accept="image/*"
                />
              </Center>
            </Stack>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="User Name"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={user.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              placeholder="Full name.."
              _placeholder={{ color: "gray.500" }}
              type="text"
              id="fullname"
              value={user.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="bio"
              _placeholder={{ color: "gray.500" }}
              type="text"
              value={user.bio}
              id="bio"
              onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: "gray.500" }}
              type="password"
              id="password"
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button>
            <Button
              bg={"yellow.700"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
}
