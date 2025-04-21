import React, { useEffect, useState } from "react";
import { deletePost, getPost } from "./PostApi";

const Post = () => {
  const [data, setData] = useState([]); // Initialize as empty array since you're mapping over it
  const [loading, setLoading] = useState(true); // Optional: add loading state
  const [error, setError] = useState(null); // Optional: add error handling

  const getPostData = async () => {
    try {
      const response = await getPost();
      console.log(response.data);
      setData(response.data); // Assuming the API returns an array of posts
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostData();
  }, []); // Remove setData from dependencies array

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data.length) return <div>No posts found</div>;

  const handleDeletePost = async (idx) => {
    try {
      const res = await deletePost(idx);
      console.log(res);
      if (res.status === 200) {
        const newUpdatedPost = data.filter((curPost) => {
          return curPost.idx != idx;
        });
        setData(newUpdatedPost);
      } else {
        console.log("Failed to delete the Post:", res.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex gap-4 justify-between flex-wrap px-12 py-12 w-full ">
      {data.map((item, idx) => (
        <>
          <div
            className="flex border gap-4  w-[400px]  bg-gray-400 py-4 px-6 text-black font-semibold"
            key={item.id || idx}
          >
            <div className="flex ">
              <p>{idx + 1}</p>
              <p>.</p>
            </div>
            <div className="flex flex-col gap-3">
              <h1>{item.title}</h1>
              <p>{item.body}</p>
              <div className="flex gap-4 justify-end ">
                <p className="bg-green-700  cursor-pointer  py-2 px-6">Edit</p>
                <p
                  className="bg-red-700  cursor-pointer  py-2 px-6 "
                  onClick={() => handleDeletePost(idx + 1)}
                >
                  Delete
                </p>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};

export default Post;
