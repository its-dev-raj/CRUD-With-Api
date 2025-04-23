import React, { useEffect, useState } from "react";
import { deletePost, getPost } from "./PostApi";
import Form from "./Form";

const Post = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPostData = async () => {
    try {
      const response = await getPost();
      setData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      const newUpdatedPost = data.filter((curPost) => {
        return curPost.id !== postId;
      });
      setData(newUpdatedPost);
    } catch (error) {
      console.log(error);
      setError("Failed to delete the post");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data.length) return <div>No posts found</div>;

  return (
    <>
      <Form data={data}  setData={setData} />
      <div className="flex gap-4 justify-between flex-wrap px-12 py-12 w-full">
        {data.map((item) => (
          <div
            className="flex border gap-4 w-[400px] bg-gray-400 py-4 px-6 text-black font-semibold"
            key={item.id}
          >
            <div className="flex">
              <p>{item.id}</p>
              <p>.</p>
            </div>
            <div className="flex flex-col gap-3">
              <h1>{item.title}</h1>
              <p>{item.body}</p>
              <div className="flex gap-4 justify-end">
                <p className="bg-green-700 cursor-pointer py-2 px-6">Edit</p>
                <p
                  className="bg-red-700 cursor-pointer py-2 px-6"
                  onClick={() => handleDeletePost(item.id)}
                >
                  Delete
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Post;
