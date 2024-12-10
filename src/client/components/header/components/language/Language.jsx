import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  setBurger,
  setLanguage,
  setOpenBurger,
} from "../../../../store/slices/homeSlice";
import { languageData } from "./data";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import cookies from "js-cookie";
import Flag from "react-world-flags";
import { setPage } from "../../../../store/slices/viewSlice";
import { useNavigate } from "react-router-dom";
import "./Language.scss";

const Language = () => {
  const { i18n } = useTranslation();

  const lngRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openLng, setOpenLng] = useState(false);
  const [selectedLng, setSelectedLng] = useState(
    cookies.get("lngFlag") || "am"
  );

  const handleOpenLng = () => {
    setOpenLng(!openLng);
  };

  const handleChangeLng = (code) => {
    setOpenLng(false);
    i18n.changeLanguage(code);
    code === "en" ? setSelectedLng("gb") : setSelectedLng(code);
    code === "en" ? cookies.set("lngFlag", "gb") : cookies.set("lngFlag", code);
    cookies.set("i18next", code);
    dispatch(setLanguage(code));
    dispatch(setBurger("close"));
    dispatch(setOpenBurger(false));
    dispatch(setPage("result"));
    
    const currentPath = window.location.pathname;

    const pathParts = currentPath.split("/");
    pathParts[1] = code; 

    const newPath = pathParts.join("/");
    navigate(newPath, { replace: true });
  };

  useOutsideClick(lngRef, openLng, setOpenLng);

  return (
    <div className="language" ref={lngRef}>
      <div className="language__choose" onClick={handleOpenLng}>
        <Flag code={selectedLng} width="18" height="14" />
      </div>

      <ul
        className={
          !openLng ? "language__dropdown" : "language__dropdown-active"
        }
      >
        {languageData
          .filter((el) => el.country_code !== selectedLng)
          .map(({ code, country_code }) => (
            <li key={code} onClick={() => handleChangeLng(code)}>
              <Flag
                // onClick={() => handleChangeLng(code)}
                code={country_code}
                width="18"
                height="14"
              />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Language;
