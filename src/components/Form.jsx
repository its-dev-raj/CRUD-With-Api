import React, { useState } from "react";
import { postData } from "./PostApi";

const Form = ({ data, setData }) => {
  const [adddata, setAddData] = useState({
    title: "",
    body: "",
  });

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
     
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addPostData = async () => {
    const res = await postData(adddata);
    console.log("res", res);
    if ((res.status = 200)) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addPostData();
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <div className="flex justify-center h-20 items-center">
        <div className="flex border bg-blue-900 rounded-sm p-4  shadow-lg gap-4 w-fit">
          <div>
            <label htmlFor="title"></label>
            <input
              type="text"
              autoCapitalize="off"
              id="title"
              name="title"
              placeholder="Add Title"
              value={adddata.title}
              onChange={handleInputChange}
              className=" pl-2 py-2 rounded-sm bg-white"
            />
          </div>
          <div>
            <label htmlFor="body"></label>
            <input
              type="text"
              autoCapitalize="off"
              id="body"
              name="body"
              placeholder="Add Post"
              value={adddata.body}
              onChange={handleInputChange}
              className="pl-2 py-2 rounded-sm  bg-white"
            />
          </div>
          <button className="bg-green-600 rounded-sm text-black font-semibold cursor-pointer px-2">
            ADD
          </button>
        </div>
      </div>
    </form>
  );
};

export default Form;
