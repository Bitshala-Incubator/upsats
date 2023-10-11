import React, { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import NavBar from "../components/navbar";
import Select from "react-select";
import Sidebar from "../components/sidebar";
import JobDetail from "./jobDetail";
import { db, img } from "../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const optionList = [
  { value: "rust", label: "Rust" },
  { value: "javascript", label: "Javascript" },
  { value: "typescript", label: "Typescript" },
  { value: "react.js", label: "React.js" },
  { value: "angular.js", label: "Angular.js" },
];

const Main = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [companyName, setCompanyName] = useState("Bitcoin Company");
  const [companyDetails, setCompanyDetails] = useState("");
  const [position, setPosition] = useState("Front End Developer");
  const [employmentType, setEmploymentType] = useState("Full Time");
  const [role, setRole] = useState("Front End");
  const [location, setLocation] = useState("Global");
  const [skills, setSkills] = useState();
  const [imgUrl, setImgUrl] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/800px-Bitcoin.svg.png"
  );
  const [jobDescription, setJobDescription] = useState(
    "We are looking for a Front-End Web Developer who is motivated to combine the art of design with the art of programming. Responsibilities will include translation of the UI/UX design wireframes to actual code that will produce visual elements of the application. You will work with the UI/UX designer and bridge the gap between graphical design and technical implementation, taking an active role on both sides and defining how the application looks as well as how it works."
  );
  const [responsibilities, setResponsibilities] = useState("");
  const [website, setWebsite] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");

  const [disabled, setDisabled] = useState(false);

  let subtitle;

  const handleUpload = (e) => {
    console.log(e.target.files[0]);
    const imgs = ref(img, `Jobs/${v4()}`);
    uploadBytes(imgs, e.target.files[0]).then((data) => {
      console.log(data);
      getDownloadURL(data.ref).then((val) => {
        console.log(val);
        setImgUrl(val);
      });
    });
  };

  const jobsCollectionRef = collection(db, "jobs");

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleSelect(data) {
    setSkills(data);
  }

  const handlePost = async () => {
    setDisabled(true);
    try {
      await addDoc(jobsCollectionRef, {
        companyName: companyName,
        companyDetails: companyDetails,
        position: position,
        employmentType: employmentType,
        role: role,
        location: location,
        // skills: skills,
        imgUrl: imgUrl,
        jobDescription: jobDescription,
        responsibilities: responsibilities,
        website: website,
        twitter: twitter,
        linkedin: linkedin,
        github: github,
      });
      console.log("done");
      alert("Job Posted Successfully");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = () => {
    handlePost();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <div className="w-full">
            <div className="text-start p-5 border bg-white md:mx-5 rounded-xl ">
              <div>
                <div className="my-2 text-xl font-semibold">Company Name</div>

                <input
                  required
                  type="text"
                  id="default-input"
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />

                <div className="my-2 text-xl font-semibold">
                  Company Details
                </div>
                <input
                  required
                  id="message"
                  onChange={(e) => setCompanyDetails(e.target.value)}
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                />

                <div className="my-2 text-xl font-semibold">Position</div>
                <input
                  required
                  type="text"
                  onChange={(e) => setPosition(e.target.value)}
                  id="default-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />

                <div className="my-2 text-xl font-semibold">
                  {" "}
                  Employment Type
                </div>
                <div className="my-2">
                  <select
                    required
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="p-2.5 text-gray-800 bg-white border rounded-md shadow-sm w-full outline-none appearance-none focus:border-indigo-600"
                  >
                    <option>Full Time</option>
                    <option>Part Time</option>
                    <option>Contractor</option>
                    <option>Temporary</option>
                    <option>Internship</option>
                    <option>Per Diem</option>
                    <option>Volunteer</option>
                  </select>
                </div>

                <div className="my-2 text-xl font-semibold">Role</div>
                <div className="my-1">
                  <select
                    required
                    onChange={(e) => setRole(e.target.value)}
                    className="p-2.5 text-gray-800 w-full bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                  >
                    <option>Software Development</option>
                    <option>Front End</option>
                    <option>Back End</option>
                    <option>Full Stack</option>
                    <option>Sales</option>
                    <option>Marketing</option>
                    <option>Non-Tech</option>
                  </select>
                </div>

                <div className="my-2 text-xl font-semibold">Location</div>
                <div className="my-1">
                  <select
                    onChange={(e) => setLocation(e.target.value)}
                    className="p-2.5 text-gray-800 w-full bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                  >
                    <option>Global</option>
                    <option>India</option>
                    <option>Indonesia</option>
                    <option>Singapore</option>
                  </select>
                </div>

                <div className="my-2 text-xl font-semibold">Skills</div>

                <div className="flex justify-center">
                  <Select
                    className="w-full"
                    options={optionList}
                    placeholder="Select Stack"
                    value={skills}
                    onChange={handleSelect}
                    isSearchable={true}
                    isMulti
                  />
                </div>

                <div className="my-2 text-xl font-semibold">
                  Upload company logo
                </div>
                <input
                  required
                  onChange={(e) => {
                    handleUpload(e);
                  }}
                  type="file"
                  accept="image/*"
                  id="formFile"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />

                <div className="my-2 text-xl font-semibold">Website</div>

                <input
                  onChange={(e) => setWebsite(e.target.value)}
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />

                <div className="my-2 text-xl font-semibold">Twitter</div>

                <input
                  onChange={(e) => setTwitter(e.target.value)}
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />

                <div className="my-2 text-xl font-semibold">LinkedIn</div>

                <input
                  onChange={(e) => setLinkedin(e.target.value)}
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />

                <div className="my-2 text-xl font-semibold">Github</div>

                <input
                  onChange={(e) => setGithub(e.target.value)}
                  type="text"
                  id="default-input"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />

                <div className="my-2 text-xl font-semibold">
                  Job Description
                </div>
                <textarea
                  required
                  onChange={(e) => setJobDescription(e.target.value)}
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                />

                <div className="my-2 text-xl font-semibold">
                  Responsibilities and Requirements
                </div>
                <textarea
                  required
                  onChange={(e) => setResponsibilities(e.target.value)}
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                />
              </div>
              <div className="flex justify-center ">
                <div
                  className={` w-full m-5 rounded-xl max-w-lg lg:hidden mt-5`}
                >
                  <div className="bg-white border p-5 rounded-lg text-start">
                    <div className="flex flex-col text-start justify-center">
                      <div>
                        <img className="p-5 rounded-full" src={imgUrl} />
                      </div>
                      <div className="text-2xl font-semibold">{position}</div>
                      <div className="text-lg font-medium my-2">{location}</div>
                      <div className="text-lg font-medium my-2">
                        {companyName}
                      </div>

                      <div>
                        <button className={`button`}>{location}</button>
                        <button className={`button`}>{role}</button>
                        <button className={`button`}>{employmentType}</button>
                      </div>

                      <div className="border  my-2 text-md p-1 bg-[#f8fafc] font-thin rounded-lg">
                        {jobDescription}
                      </div>

                      <button
                        disabled={disabled}
                        className="border-2 text-center bg-[#8b5cf6] text-white px-4 py-2 mt-1 rounded-lg disabled:bg-[#dbd5e7]"
                        id="submit"
                        value="Submit"
                      >
                        Add Job
                      </button>
                    </div>
                  </div>

                  <div
                    className={` p-3 duration-300  flex justify-center`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:inline">
            <div className={` h-screen  duration-300 w-96  relative`}>
              <div className="bg-white p-5  border rounded-lg text-start">
                <div className="flex flex-col text-start justify-center">
                  <div>
                    <img className="p-5 rounded-full" src={imgUrl} />
                  </div>
                  <div className="text-2xl font-semibold">{position}</div>
                  <div className="text-lg font-medium my-2">{location}</div>
                  <div className="text-lg font-medium my-2">{companyName}</div>

                  <div>
                    <button className={`button`}>{location}</button>
                    <button className={`button`}>{role}</button>
                    <button className={`button`}>{employmentType}</button>
                  </div>

                  <div className="border  my-2 text-md p-1 bg-[#f8fafc] font-thin rounded-lg">
                    {jobDescription}
                  </div>

                  <button
                    disabled={disabled}
                    className="border-2 text-center bg-[#8b5cf6] text-white px-4 py-2 mt-1 rounded-lg disabled:bg-[#dbd5e7]"
                    // onClick={handlePost}
                    id="submit"
                    value="Submit"
                  >
                    Add Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

const PostJob = () => {
  return (
    <>
      <div className="mb-3 lg:mb-0">
        <NavBar />
      </div>
      <Main />
    </>
  );
};

export default PostJob;
