import { Button, useToast } from "@chakra-ui/react";
// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";

function Logoutbtn() {
  const setUser = useSetRecoilState(userAtom);
  const toast = useToast();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:9696/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          duration: 3000,
          isClosable: true,
        });
      }

      localStorage.removeItem("user-threads");
      setUser(null);

      toast({
        title: "Success",
        description: "User logged out successfully",
        duration: 3000,
        isClosable: true,
      });

      navigate("/auth");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Button
        position={"fixed"}
        top={"30px"}
        right={"30px"}
        size={"sm"}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </>
  );
}

export default Logoutbtn;
