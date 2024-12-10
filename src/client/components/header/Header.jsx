import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBurger, setOpenBurger } from "../../store/slices/homeSlice";
import { useMediaQuery } from "react-responsive";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/imgs/logo.png";
import Size from "./components/size/Size";
import Exchange from "./components/exchange/Exchange";
import Language from "./components/language/Language";
// import { FiPhone  } from "react-icons/fi";
import { FaPhone } from "react-icons/fa6";
import { isMainPage } from "../../helpers/utils";
import { paths } from "./data";
import { useTranslation } from "react-i18next";
import "./Header.scss";

const Header = () => {
  const { t } = useTranslation();

  const headerRef = useRef();

  const { pathname } = useLocation();
  const { language, burger, openBurger, admin } = useSelector(
    (state) => state.home
  );

  const adminTel = admin?.phone?.tel1;

  const dispatch = useDispatch();

  const mobile = useMediaQuery({ maxWidth: 768 });

  const homeCheck = pathname === `/${language}` || pathname === `/${language}/`;
  const servicesCheck = pathname?.includes("services");

  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef?.current;
      const pathCheck = pathname.split("/")[1] === language;

      if (pathCheck && window.scrollY > 0) {
        header.style.background = "#ffffff";
        header.style.borderBottom = "1px solid #e7e9f0";
      } else {
        header.style.background = "#f3f4f8";
        header.style.borderBottom = "1px solid transparent";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [language, mobile, pathname]);

  const handleBurger = () => {
    dispatch(setBurger(burger === "open" ? "close" : "open"));
    dispatch(setOpenBurger(!openBurger));
  };

  const hrefClick = () => {
    dispatch(setBurger("close"));
    dispatch(setOpenBurger(false));
  };

  // !openBurger
  //   ? (document.body.style.overflow = "auto")
  //   : (document.body.style.overflow = "hidden");

  return (
    <header
      ref={headerRef}
      className={isMainPage(pathname) && !mobile ? "header" : "header2"}
    >
      <div className="contain">
        <nav className="header__nav">
          <div className="header__left">
            <Link
              className="header__left-link"
              to={`/${language}`}
              onClick={() => window.scrollTo(0, 0)}
            >
              <img src={logo} alt="logo" />
            </Link>
          </div>

          <div
            className={`header__right ${
              openBurger ? "header__right-active" : ""
            }`}
          >
            <ul className="header__list">
              {paths?.map(({ id, name, to }) => {
                return (
                  <li key={id}>
                    {id === 1 ? (
                      homeCheck ? (
                        <a
                          href={"#services"}
                          className="header__link"
                        >
                          {t(name)}
                        </a>
                      ) : (
                        <NavLink
                          onClick={hrefClick}
                          to={to}
                          // className="header__link"
                          className={({ isActive }) =>
                            `header__link ${
                              isActive || servicesCheck ? "active" : ""
                            }`
                          }
                        >
                          {t(name)}
                        </NavLink>
                      )
                    ) : (
                      <NavLink
                        onClick={hrefClick}
                        to={to}
                        className="header__link"
                      >
                        {t(name)}
                      </NavLink>
                    )}
                  </li>
                );
              })}
            </ul>
            <Size />
            <Exchange />
            <Language />
          </div>

          {mobile && (
            <div className="header__mobile">
              {/* {adminTel && mobile && <a href={`tel:${adminTel}`}>{tel.icon}</a>} */}
              {adminTel && (
                <a href={`tel:${adminTel}`}>
                  <FaPhone />
                </a>
              )}

              <div
                className="header__burger"
                role="button"
                onClick={handleBurger}
              >
                <i className={burger}></i>
                <i className={burger}></i>
                <i className={burger}></i>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

// {/* <div className="top__header" style={{ background: "white" }}>
//         <div className="conatin">
//           <p style={{ marginBottom: "27px", padding: "9px", color: "#4a46f1", textAlign: "center", fontSize: "22px" }}>{t("remont")}</p>
//         </div>
//       </div> */}
