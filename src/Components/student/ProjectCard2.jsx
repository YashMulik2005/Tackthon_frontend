import React, { useEffect, useState } from "react";
import signUpImage from "./cardImage.jpg";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { MdComment } from "react-icons/md";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import axios from "axios";
import moment from "moment";
import { useNavigate } from "react-router-dom";

function ProjectCard2({ data }) {
  const navigate = useNavigate();
  console.log(data, "sds");
  const [college_name, setcollege_name] = useState("");
  //console.log(data.allocated_college);
  const getcollege = async () => {
    const col = await axios.post(
      "https://backend-tc-24.vercel.app/api/college/onecollge",
      { college: data.allocated_college }
    );
    // console.log(col.data.data);
    setcollege_name(col.data.data);
  };

  useEffect(() => {
    // getcollege()
  }, [college_name]);

  return (
    <div className=" flex  bg-white flex-col  gap-4 rounded-lg w-full px-6 py-6 ">
      <div
        className=" grid grid-cols-1 min-[580px]:grid-cols-[auto_1fr] cursor-pointer  gap-6 justify-center">
        <img
          src={
            "https://i0.wp.com/technologysalon.org/wp-content/uploads/2019/04/artificial-intelligence.jpg?resize=640%2C429"
          }
          className="w-full min-[580px]:w-44  h-44 rounded-xl object-cover"
        />
        <div className=" flex gap-2 flex-col justify-start ">
          <div>
            <p className=" font-semibold text-md">{data.title}</p>
            <p className=' text-gray-500 text-xs'>
              <span className=' font-semibold'>Published By : </span>{data?.created_By?.fullName}</p>
            <p className="  text-gray-500 text-xs ">
              <span className=" font-semibold ">College Name : </span>
              {data?.allocated_college?.name}
            </p>
            <p className="  text-gray-500 text-xs ">
              <span className=" font-semibold ">Type : </span>
              {data?.type}
            </p>
            <p className=" text-gray-500 text-sm line-clamp-3">
              <span className=" font-semibold text-sm">Description : </span>
              {data?.description}
            </p>
          </div>

          <div className=" flex flex-col min-[500px]:flex-row justify-between text-xs text-gray-500 mt-2 items-start max-[500px]:gap-1 min-[500px]:items-end">
            <div className=" ">
              <span className=" font-semibold">Published on :</span>{" "}
              {moment(data.time).format("YYYY-MM-DD")}
            </div>
            <div className=" bg-[#57CC99] rounded-full bg-opacity-25 px-3 py-2 text-green-600  font-semibold cursor-pointer" onClick={() => {
              navigate(`/project/${data._id}`);
            }}>
              Go to Project{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard2;
