// import express from "express";
// import { StaticRouter } from "react-router-dom/server";
// import ReactDOMServer from "react-dom/server";
// import App from "../client/components/App";
// import fs from "fs";

// const app = express();
// const baseUrl =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:3001/seo"
//     : "https://aparto.am/seo";
// const PORT = process.env.PORT || 3001;

// app.use("/assets", express.static(`${__dirname}/../client/assets/imgs`));
// app.use("/static", express.static(__dirname));

// const getMetaTagsForRoute = (location) => {
//   let title = "";
//   let description = "";
//   let image = `${baseUrl}/assets/logo.png`;

//   if (location === "/seo/") {
//     title = "Home Page Title";
//     description = "Welcome to the home page. Here is some description for SEO.";
//     image = `${baseUrl}/assets/logo.png`;
//   } else if (location === "/seo/about") {
//     title = "About Page Title";
//     description = "Learn more about us on the about page.";
//     image =
//       "https://media.istockphoto.com/id/1131028789/photo/portrait-of-a-man-taking-photos-with-camera-reflex-against-the-sunset.jpg?s=612x612&w=0&k=20&c=x3o-3VilVuIXVpLhj_z9oGl5ufp5f0ymhRc9taSDsYU=";
//   } else if (location === "/seo/contact-us") {
//     title = "Contact Us Title";
//     description = "Contact with us visiting contact us page.";
//     image =
//       "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg";
//   }

//   return {
//     title,
//     description,
//     image,
//   };
// };

// const createReactApp = async (req) => {
//   const location = req.url;
//   const url = req.protocol + "://" + req.get("host") + location;

//   const { title, description, image } = getMetaTagsForRoute(location);

//   const reactApp = ReactDOMServer.renderToString(
//     <StaticRouter location={location}>
//       <App />
//     </StaticRouter>
//   );

//   const htmlTemplate = await fs.promises.readFile(
//     `${__dirname}/index.html`,
//     "utf-8"
//   );

//   const finalHtml = htmlTemplate
//     .replace(/{{title}}/g, title)
//     .replace(/{{description}}/g, description)
//     .replace(/{{image}}/g, image)
//     .replace(/{{imageAlt}}/g, title)
//     .replace(/{{url}}/g, url)
//     .replace("{{reactApp}}", reactApp);

//   return finalHtml;
// };

// app.get("*", async (req, res) => {
//   try {
//     const indexHtml = await createReactApp(req);
//     res.status(200).send(indexHtml);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error rendering the page.");
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });

import express from "express";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Provider } from "react-redux";
import store from "../client/store/store";
import View from "../client/view/View";
import fs from "fs";
//
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import cookies from "js-cookie";
import { languages } from "../client/services/i18next/data";

const app = express();
const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3001/seo"
    : "https://aparto.am/seo";
const PORT = process.env.PORT || 3001;

app.use("/locales", express.static(`${__dirname}/../client/locales`));
app.use("/assets", express.static(`${__dirname}/../client/assets/imgs`));
app.use("/static", express.static(__dirname));

//
i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: cookies.get("i18next") || "am",
    supportedLngs: languages,
    debug: false,
    detection: {
      order: ["cookie", "path", "htmlTag"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
    react: { useSuspense: false },
  });
//

const createReactApp = async (req, title, description, image) => {
  const location = req.url;
  const url = req.protocol + "://" + req.get("host") + location;

  const reactApp = ReactDOMServer.renderToString(
    <StaticRouter location={location}>
      <Provider store={store}>
        <View />
      </Provider>
    </StaticRouter>
  );

  const htmlTemplate = await fs.promises.readFile(
    `${__dirname}/index.html`,
    "utf-8"
  );

  const finalHtml = htmlTemplate
    .replace(/{{title}}/g, title)
    .replace(/{{description}}/g, description)
    .replace(/{{image}}/g, image)
    .replace(/{{imageAlt}}/g, title)
    .replace(/{{url}}/g, url)
    .replace("{{reactApp}}", reactApp)
    .replace(
      "{{styles}}",
      "<link rel='stylesheet' type='text/css' href='./styles.css' />"
    );
  return finalHtml;
};

