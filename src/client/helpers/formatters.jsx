// format long text
export function cutText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  } else {
    return text;
  }
}
// format comminity
export function cutCommunity(text) {
  const cleanInput = text.replace(/\([^()]*\)/g, "").trim();
  const words = cleanInput.split(/\s+/);

  if (words.length < 2) {
    return "";
  }

  const firstWord = words[0];
  const secondWord = words[1];

  if (secondWord.length === 0) {
    return "";
  }

  const firstLetterOfSecondWord = secondWord[0];

  return `${firstWord} ${firstLetterOfSecondWord}.`;
}
// format comminity rus
export function cutCommunityRu(text) {
  const cleanInput = text.replace(/\([^()]*\)/g, "").trim();
  const words = cleanInput.split(/\s+/);

  if (words.length < 2) {
    return "";
  }

  const firstWord = words[0].charAt(0);
  const remainingWords = words.slice(1).join(" ");

  return `${firstWord}. ${remainingWords}`;
}
// Capitalize
export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
// split before "/"
export function splitBefore(str) {
  return str.split("/")[0];
}
// split after "/"
export function splitAfter(str) {
  return str.split("/")[1];
}
// usd formater
export function usdFormater(num) {
  let usd = Intl.NumberFormat("en-US");
  let formated = "$ " + usd.format(num);
  return formated;
}
// usd formater without $ symbol
export function noUsdFormater(num) {
  let usd = Intl.NumberFormat("en-US");
  let formated = usd.format(num);
  return formated;
}
// amd formater
export function amdFormater(num, ex) {
  let usd = Intl.NumberFormat("en-US");
  let total = Number(num) * Number(ex);
  let formated = usd.format(total);
  return formated;
}
// date formatter for deactivate home
export function formatDateString(date) {
  const isoString = date.toISOString();
  const formattedDate = isoString.replace("T", " ").split(".")[0];
  return formattedDate;
}
// sqm to ft2 formatter
export function sqmToFt2(sqm) {
  return (Number(sqm) * 10.7639104).toFixed(0);
}

export function extractFileName(url) {
  const modifiedUrl = url?.replace("crmfiles/", "");
  return modifiedUrl?.substring(modifiedUrl?.lastIndexOf("/") + 1);
}

// date formatter for crm edit
// export function formatDate(dateString) {
//   const formattedDate = new Date(dateString);
//   const year = formattedDate.getFullYear();
//   const day = formattedDate.getDate().toString().padStart(2, '0');
//   const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
//   return `${year}-${day}-${month}`;
// }

export function formatDate(dateString) {
  const [day, month, year] = dateString?.split("/");
  return `${year}-${month?.padStart(2, "0")}-${day?.padStart(2, "0")}`;
}

// format urls
export function formatHomeUrl(text) {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-()]+/g, "")
    .replace(/-+/g, "-");
}

export const formatResultUrl = (query) => {
  const params = new URLSearchParams(query);

  const formattedParams = Array.from(params.entries()).map(([key, value]) => {
    // if (key === 'building_type') {
    const values = decodeURIComponent(value).split(",");
    return `${key}=${values.join(",")}`;
    // }
    // return `${key}=${value}`;
  });

  return formattedParams.join('&');
};

// sider get community and streets from url
export const getDataFromUrl = (urlData, data) => {
  const array = urlData ? urlData?.split(",") : [];

  const ids = array
    ?.map((value) => {
      const match = data?.find(
        (item) => item?.value?.toLowerCase() === value?.toLowerCase()
      );
      return match ? match?.id : null;
    })
    ?.filter((id) => id !== null);

  return ids;
};

//
export const parseUrlSegments = (params) => {
  const validTypes = ["sale", "rent"];
  const validProperties = ["house", "privateHouse", "commercial"];
  const validNewbuild = "new-building";

  let type = "";
  let property = "";
  let newbuild = "";
  let commune = "";
  let street = "";

  const urlSegments = Object?.values(params);

  urlSegments?.forEach((segment) => {
    if (validTypes?.includes(segment) && !type) {
      type = segment;
    } else if (validProperties?.includes(segment) && !property) {
      property = segment;
    } else if (segment === validNewbuild && !newbuild) {
      newbuild = segment;
    } else if (segment && !commune) {
      commune = segment;
    } else if (segment && !street) {
      street = segment;
    }
  });

  return { type, property, newbuild, commune, street };
};

//
export const fixUrl = () => {
  const currentUrl = window.location.href;
  const fixedUrl = currentUrl.replace(/%2C/g, ",");

  window.history.pushState({ path: fixedUrl }, "", fixedUrl);
}; 