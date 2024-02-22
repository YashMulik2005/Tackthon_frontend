import React, { useEffect, useState } from "react";
import themeHook from "../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import not_found from "./not_found.png";
import photo from "./profilebanner.jpg";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { FaRegCircleUser } from "react-icons/fa6";

function Profile() {
  const { userDetails, loadingMain, setLoadingMain, setUserDetails, setToken } = themeHook();
  const [pr, setpr] = useState([]);
  const navigate = useNavigate();

  const getuserproject = async () => {
    try {
      const { data } = await axios.post(
        "https://backend-tc-24.vercel.app/api/auth/getuprojects",
        {
          user: userDetails._id,
        }
      );
      console.log(data);
      setpr(data.data);
    } catch (error) { }
  };

  const handleLogOut = async () => {
    setLoadingMain(true);
    try {
      setUserDetails(null);
      localStorage.removeItem("userDetails");
      localStorage.removeItem("userType");
      const token = Cookies.get("token");
      if (token) {
        Cookies.remove("token");
        setToken("");
      }
      toast.success("Logout Successfully");
      window.location.reload();
    } catch (err) {
      toast.error(err.message || "An error occurred");
    }
    setLoadingMain(false);
  };

  useEffect(() => {
    getuserproject();
  }, []);

  return (
    <div className=" md:h-[90vh] bg-[#f5f5f5] md:border-none relative">
      <img className=" h-40 w-[100%]" src={photo} />
      <div className=" grid grid-cols-1 md:grid-cols-[35%_1fr] gap-4 p-4 absolute top-20 w-[100%] md:h-[85%] ">
        <div className=" bg-white rounded-lg p-3 flex gap-2 flex-col items-center border md:border-none">
          <section>
            <FaRegCircleUser size={55} className=" text-green-700" />
          </section>
          <h1 className=" font-semibold">{userDetails?.username}</h1>

          <div className=" border w-full "></div>
          <div className=" flex flex-col justify-center items-start gap-3 mt-5">
            <section className="border w-60 px-5 py-[5px] rounded-3xl bg-[#f5f5f5]">
              <h1 className=" text-sm font-semibold">name:</h1>
              <h1>{userDetails?.fullName}</h1>
            </section>
            <section className="border w-60 px-5 py-[4px] rounded-3xl bg-[#f5f5f5]">
              <h1 className=" text-sm font-semibold">email:</h1>
              <h1>{userDetails?.email}</h1>
            </section>
            <section className="border w-60 px-5 py-[4px] rounded-3xl bg-[#f5f5f5]">
              <h1 className=" text-sm font-semibold">mobile:</h1>
              <h1>{userDetails?.mobileNo}</h1>
            </section>
            <button onClick={handleLogOut} className=" text-md bg-darkgreen font-semibold w-full text-white  mx-2px-4 py-[5px] rounded-3xl
            ">Log out</button>
          </div>
        </div>
        <div className=" bg-white rounded-lg h-[100%] overflow-y-auto p-5">
          <h1 className=" font-semibold text-darkgreen">Your Projects</h1>
          <div className=" md:p-3 flex flex-col gap-2">
            {pr.length === 0 ? (
              <div className=" flex   justify-center items-center font-semibold">
                <img src={not_found} className=" w-40 h-40" />
                <section>No Project Found</section>
              </div>
            ) : (
              pr.map((item, index) => (
                <div
                  key={index}
                  className=" grid grid-cols-1 min-[580px]:grid-cols-[auto_1fr] rounded-lg  gap-4 justify-center bg-[#f5f5f5] p-3"
                >
                  <img
                    src={item.multimedia[0]}
                    className="w-full min-[580px]:w-28  h-28 rounded-xl object-cover"
                  />
                  <div className=" flex gap-2 flex-col justify-start ">
                    <div>
                      <p className=" font-semibold text-xl">{item.title}</p>
                    </div>

                    <div className=" line-clamp-2 text-sm">
                      {item.description}
                    </div>

                    <div className=" text-xs">
                      <span className=" font-semibold">Published on :</span>
                      {item.time}
                    </div>
                    <div
                      onClick={() => {
                        navigate(`/project/${item._id}`);
                      }}
                      className="text-xs bg-[#57CC99] w-28 rounded-full bg-opacity-25 px-2 py-1 text-green-600 text-center font-semibold"
                    >
                      Go to Project
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
