import React, { useRef, useState } from "react";
import cookies from 'js-cookie'
import { useDispatch, useSelector } from "react-redux";
import { setBurger, setOpenBurger, setSize } from "../../../../store/slices/homeSlice";
import { sizeData } from "./data";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import "./Size.scss";

const Size = () => {
  const dispatch = useDispatch();

  const sizeRef = useRef();

  const { size } = useSelector((state => state.home))

  const [openSize, setOpenSize] = useState(false)
  const [selectedSize, setSelectedSize] = useState(() => {
    const defaultSize = size === 1
      ? {
        id: 1,
        icon: (
          <p className="size__unit">
            m<sup>2</sup>
          </p>
        ),
      }
      : {
        id: 2,
        icon: (
          <p className="size__unit">
            ft<sup>2</sup>
          </p>
        ),
      };

    const savedSizeId = cookies.get("selectedSize");
    return sizeData.find((el) => el.id === (savedSizeId ? parseInt(savedSizeId) : defaultSize.id)) || defaultSize;
  });

  const handleChangeSize = (id, icon) => {
    setOpenSize(false);
    setSelectedSize({ id: id, icon: icon });
    dispatch(setSize(id))
    cookies.set("selectedSize", id);
    dispatch(setBurger("close"))
    dispatch(setOpenBurger(false))
  };

  useOutsideClick(sizeRef, openSize, setOpenSize)

  return (
    <div className="size" ref={sizeRef}>
      <div className="size__choose" onClick={() => setOpenSize(!openSize)}>
        {selectedSize.icon}
      </div>

      <ul className={!openSize ? "size__dropdown" : "size__dropdown-active"}>
        {sizeData
          .filter((el) => el.id !== selectedSize.id)
          .map(({ id, icon }) => (
            <li key={id} onClick={() => handleChangeSize(id, icon)}>
              {icon}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Size;
