import React from "react";
import {
  Google,
  Facebook,
  Twitter,
  Apple,
  linkdin,
} from "../utils/images/index";
import { Link } from "react-router-dom";
import { config } from "../configs";

const SocialLinks = () => {
  const handleGoogleLogin = () => {
    window.open(`${config?.ApiBaseURL}/auth/google`, "_self");
  };
  return (
    <div className="social-links d-flex justify-content-center align-items-center gap-3">
      <Link>
        <img src={Google} alt="google " onClick={handleGoogleLogin} />
      </Link>
      <a>
        <img
          src={Facebook}
          alt="facebook"
          onClick={() =>
            window.open(`${config?.ApiBaseURL}/auth/facebook`, "_self")
          }
        />
      </a>
      <a>
        <img
          src={Twitter}
          alt="twitter"
          onClick={() =>
            window.open(`${config?.ApiBaseURL}/auth/twitter`, "_self")
          }
        />
      </a>
      {/* <a>
        <img src={Apple} alt="Apple" />
      </a> */}
      <a>
        <img
          src={linkdin}
          alt="linkdin"
          onClick={() =>
            window.open(`${config?.ApiBaseURL}/auth/linkedin`, "_self")
          }
        />
      </a>
    </div>
  );
};

export default SocialLinks;
