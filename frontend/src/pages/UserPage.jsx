// eslint-disable-next-line no-unused-vars
import React from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

const UserPage = () => {
  return (
    <>
      <UserHeader />
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
