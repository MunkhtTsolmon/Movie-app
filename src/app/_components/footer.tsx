import { Mail } from "lucide-react";
import { Phone } from "lucide-react";
export const Footer = () => {
  return (
    <footer className="bg-indigo-700 w-full h-fit mt-[10rem]  ">
      <div className="w-[89vw] h-fit  mx-auto pt-[2.5rem] sm:flex pb-[1rem]">
        <div className="w-[15.4rem] h-[5rem]">
          <div className="w-[5.75rem] flex gap-[0.3rem]">
            <div className="w-[1.25rem] h-[1.25rem]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.83366 0.666748V17.3334M13.167 0.666748V17.3334M0.666992 9.00008H17.3337M0.666992 4.83341H4.83366M0.666992 13.1667H4.83366M13.167 13.1667H17.3337M13.167 4.83341H17.3337M2.48366 0.666748H15.517C16.5203 0.666748 17.3337 1.4801 17.3337 2.48341V15.5167C17.3337 16.5201 16.5203 17.3334 15.517 17.3334H2.48366C1.48034 17.3334 0.666992 16.5201 0.666992 15.5167V2.48341C0.666992 1.4801 1.48034 0.666748 2.48366 0.666748Z"
                  stroke="#FAFAFA"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-[#FAFAFA] font-bold italic mt-[-0.2rem]">
              Movie Z
            </p>
          </div>
          <p className="text-[0.875rem] text-[#FAFAFA] font-normal mt-[0.4rem] inline">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>
        <div className="flex gap-[6rem] sm:ml-[10vw] xl:ml-[44vw]">
          <div className="w-fit">
            <p className="text-[0.875rem] text-[#FAFAFA]">
              Contact Information
            </p>
            <div className="flex gap-[0.5rem] items-center mt-[0.75rem]">
              <Mail className="w-[1rem] h-[1rem] text-[#FAFAFA]" />
              <div>
                <p className="text-[#FAFAFA] font-medium text-[0.875rem]">
                  Email:
                </p>
                <p className="text-[#FAFAFA] text-[0.875rem]">
                  support@movieZ.com
                </p>
              </div>
            </div>
            <div className="flex gap-[0.5rem] items-center mt-[1.5rem]">
              <Phone className="w-[1rem] h-[1rem] text-[#FAFAFA]" />
              <div>
                <p className="text-[#FAFAFA] font-medium text-[0.875rem]">
                  Phone:
                </p>
                <p className="text-[#FAFAFA] text-[0.875rem]">
                  +976 (11) 123-4567
                </p>
              </div>
            </div>
          </div>
          <div className="w-fit sm:ml-[-10vw] md:ml-auto">
            <p className="text-[#FAFAFA] text-[0.875rem] font-normal">
              Follow us
            </p>
            <div className="sm:flex gap-[0.75rem] mt-[0.4rem]">
              <p className="text-[#FAFAFA] text-[0.875rem] font-semibold">
                Facebook
              </p>
              <p className="text-[#FAFAFA] text-[0.875rem] font-semibold">
                Instagram
              </p>
              <p className="text-[#FAFAFA] text-[0.875rem] font-semibold">
                Twitter
              </p>
              <p className="text-[#FAFAFA] text-[0.875rem] font-semibold">
                Youtube
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
