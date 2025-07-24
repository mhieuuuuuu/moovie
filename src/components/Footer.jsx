import React from "react";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    // <div className="h-[300px] w-screen flex items-center justify-center pt-4 pb-4 pl-10 pr-10 bg-surface text-white">
    //   <div class="flex flex-col gap-5 items-center">
    //     <div class="flex gap-5">
    //       <a href="#">
    //         <Facebook className="w-[40px] h-[40px] hover:text-blue-500 hover:border-blue-500 transition border-2 p-2 rounded-[50%]" />
    //       </a>
    //       <a href="#">
    //         <Twitter className="w-[40px] h-[40px] hover:text-blue-400 hover:border-blue-400 transition border-2 p-2 rounded-[50%]" />
    //       </a>
    //       <a href="#">
    //         <Instagram className="w-[40px] h-[40px] hover:text-pink-400 hover:border-pink-400 transition border-2 p-2 rounded-[50%]" />
    //       </a>
    //       <a href="#">
    //         <Youtube className="w-[40px] h-[40px] hover:text-red-500 hover:border-red-500 transition border-2 p-2 rounded-[50%]" />
    //       </a>
    //     </div>
    //     <div class="flex gap-5 text-xl">
    //       <a href="#" className="hover:text-hover">
    //         Privacy Policy
    //       </a>
    //       <a href="#" className="hover:text-hover">
    //         Terms Of Use
    //       </a>
    //       <a href="#" className="hover:text-hover">
    //         Our Company
    //       </a>
    //     </div>
    //     <div className="flex flex-col items-center gap-5">
    //       <img
    //         class="w-[100px]"
    //         src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
    //         alt="#"
    //       />
    //       <span class="text-xl">
    //         This product uses the{" "}
    //         <a
    //           class="text-[#90cea1] hover:text-[#01b4e4]"
    //           href="https://www.themoviedb.org"
    //         >
    //           TMDB
    //         </a>{" "}
    //         API but is not endorsed or certified by{" "}
    //         <a
    //           class="text-[#90cea1] hover:text-[#01b4e4]"
    //           href="https://www.themoviedb.org"
    //         >
    //           TMDB
    //         </a>
    //         .
    //       </span>
    //     </div>
    //   </div>
    // </div>
    <div className="w-screen h-[400px] relative overflow-hidden absolute">
      <img className="w-full absolute" src="./../../public/footer-bg.jpg"></img>
      <div className="absolute w-full h-full flex flex-col items-center justify-center">
        <div className="h-[300px] w-screen flex items-center justify-center pt-4 pb-4 pl-10 pr-10 bg-none text-white">
          <div class="flex flex-col gap-5 items-center">
            <div class="flex gap-5">
              <a href="#">
                <Facebook className="w-[40px] h-[40px] hover:text-blue-500 hover:border-blue-500 transition border-2 p-2 rounded-[50%]" />
              </a>
              <a href="#">
                <Twitter className="w-[40px] h-[40px] hover:text-blue-400 hover:border-blue-400 transition border-2 p-2 rounded-[50%]" />
              </a>
              <a href="#">
                <Instagram className="w-[40px] h-[40px] hover:text-pink-400 hover:border-pink-400 transition border-2 p-2 rounded-[50%]" />
              </a>
              <a href="#">
                <Youtube className="w-[40px] h-[40px] hover:text-red-500 hover:border-red-500 transition border-2 p-2 rounded-[50%]" />
              </a>
            </div>
            <div class="flex gap-5 text-xl">
              <a href="#" className="hover:text-hover">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-hover">
                Terms Of Use
              </a>
              <a href="#" className="hover:text-hover">
                Our Company
              </a>
            </div>
            <div className="flex flex-col items-center gap-5">
              <img
                class="w-[100px]"
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_1-5bdc75aaebeb75dc7ae79426ddd9be3b2be1e342510f8202baf6bffa71d7f5c4.svg"
                alt="#"
              />
              <span class="text-xl">
                This product uses the{" "}
                <a
                  class="text-[#90cea1] hover:text-[#01b4e4]"
                  href="https://www.themoviedb.org"
                >
                  TMDB
                </a>{" "}
                API but is not endorsed or certified by{" "}
                <a
                  class="text-[#90cea1] hover:text-[#01b4e4]"
                  href="https://www.themoviedb.org"
                >
                  TMDB
                </a>
                .
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