app.get("/seo/", async (req, res) => {
  try {
    const title = "Home Page Title";
    const description =
      "Welcome to the home page. Here is some description for SEO.";
    const image = `${baseUrl}/assets/logo.png`;

    const html = await createReactApp(req, title, description, image);
    res.status(200).send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error rendering the page.");
  }
});

app.get("/seo/about", async (req, res) => {
  try {
    const title = "About Page Title";
    const description = "Learn more about us on the about page.";
    const image =
      "https://media.istockphoto.com/id/1131028789/photo/portrait-of-a-man-taking-photos-with-camera-reflex-against-the-sunset.jpg?s=612x612&w=0&k=20&c=x3o-3VilVuIXVpLhj_z9oGl5ufp5f0ymhRc9taSDsYU=";

    const html = await createReactApp(req, title, description, image);
    res.status(200).send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error rendering the page.");
  }
});

app.get("/seo/contact-us", async (req, res) => {
  try {
    const title = "Contact Us Title";
    const description = "Contact with us visiting contact us page.";
    const image =
      "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg";

    const html = await createReactApp(req, title, description, image);
    res.status(200).send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error rendering the page.");
  }
});

app.get("*", async (req, res) => {
  try {
    const title = "404 Not Found";
    const description = "The page you are looking for does not exist.";
    const image = `${baseUrl}/assets/notFound.png`;

    const html = await createReactApp(req, title, description, image);
    res.status(404).send(html);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error rendering the page.");
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// import express from "express";
// import { StaticRouter } from "react-router-dom/server";
// import ReactDOMServer from "react-dom/server";
// import App from "../client/components/App";
// // import axios from 'axios';
// import fs from "fs";

// const app = express();
// const baseUrl =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:3001/seo"
//     : "https://aparto.am/seo";
// const PORT = process.env.PORT || 3001;

// app.use("/assets", express.static(`${__dirname}/../client/assets/imgs`));
// app.use("/static", express.static(__dirname));

// const getMetaTagsForRoute = (location) => {
//   let title = "";
//   let description = "";
//   let image = `${baseUrl}/assets/logo.png`;
//   // let seoData = null

//   if (location === "/seo") {
//     title = "Home Page Title";
//     description = "Welcome to the home page. Here is some description for SEO.";
//     image = `${baseUrl}/assets/logo.png`;

//     // try {
//     //   const response = await axios.get(
//     //     "https://aparto.am/api/public/api/getInterfaceProperties/en/1775"
//     //   );

//     //   seoData = response.data;

//     //   console.log("SEO Data:", seoData); // Log the data for debugging
//     // } catch (error) {
//     //   console.error("Error fetching SEO data:", error);
//     //   seoData = null; // Default to null if there's an error
//     // }
//   }
//   else if (location === "/seo/about") {
//     title = "About Page Title";
//     description = "Learn more about us on the about page.";
//     image =
//       "https://media.istockphoto.com/id/1131028789/photo/portrait-of-a-man-taking-photos-with-camera-reflex-against-the-sunset.jpg?s=612x612&w=0&k=20&c=x3o-3VilVuIXVpLhj_z9oGl5ufp5f0ymhRc9taSDsYU=";
//   } else if (location === "/seo/contact-us") {
//     title = "Contact Us Title";
//     description = "Contact with us visiting contact us page.";
//     image =
//       "https://www.simplilearn.com/ice9/free_resources_article_thumb/what_is_image_Processing.jpg";
//   }

//   return {
//     title,
//     description,
//     image,
//     // seoData
//   };
// };

// const createReactApp = async (req) => {
//   const location = req.url;
//   const url = req.protocol + "://" + req.get("host") + location;

//   // const { title, description, image, seoData } = await getMetaTagsForRoute(location);
//   const { title, description, image } = getMetaTagsForRoute(location);

//   const reactApp = ReactDOMServer.renderToString(
//     <StaticRouter location={location}>
//       <App />
//     </StaticRouter>
//   );

//   const htmlTemplate = await fs.promises.readFile(
//     `${__dirname}/index.html`,
//     "utf-8"
//   );

//   const finalHtml = htmlTemplate
//     .replace(/{{title}}/g, title)
//     .replace(/{{description}}/g, description)
//     .replace(/{{image}}/g, image)
//     .replace(/{{imageAlt}}/g, title)
//     .replace(/{{url}}/g, url)
//     .replace("{{reactApp}}", reactApp);

//   return finalHtml;
// };

// app.get("*", async (req, res) => {
//   try {
//     const indexHtml = await createReactApp(req);
//     res.status(200).send(indexHtml);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error rendering the page.");
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });

///-----------------------------------------------------------------///

// const getMetaTagsForRoute = (location, language) => {
//   const metaTags = {
//     en: {
//       "/": {
//         title: "Discover Property to Buy or Rent",
//         description: "Discover Property to Buy or Rent",
//         image: "/assets/logo.png",
//       },
//       "/about": {
//         title: "About Page Title",
//         description: "Learn more about us on the about page.",
//         image:
//           "https://media.istockphoto.com/id/1131028789/photo/portrait-of-a-man-taking-photos-with-camera-reflex-against-the-sunset.jpg?s=612x612&w=0&k=20&c=x3o-3VilVuIXVpLhj_z9oGl5ufp5f0ymhRc9taSDsYU=",
//       },
//     },
//     am: {
//       "/": {
//         title: "Փնտրել վաճառքի կամ վարձակալության անշարժ գույք",
//         description: "Փնտրել վաճառքի կամ վարձակալության անշարժ գույք",
//         image: "/assets/logo.png",
//       },
//       "/about": {
//         title: "Մեր Մասին Էջի Վերնագիր",
//         description: "Իմացեք ավելին մեր մասին էջում:",
//         image:
//           "https://media.istockphoto.com/id/1131028789/photo/portrait-of-a-man-taking-photos-with-camera-reflex-against-the-sunset.jpg?s=612x612&w=0&k=20&c=x3o-3VilVuIXVpLhj_z9oGl5ufp5f0ymhRc9taSDsYU=",
//       },
//     },
//     ru: {
//       "/": {
//         title: "Поиск недвижимости для продажи или аренды>",
//         description: "Добро пожаловать на главную страницу. Описание для SEO.",
//         image: "/assets/logo.png",
//       },
//       "/about": {
//         title: "Заголовок страницы о нас",
//         description: "Узнайте больше о нас на странице о нас.",
//         image:
//           "https://media.istockphoto.com/id/1131028789/photo/portrait-of-a-man-taking-photos-with-camera-reflex-against-the-sunset.jpg?s=612x612&w=0&k=20&c=x3o-3VilVuIXVpLhj_z9oGl5ufp5f0ymhRc9taSDsYU=",
//       },
//     },
//   };

//   const langMeta = metaTags[language] || metaTags["am"];
//   return langMeta[location];
// };

///-----------------------------------------------------------------///

// import express from "express";
// import { StaticRouter } from "react-router-dom/server";
// import ReactDOMServer from "react-dom/server";
// import App from "../client/components/App";
// import fs from "fs";
// import { Helmet } from "react-helmet";

// const app = express();

// app.use("/static", express.static(__dirname));
// const PORT = process.env.PORT || 3001;

// const createReactApp = async (location) => {
//   const reactApp = ReactDOMServer?.renderToString(
//     <StaticRouter location={location}>
//       <App />
//     </StaticRouter>
//   );

//   const helmet = Helmet.renderStatic();
//   const { title, meta } = helmet;

//   const htmlTemplate = await fs.promises.readFile(
//     `${__dirname}/index.html`,
//     "utf-8"
//   );

//   const htmlWithMetaTags = htmlTemplate
//     .replace("<title></title>", title.toString())
//     .replace(
//       '<meta name="description" content="">',
//       meta.toString()
//     );

//   const finalHtml = htmlWithMetaTags.replace(
//     'div id="root"></div>',
//     `div id="root">${reactApp}</div>`
//   );

//   return finalHtml;
// };

// app.get("*", async (req, res) => {
//   try {
//     const indexHtml = await createReactApp(req.url);
//     res.status(200).send(indexHtml);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error rendering the page.");
//   }
// });

// app.listen(PORT, () => {
//   console.log(`Server started on port ${PORT}`);
// });
