// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postAtoms from "../atoms/postsAtom";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const toast = useShowToast();
  const [loading, setLoading] = useState(true);
  const [posts, setPost] = useRecoilState(postAtoms);
  const [fetchingPost, setFetchingPost] = useState(true);
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
      } finally {
        setLoading(false);
      }
    };

    const getPosts = async () => {
      setFetchingPost(true);
      try {
        const res = await fetch(`/api/post/user/${username}`);
        const data = await res.json();
        console.log(data);
        if (data.error) return toast("Error", data.error, "error");
        setPost(data);
      } catch (error) {
        toast("Error", error, "error");
        setPost([]);
      } finally {
        setFetchingPost(false);
      }
    };

    getUser();
    getPosts();
  }, [username, toast, setPost]);

  console.log("posts is here and is recoil", posts);

  if (!user && loading) {
    return (
      <Flex justifyContent={"center"} my={8}>
        <Spinner size={"xl"} />;
      </Flex>
    );
  }

  if (!user && !loading) return <h1>User not found</h1>;
  return (
    <>
      <UserHeader user={user} />

      {!fetchingPost && posts.length === 0 && <h1>User has no posts</h1>}
      {fetchingPost && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />;
        </Flex>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
};

export default UserPage;
