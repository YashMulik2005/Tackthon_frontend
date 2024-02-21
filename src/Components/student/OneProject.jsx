import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import themeHook from "../Context";
import toast from "react-hot-toast";
function OneProject() {
  const [projectdata, setProjectdata] = useState([]);
  const [collegename, setcollegename] = useState("");
  const [Dptname, setDptgename] = useState("");
  const { token, userDetails } = themeHook();
  const { id } = useParams();
  console.log(id);

  const getProjectdata = async () => {
    const res = await axios.post(
      "http://localhost:8000/api/project/getoneproject",
      { project_id: id }
    );
    console.log(res?.data?.data?.data[0]);
    setProjectdata(res?.data?.data?.data[0]);
    //console.log(projectdata);
  };
  const save = async () => {
    const { data } = await axios.post(
      "http://localhost:8000/api/save/add",
      {
        project_id: id,
        user_id: userDetails._id,
      },
      {
        headers: {
          authentication: `Bearer ${token}`,
        },
      }
    );
    if (data.data.status) {
      toast.success("saved succesfully");
    }
    console.log(data);
  };
  useEffect(() => {
    getProjectdata();
  }, []);

  return (
    <div className=" sm:h-[90vh] flex justify-center">
      <div className="p-4 bg-white flex flex-col gap-2  m-3 rounded-md h-[95%] py-2 border w-[90%] overflow-y-auto">
        <h1 className=" font-semibold text-xl">{projectdata?.title}</h1>
        <section className=" flex gap-5">
          <h1 className=" text-sm text-gray-500">
            <span className=" font-semibold">Type: </span>
            {projectdata?.type}
          </h1>
          <h1 className=" text-sm text-gray-500">
            <span className=" font-semibold">posted at: </span>{" "}
            {moment(projectdata?.time).format("YYYY-MM-DD")}
          </h1>
        </section>
        <img
          src={projectdata?.multimedia}
          className=" w-[100%] h-[400px] rounded-lg border"
        />
        <h1 className=" font-semibold">Description :</h1>
        <h1 className=" text-md text-gray-500">{projectdata?.description}</h1>
        <h1 className=" font-semibold">Contibuters :</h1>
        <h1 className=" text-md text-gray-500">{projectdata?.contributers}</h1>
        <h1 className=" font-semibold">collage name : </h1>
        <h1 className=" text-md text-gray-500">
          {projectdata?.allocated_college?.name}
        </h1>
        <h1 className=" font-semibold">Department name : </h1>
        <h1 className=" text-md text-gray-500">
          {projectdata?.allocated_department?.name}
        </h1>
        <h1 className=" font-semibold">Live Demo : </h1>
        <a href={projectdata?.live_demo} className=" text-md text-blue-500">
          {projectdata?.live_demo}
        </a>
      </div>
    </div>
  );
}

export default OneProject;
