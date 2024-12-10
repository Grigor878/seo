import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getExchange, setBurger, setExchange, setOpenBurger } from "../../../../store/slices/homeSlice";
import { FaDollarSign } from "react-icons/fa";
import { TbCurrencyDram } from "react-icons/tb";
import { headerExchange } from "./data";
import cookies from "js-cookie";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import "./Exchange.scss";

const Exchange = () => {
  const dispatch = useDispatch();

  const exRef = useRef();

  useEffect(() => {
    dispatch(getExchange());
  }, [dispatch]);

  const { exchange } = useSelector((state => state.home))

  const [openEx, setOpenEx] = useState(false);
  const [selectedEx, setSelectedex] = useState(() => {
    const defaultEx = exchange !== 2
      ? {
        id: 1,
        symbol: <FaDollarSign className="exchange__flag" />,
      }
      : {
        id: 2,
        symbol: <TbCurrencyDram className="exchange__flag" />,
        value: "TbCurrencyDram",
      }

    const savedExId = cookies.get("selectedEx");
    return headerExchange.find((el) => el.id === (savedExId ? parseInt(savedExId) : defaultEx.id)) || defaultEx;
  });

  const handleOpenEx = () => {
    setOpenEx(!openEx)
  };

  const handleChangeEx = (id, symbol) => {
    setOpenEx(false)
    setSelectedex({ id, symbol })
    dispatch(setExchange(id))
    cookies.set("selectedEx", id)
    dispatch(setBurger("close"))
    dispatch(setOpenBurger(false))
  };

  useOutsideClick(exRef, openEx, setOpenEx)

  return (
    <div className="exchange" ref={exRef}>
      <div className="exchange__choose" onClick={handleOpenEx}>
        {selectedEx.symbol}
      </div>

      <ul
        className={!openEx ? "exchange__dropdown" : "exchange__dropdown-active"}
      >
        {headerExchange
          .filter((el) => el.id !== selectedEx.id)
          .map(({ id, symbol }) => (
            <li key={id} onClick={() => handleChangeEx(id, symbol)}>
              {symbol}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Exchange;
