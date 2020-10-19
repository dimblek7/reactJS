import { useLayoutEffect, useState } from "react";
import get from "lodash/get";
import { instanceMultipart } from "actions/axiosInstance";

export const getOSName = () => navigator.appVersion;

export const isMacOS = () => navigator.appVersion.includes("Macintosh");

export const isIncognitoMode = () =>
  Promise((resolve, reject) => {
    const fs = window.RequestFileSystem || window.webkitRequestFileSystem;
    if (!fs) reject("Check incognito failed");
    else
      fs(
        window.TEMPORARY,
        100,
        () => resolve(false),
        () => resolve(true)
      );
  });

export const getSubdomain = () => {
  const subdomain = get(window, "location.hostname", "").split(".");
  return subdomain[0];
};

export function getUrlExtension(url) {
  return url.split(/\#|\?/)[0].split(".").pop().trim();
}

export function getFnameFromUrl(url) {
  return url.substring(url.lastIndexOf("/") + 1);
}

export async function getFileUrl({ file, fileurl, maxsize }) {
  let res = "";
  const fileAPIresp = await instanceMultipart.post(fileurl, file);
  res = get(fileAPIresp, "data.result[0].imagepath", "");
  return res;
}

export function b64toBlob(b64Data, contentType = "", sliceSize = 512) {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

export function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

// export function getCookie(cname) {
//   const cookies = new Cookies();
//   return cookies.get(cname) || null;
// }
