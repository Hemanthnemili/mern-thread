import { Flex, Spinner } from "@chakra-ui/react";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Post from "../components/Post";
import useShowToast from "../hooks/useShowToast";

function Home() {
  const toast = useShowToast();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFeed = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/post/feed");
        const data = await res.json();
        console.log(data);

        if (data.error) {
          toast("Error", data.error, "error");
          return;
        }
        setPost(data);
      } catch (error) {
        toast("Error", error, "error");
      } finally {
        setLoading(false);
      }
    };
    getFeed();
  }, [toast, setPost]);

  return (
    <>
      {!loading && post.length === 0 && (
        <h1>Follow some users to see the feed</h1>
      )}

      {loading && (
        <Flex w={"full"} justifyContent={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}

      {post.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
}

export default Home;
