import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ss from "./ss.jpg";
import tt from "./tt.jpg";
import rr from "./rr.jpg";
import jj from "./jj.jpg";
import { Carousel } from "react-responsive-carousel";
import photo from "./not_found.png";

function MainContent() {
  const [projectData, setProjectData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://backend-tc-24.vercel.app/api/project/getallprojects"
        );
        setProjectData(res.data.data.data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };
    fetchData();
  }, [search == ""]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://backend-tc-24.vercel.app/api/project/search", {
        title: search,
      });
      setProjectData(res.data.data.projects);
    } catch (error) {
      console.error("Error searching projects:", error);
    }
  };

  return (
    <div className="w-full h-[90vh] flex flex-col">
      <div className="flex flex-col p-4 gap-4 w-full border overflow-y-auto min-[900px]">
        <h1 className="text-darkgreen font-semibold text-lg text-center">
          Empowering Polytechnic Communities through Shared Knowledge: Building
          Bridges, Inspiring Innovation.
        </h1>
        <section className="w-full">
          <Carousel
            axis="horizontal"
            showThumbs={false}
            autoPlay={true}
            interval={1000}
            infiniteLoop={true}
            swipeable={true}
          >
            <div>
              <img
                className="bg-black rounded-md w-full h-[200px] object-cover"
                src={ss}
                alt="Slide 1"
              />
            </div>
            <div>
              <img
                className="bg-black rounded-md w-full h-[200px] object-cover"
                src={tt}
                alt="Slide 2"
              />
            </div>
            <div>
              <img
                className="bg-black rounded-md w-full h-[200px] object-cover"
                src={rr}
                alt="Slide 3"
              />
            </div>
            <div>
              <img
                className="bg-black rounded-md w-full h-[200px] object-cover"
                src={jj}
                alt="Slide 4"
              />
            </div>
          </Carousel>
        </section>
        <section>
          <h1 className="mx-2 font-semibold text-xl text-textgreen mb-2">
            Projects
          </h1>
          <div className="flex px-2 py-1 justify-between rounded-m gap-4 w-full">
            <form onSubmit={handleSubmit} className="flex justify-end h-9 w-full">
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
                className="w-[60%] min-[800px] bg-white border h-full rounded-md px-4 focus:outline-none text-sm text-gray-600"
              />
            </form>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4">
            {projectData.length === 0 ? (
              <div className=" flex justify-center items-center">
                <img src={photo} className=" w-36 h-36" />
                <h1 className=" font-semibold">Not found</h1>
              </div>
            ) : (
              projectData.map((item, index) => (
                <ProjectCard key={index} data={item} />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default MainContent;
