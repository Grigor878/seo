import React from "react";
import img from '../assets/imgs/notFound.png'

// const resolveAssetUrl = (url) => {
//   return typeof window === 'undefined' ? url : `/static${url}`;
// };

const NotFound = () => {
    return (
        <section>
            <img src={img} alt="notFound" />
        </section>
    );
};

export default NotFound;
