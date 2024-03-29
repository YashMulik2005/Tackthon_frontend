import React, { useEffect, useState } from "react";
import CollegeCard from "./CollegeCard";
import CollegeRightCard from "./CollegeRightCard";
import axios from "axios";

import not_found from "./not_found.png";

function College() {
  const [collegeData, setcollegeData] = useState([]);
  const [search, setsearch] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("https://backend-tc-24.vercel.app/api/college/serach", {
      title: search,
    });
    //console.log(res);
    setcollegeData(res.data.data.college);
  };

  const getdata = async () => {
    const res = await axios.get(
      "https://backend-tc-24.vercel.app/api/college/getAllColleges"
    );
    console.log(res.data.data.data);
    setcollegeData(res.data.data.data);
  };

  useEffect(() => {
    getdata();
  }, [search == ""]);

  return (
    <div className="w-full flex h-[90vh]">
      <div className=" flex flex-col p-2 w-full h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className=" p-4 flex justify-center">
          <input
            type="search"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            className=" w-[80%] rounded-xl py-[6px] border px-4 focus:outline-none text-gray-500 "
            placeholder="serach college"
          />
        </form>
        <h1 className=" text-darkgreen font-semibold text-xl mx-2">Colleges</h1>
        <div className=" grid grid-cols-1 min-[550px]:grid-cols-2 gap-4 p-2">
          {collegeData.length === 0 ? (
            <div className=" flex md:w-[100vh]  justify-center items-center font-semibold">
              <img src={not_found} className=" w-40 h-40" />
              <section>No Project Found</section>
            </div>
          ) : (
            collegeData.map((item, index) => (
              <CollegeCard key={index} data={item} />
            ))
          )}
        </div>
      </div>
      {/* <div className=' h-[88vh]  overflow-y-auto '>
                <h1 className='mx-2 font-semibold text-lg text-darkgreen mb-2'>Top Colleges</h1>
                <div className=' flex flex-col gap-3'>
                    <CollegeRightCard />
                </div>
            </div> */}
    </div>
  );
}

export default College;
