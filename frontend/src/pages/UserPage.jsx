// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const toast = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/profile/${username}`);
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
  }, [username, toast]);

  if (!user) return null;
  return (
    <>
      <UserHeader user={user} />
      <UserPost
        likes={1200}
        replies={481}
        postImg="/post1.png"
        postTitle="Lets talk about threads"
      />
      <UserPost
        likes={128}
        replies={48}
        postImg="/post2.png"
        postTitle="Nice Tutorial"
      />
      <UserPost
        likes={190}
        replies={81}
        postImg="/post3.png"
        postTitle="I love this guy"
      />
      <UserPost likes={1700} replies={18} postTitle="Lets talk about threads" />
    </>
  );
};

export default UserPage;
