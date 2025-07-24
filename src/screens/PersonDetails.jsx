import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import ISO6391 from "iso-639-1";
import Navbar from "../components/Navbar";
import { useParams } from "react-router";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import CareerList from "../components/CareerList";
import KnownForList from "../components/KnownForList";
import Biography from "../components/Biography";
import Footer from "../components/Footer";

const PersonDetails = () => {
  const { id } = useParams();
  const [personData, setPersonData] = useState([]);
  const [socialLinks, setSocialLinks] = useState({});
  const [careerData, setCareerData] = useState({});
  const imgUrl = "https://image.tmdb.org/t/p/w500";
  const apikey = "api_key=22348bf6f06376a691526e655159ce80";
  const baseUrl = "https://api.themoviedb.org/3";

  const getGender = (a) => {
    return a === 0
      ? "Not set / not specified"
      : a === 1
      ? "Female"
      : a === 2
      ? "Male"
      : "Non-binary";
  };

  function formatDateWithAge(birthDateStr, deathDateStr = null) {
    if (!birthDateStr) return "";

    const birthDate = new Date(birthDateStr);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const birthFormatted = birthDate.toLocaleDateString("en-US", options);

    if (deathDateStr) {
      const deathDate = new Date(deathDateStr);
      const deathFormatted = deathDate.toLocaleDateString("en-US", options);

      let ageAtDeath = deathDate.getFullYear() - birthDate.getFullYear();
      const hasBirthdayPassed =
        deathDate.getMonth() > birthDate.getMonth() ||
        (deathDate.getMonth() === birthDate.getMonth() &&
          deathDate.getDate() >= birthDate.getDate());

      if (!hasBirthdayPassed) ageAtDeath--;

      return {
        birth: birthFormatted,
        death: `${deathFormatted} (died at ${ageAtDeath} years old)`,
      };
    } else {
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const hasBirthdayPassed =
        today.getMonth() > birthDate.getMonth() ||
        (today.getMonth() === birthDate.getMonth() &&
          today.getDate() >= birthDate.getDate());

      if (!hasBirthdayPassed) age--;

      return {
        birth: `${birthFormatted} (${age} years old)`,
        death: null,
      };
    }
  }
  const dateObj = formatDateWithAge(personData.birthday, personData.deathday);

  useEffect(() => {
    const getData = async (url) => {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        //   console.log(response.data.results);
        setPersonData(response.data);
      } catch (error) {
        console.error(error);
        return [];
      }
    };
    getData(baseUrl + `/person/${id}?` + apikey);
    const getSocialLinks = async (url) => {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        //   console.log(response.data.results);
        setSocialLinks(response.data);
      } catch (error) {
        console.error(error);
        return [];
      }
    };
    getSocialLinks(baseUrl + `/person/${id}/external_ids?` + apikey);
    const getCareerData = async (url) => {
      try {
        const response = await axios.get(url);
        console.log(response.data);
        //   console.log(response.data.results);
        setCareerData(response.data);
      } catch (error) {
        console.error(error);
        return [];
      }
    };
    getCareerData(baseUrl + `/person/${id}/combined_credits?` + apikey);
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="bg-background text-white pb-1 ">
        {personData && (
          <>
            <div className="relative h-[50vh] bg-cover bg-center bg-no-repeat">
              <div className="absolute inset-0 bg-black/50"></div>
              <div className="absolute bottom-0 left-0 w-full h-[100px]"></div>
            </div>

            <div className="relative max-w-[1260px] mx-auto mt-[-200px] px-8 flex items-start justify-start flex-wrap lg:flex-nowrap ">
              <div className="flex-1 hidden md:block">
                <div
                  className="bg-cover bg-center bg-no-repeat rounded-xl pt-[165%]"
                  style={{
                    backgroundImage: `url(${imgUrl + personData.profile_path})`,
                  }}
                ></div>
                <div className="flex gap-4 text-white mt-10">
                  {socialLinks.facebook_id && (
                    <a
                      href={`https://www.facebook.com/${socialLinks.facebook_id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Facebook className="hover:text-blue-500 transition" />
                    </a>
                  )}
                  {socialLinks.twitter_id && (
                    <a
                      href={`https://twitter.com/${socialLinks.twitter_id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Twitter className="hover:text-blue-400 transition" />
                    </a>
                  )}
                  {socialLinks.instagram_id && (
                    <a
                      href={`https://instagram.com/${socialLinks.instagram_id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Instagram className="hover:text-pink-400 transition" />
                    </a>
                  )}
                  {socialLinks.youtube_id && (
                    <a
                      href={`https://www.youtube.com/${socialLinks.youtube_id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Youtube className="hover:text-red-500 transition" />
                    </a>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <div className="text-white mt-10 text-xl font-bold">
                    Personal Info
                  </div>
                  <div className="flex flex-col gap-8">
                    {personData.known_for_department && (
                      <div className="">
                        <div className="text-white  text-[16px] font-bold">
                          Known for
                        </div>
                        <div className="text-white text-[16px]">
                          {personData.known_for_department}
                        </div>
                      </div>
                    )}

                    {personData.gender && (
                      <div className="">
                        <div className="text-white  text-[16px] font-bold">
                          Gender
                        </div>
                        <div className="text-white text-[16px]">
                          {getGender(personData.gender)}
                        </div>
                      </div>
                    )}

                    {dateObj.birth && (
                      <div className="">
                        <div className="text-white  text-[16px] font-bold">
                          Birthday
                        </div>
                        <div className="text-white text-[16px]">
                          {dateObj.birth}
                        </div>
                      </div>
                    )}

                    {dateObj.death && (
                      <div className="">
                        <div className="text-white  text-[16px] font-bold">
                          Deathday
                        </div>
                        <div className="text-white text-[16px]">
                          {dateObj.death}
                        </div>
                      </div>
                    )}

                    {personData.place_of_birth && (
                      <div className="mt-3">
                        <div className="text-white  text-[16px] font-bold">
                          Place of birth
                        </div>
                        <div className="text-white text-[16px]">
                          {personData.place_of_birth}
                        </div>
                      </div>
                    )}

                    {personData.also_known_as && (
                      <div className="mt-3">
                        <div className="text-white  text-[16px] font-bold">
                          Also known as
                        </div>
                        <div className="text-white text-[16px] flex flex-col gap-3">
                          {personData.also_known_as.map((name, index) => (
                            <div key={index} className="text-white text-[16px]">
                              {name}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-[70%] pl-0 md:pl-8 space-y-8">
                <div>
                  <h1 className="text-[3rem] leading-none font-bold mb-2">
                    {personData.name}
                  </h1>
                </div>

                <div>
                  <div className="text-xl mb-2 font-bold">Biography</div>
                  <Biography text={personData.biography} />
                </div>

                <KnownForList
                  title="Known For"
                  api={baseUrl + `/person/${id}/combined_credits?` + apikey}
                />

                {careerData.cast && (
                  <CareerList title="Acting" credits={careerData.cast} />
                )}

                {careerData.crew && (
                  <CareerList title="Crew" credits={careerData.crew} />
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PersonDetails;
