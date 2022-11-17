import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

import { DrawSVGPlugin } from "../gsap-files/DrawSVGPlugin.min.js";

//const boxRef = useRef();

export default function FirstLoad({ children }) {
  //const [loading, setLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // whatever you need to do
    gsap.registerPlugin(DrawSVGPlugin);

    /* Logo animation */

    var tl = gsap.timeline({ repeat: 0, delay: 0.5 });

    tl.from(
      "#firstBlock",
      { scaleX: 0, transformOrigin: "left center", ease: "bounce" },
      "+=0"
    );

    tl.from(
      "#secondBlock",
      { scaleX: 0, transformOrigin: "left center", ease: "bounce" },
      "+=0"
    );

    tl.from(
      "#thirdBlock",
      { scaleX: 0, transformOrigin: "left center", ease: "bounce" },
      "+=0"
    );

    tl.from(
      "#forthBlock",
      { scaleX: 0, transformOrigin: "left center", ease: "bounce" },
      "+=0"
    );

    tl.from("#greenLight", { drawSVG: "0% 0%" }, "+=.175");

    tl.from(
      "#fiftBlock",
      { scaleX: 0, transformOrigin: "center center", y: -25, ease: "bounce" },
      "+=.2"
    );

    //tl.from("#firstBlock", { duration: 2, x: 25, autoAlpha: 1, ease: "elastic" }, 0.1);

    tl.to("#logoPoker", { duration: 1, autoAlpha: 1 }, 0.1);

    //tl.staggerFrom("#whiteOuterRing, #whiteInnerRing", 1, {drawSVG:"0% 0%"}, "+=1");
    tl.from(
      "#whiteOuterRing, #whiteInnerRing",
      { duration: 0.25, drawSVG: "0% 0%" },
      "+=0"
    );

    tl.to("#greenDecor", { delay: 0, duration: 0.25, autoAlpha: 1 }, "-=.25");

    tl.to("#logoWrap", { delay: 0, duration: 2.5, scale: 0.75 }, "-=0.5");

    const timer = setTimeout(() => {
      setLoading(false);
    }, 6500);
  }, []);

  return !loading ? (
    children
  ) : (
    <div id="logoWrap" style={{ visibility: isVisible ? "visible" : "hidden" }}>
      <div id="upperWrap">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          id="pokerLogo"
          width="250"
          height="250"
          version="1.1"
          viewBox="0 0 375 375"
        >
          <defs id="defs35">
            <clipPath id="A">
              <path
                id="path2"
                d="M23.141 23.758h328.5v327.75h-328.5zm0 0"
              ></path>
            </clipPath>
            <clipPath id="B">
              <path
                id="path5"
                d="M34.441 34.371H340v306.258H34.441zm0 0"
              ></path>
            </clipPath>
            <clipPath id="C">
              <path
                id="path8"
                d="M187.441 340.336a156.69 156.69 0 01-5.238-.086l-2.621-.117a153.43 153.43 0 01-19.902-2.336l1.094-31.898a121.75 121.75 0 0022.512 2.879l4.227.074a121.12 121.12 0 0018.43-1.406l-1.094 31.898a153.49 153.49 0 01-17.406.992m79.172-22.184l-22.031-23.633a121.691 121.691 0 0035.234-28.531l21.57 23.141a153.48 153.48 0 01-34.773 29.023M99.508 312.41a153.61 153.61 0 01-32.703-31.348l23.098-21.598a121.85 121.85 0 0033.203 30.883L99.508 312.41m235.227-85.066l-32.488-1.121c3.645-10.863 5.797-22.437 6.207-34.48a120.93 120.93 0 00-.09-10.594l31.504 1.086a152.81 152.81 0 01.074 8.035l-.066 2.555a154.08 154.08 0 01-3.395 27.344 150.362 150.362 0 01-1.746 7.176M70.25 218.25l-32.492-1.117a153.19 153.19 0 01-2.848-28.5v-.035a159.37 159.37 0 01.094-6.25 155.01 155.01 0 01.727-10.57l31.508 1.086c-.422 3.477-.695 7-.82 10.566-.414 12.035.941 23.734 3.832 34.82m223.969-87.891a121.836 121.836 0 00-28.492-35.285l23.105-21.602a153.98 153.98 0 0128.988 34.824l-23.602 22.063m-209.395-7.191L62.789 99.539a153.71 153.71 0 0131.309-32.758l21.566 23.137a121.875 121.875 0 00-30.84 33.25m129.277-53.887a122.07 122.07 0 00-22.512-2.883 128.09 128.09 0 00-4.234-.07 121.48 121.48 0 00-18.422 1.402l1.094-31.91c5.703-.648 11.496-.98 17.363-.98a159.03 159.03 0 015.277.086l5.035.258a153.19 153.19 0 0117.492 2.191L214.1 69.281"
              ></path>
            </clipPath>
            <clipPath id="D">
              <path
                id="path11"
                d="M187.441 340.336a156.69 156.69 0 01-5.238-.086l-2.621-.117a153.43 153.43 0 01-19.902-2.336l1.094-31.898a121.75 121.75 0 0022.512 2.879l4.227.074a121.12 121.12 0 0018.43-1.406l-1.094 31.898a153.49 153.49 0 01-17.406.992m79.172-22.184l-22.031-23.633a121.691 121.691 0 0035.234-28.531l21.57 23.141a153.48 153.48 0 01-34.773 29.023M99.508 312.41a153.61 153.61 0 01-32.703-31.348l23.098-21.598a121.85 121.85 0 0033.203 30.883L99.508 312.41m235.227-85.066l-32.488-1.121c3.645-10.863 5.797-22.437 6.207-34.48a120.93 120.93 0 00-.09-10.594l31.504 1.086a152.81 152.81 0 01.074 8.035l-.066 2.555a154.08 154.08 0 01-3.395 27.344 150.362 150.362 0 01-1.746 7.176M70.25 218.25l-32.492-1.117a153.19 153.19 0 01-2.848-28.5v-.035a159.37 159.37 0 01.094-6.25 155.01 155.01 0 01.727-10.57l31.508 1.086c-.422 3.477-.695 7-.82 10.566-.414 12.035.941 23.734 3.832 34.82m223.969-87.891a121.836 121.836 0 00-28.492-35.285l23.105-21.602a153.98 153.98 0 0128.988 34.824l-23.602 22.063m-209.395-7.191L62.789 99.539a153.71 153.71 0 0131.309-32.758l21.566 23.137a121.875 121.875 0 00-30.84 33.25m129.277-53.887a122.07 122.07 0 00-22.512-2.883 128.09 128.09 0 00-4.234-.07 121.48 121.48 0 00-18.422 1.402l1.094-31.91c5.703-.648 11.496-.98 17.363-.98a159.03 159.03 0 015.277.086l5.035.258a153.19 153.19 0 0117.492 2.191L214.1 69.281"
              ></path>
            </clipPath>
            <clipPath id="E">
              <path
                id="path14"
                d="M199.305-117.465l-316.469 293.176 292.75 316.93 316.465-293.176zm0 0"
              ></path>
            </clipPath>
            <clipPath id="F">
              <path id="path17" d="M66 66h242.863v243H66zm0 0"></path>
            </clipPath>
            <clipPath id="G">
              <path
                id="path20"
                d="M187.512 308.852c-1.402 0-2.809-.027-4.227-.074a121.75 121.75 0 01-22.512-2.879 120.38 120.38 0 01-37.668-15.551 121.85 121.85 0 01-33.203-30.883A121.07 121.07 0 0170.25 218.25c-2.891-11.086-4.246-22.785-3.832-34.82.125-3.566.398-7.09.82-10.566a120.693 120.693 0 0117.586-49.695 121.875 121.875 0 0130.84-33.25c15.414-11.371 33.594-19.164 53.27-22.187a121.48 121.48 0 0118.422-1.402 128.09 128.09 0 014.234.07 122.07 122.07 0 0122.512 2.883c19.422 4.367 37.023 13.387 51.625 25.793a121.85 121.85 0 0128.492 35.285 120.632 120.632 0 0114.145 50.789c.184 3.496.215 7.035.09 10.594-.41 12.043-2.562 23.617-6.207 34.48-4.937 14.754-12.621 28.195-22.43 39.766a121.659 121.659 0 01-35.234 28.531 120.15 120.15 0 01-38.641 12.926 121.12 121.12 0 01-18.43 1.406m-.141-232.687c-59.687 0-109.07 47.402-111.133 107.602-2.109 61.504 45.969 113.074 107.383 115.18a107.57 107.57 0 003.883.066c59.684 0 109.07-47.406 111.133-107.605 2.109-61.496-45.973-113.062-107.383-115.176a117.56 117.56 0 00-3.883-.066"
              ></path>
            </clipPath>
            <clipPath id="H">
              <path
                id="path23"
                d="M187.512 308.852c-1.402 0-2.809-.027-4.227-.074a121.75 121.75 0 01-22.512-2.879 120.38 120.38 0 01-37.668-15.551 121.85 121.85 0 01-33.203-30.883A121.07 121.07 0 0170.25 218.25c-2.891-11.086-4.246-22.785-3.832-34.82.125-3.566.398-7.09.82-10.566a120.693 120.693 0 0117.586-49.695 121.875 121.875 0 0130.84-33.25c15.414-11.371 33.594-19.164 53.27-22.187a121.48 121.48 0 0118.422-1.402 128.09 128.09 0 014.234.07 122.07 122.07 0 0122.512 2.883c19.422 4.367 37.023 13.387 51.625 25.793a121.85 121.85 0 0128.492 35.285 120.632 120.632 0 0114.145 50.789c.184 3.496.215 7.035.09 10.594-.41 12.043-2.562 23.617-6.207 34.48-4.937 14.754-12.621 28.195-22.43 39.766a121.659 121.659 0 01-35.234 28.531 120.15 120.15 0 01-38.641 12.926 121.12 121.12 0 01-18.43 1.406m-.141-232.687c-59.687 0-109.07 47.402-111.133 107.602-2.109 61.504 45.969 113.074 107.383 115.18a107.57 107.57 0 003.883.066c59.684 0 109.07-47.406 111.133-107.605 2.109-61.496-45.973-113.062-107.383-115.176a117.56 117.56 0 00-3.883-.066"
              ></path>
            </clipPath>
            <clipPath id="I">
              <path
                id="path26"
                d="M196.723-54.766L-54.711 178.16l232.57 251.785 251.434-232.93zm0 0"
              ></path>
            </clipPath>
            <clipPath id="J">
              <path id="path29" d="M157 129.16h38V142h-38zm0 0"></path>
            </clipPath>
            <clipPath id="K">
              <path id="path32" d="M100.727 238h150v20.16h-150zm0 0"></path>
            </clipPath>
          </defs>
          <path
            id="path37"
            fill="#212323"
            d="M291.66 191.168l-.734-.027c-1.922 56.035-47.887 100.141-103.426 100.141a101.42 101.42 0 01-3.613-.062c-55.941-1.918-100-47.949-99.996-103.574a101.35 101.35 0 01.059-3.613c1.922-56.023 47.879-100.137 103.418-100.137 1.203 0 2.41.023 3.621.066 55.941 1.918 100 47.937 100 103.559a102.02 102.02 0 01-.062 3.621l.734.027.738.023a115.39 115.39 0 00.063-3.672c0-56.418-44.684-103.086-101.422-105.035a105.13 105.13 0 00-3.672-.062c-56.332 0-102.938 44.738-104.891 101.559a104.36 104.36 0 00-.062 3.664c0 56.418 44.684 103.102 101.422 105.051 1.223.043 2.445.063 3.664.063 56.332 0 102.949-44.734 104.898-101.566l-.738-.023"
          ></path>
          <path
            id="greenDecor"
            fill="#45ca63"
            fillOpacity="1"
            d="M187.5 340.132c-1.774 0-3.548-.031-5.333-.09l5.238.086a153.49 153.49 0 0017.406-.992l1.094-31.898a120.158 120.158 0 0038.641-12.926l22.031 23.633a153.458 153.458 0 0034.773-29.023l-21.57-23.141a120.738 120.738 0 0022.43-39.766l32.488 1.12a150.362 150.362 0 001.746-7.175c-14.977 69.094-76.406 120.172-148.945 120.172m-7.953-.207c-71.078-3.648-128.633-55.668-141.824-123l32.492 1.117a121.07 121.07 0 0019.652 41.215l-23.098 21.598a153.61 153.61 0 0032.703 31.348l23.598-22.062a120.38 120.38 0 0037.668 15.55l-1.094 31.899a153.43 153.43 0 0019.902 2.336m160.36-149.864a152.84 152.84 0 00-.074-8.035l-31.504-1.086a120.603 120.603 0 00-14.145-50.79l23.602-22.061a153.98 153.98 0 00-28.988-34.824l-23.105 21.602c-14.602-12.406-32.203-21.426-51.625-25.793l1.094-31.906a152.993 152.993 0 00-17.492-2.191c80.922 5.418 143.691 73.59 142.238 155.086M34.874 188.39a159.39 159.39 0 01.094-6.25c2.824-82.524 70.516-147.508 152.336-147.512 1.773 0 3.547.03 5.328.09a159.04 159.04 0 00-5.277-.086c-5.867 0-11.66.332-17.363.98l-1.094 31.91c-19.676 3.023-37.855 10.816-53.27 22.188L94.062 66.573A153.71 153.71 0 0062.753 99.33l22.035 23.629a120.699 120.699 0 00-17.586 49.695l-31.508-1.086a155.01 155.01 0 00-.727 10.57 159.444 159.444 0 00-.094 6.25"
          ></path>
          <path
            id="path45"
            fill="#2d2d2d"
            strokeWidth="0.994"
            d="M187.222 350.812c-1.885 0-3.791-.03-5.676-.097-21.954-.753-43.111-5.79-62.878-14.962-19.086-8.859-36.078-21.186-50.501-36.63-14.424-15.443-25.549-33.245-33.079-52.898-7.794-20.352-11.37-41.802-10.615-63.757 1.46-42.457 19.097-82.078 49.67-111.563 30.498-29.412 70.59-45.616 112.884-45.616 1.882 0 3.793.035 5.681.101 21.954.753 43.107 5.785 62.877 14.959 19.087 8.858 36.079 21.182 50.498 36.63 14.42 15.446 25.553 33.241 33.079 52.894 7.794 20.352 11.365 41.802 10.615 63.756-1.457 42.462-19.097 82.083-49.67 111.568-30.498 29.416-70.59 45.616-112.885 45.616m-5.303-11.116c1.775.058 3.54.089 5.303.089 72.156 0 133.262-50.738 148.159-119.371a153.266 153.053 0 003.377-27.162l.065-2.538c1.446-80.953-60.992-148.67-141.486-154.052a166.46 166.46 0 00-5.009-.257c-1.771-.058-3.536-.09-5.3-.09-81.387.005-148.722 64.556-151.53 146.53-.074 2.08-.102 4.148-.094 6.208v.035c.062 9.665 1.03 19.13 2.833 28.31 13.12 66.883 70.372 118.557 141.074 122.18l2.608.117"
          ></path>
          <g
            id="g53"
            fill="#2d2d2d"
            clipPath="url(#D)"
            transform="translate(-.015 .02) scale(1.00042)"
          >
            <g id="g51" clipPath="url(#E)">
              <path
                id="path49"
                d="M199.305-117.465l-316.469 293.176 292.746 316.93 316.469-293.176zm0 0"
              ></path>
            </g>
          </g>
          <g
            id="g63"
            fill="#2d2d2d"
            clipPath="url(#H)"
            transform="matrix(1.01234 0 0 1.00815 -2.704 -1.056)"
          >
            <g id="g61" clipPath="url(#I)">
              <path
                id="path59"
                strokeWidth="1.298"
                d="M196.723-54.766L-54.711 178.16l232.57 251.785L429.293 197.02zm0 0"
              ></path>
            </g>
          </g>
          <path
            id="path69"
            fill="#fff"
            d="M228.309 161.766c-5.148-.18-10.977.918-16.598 3.012 4.406-7.102 7.195-15.398 7.441-22.562.57-16.656-12.453-30.633-29.09-31.207-16.637-.566-30.586 12.484-31.152 29.137-.246 7.16 1.961 15.637 5.875 23.02-5.461-2.465-11.203-3.965-16.352-4.137-16.637-.574-30.59 12.469-31.16 29.129-.57 16.66 12.453 30.629 29.094 31.203 11.973.414 27.645-6.059 35.691-15.93l-.824 5.117-2.531 14.945a622.616 622.616 0 01-5.617 27.961c-1.727 7.617-3.129 12.684-3.129 12.684l30.578 1.055s-1.051-5.156-2.25-12.875a604.46 604.46 0 01-3.691-28.273c-.637-5.141-1.035-10.277-1.504-15.086l-.363-3.852c7.672 9.699 22.066 16.605 33.52 17 16.633.574 30.582-12.473 31.152-29.133.57-16.66-12.449-30.633-29.09-31.207"
          ></path>
          <path
            id="insideCircle"
            fill="#2d2d2d"
            d="M186.333 79.125l-5.318.131-5.302.396-5.276.653-5.241.915-5.188 1.172-5.123 1.426-5.05 1.676-4.962 1.922-4.859 2.168-4.748 2.402-4.63 2.636-4.492 2.859-4.347 3.078-4.19 3.29-4.029 3.49-3.85 3.686-3.666 3.87-3.471 4.051-3.272 4.212-3.062 4.37-2.844 4.516-2.623 4.654-2.389 4.773-2.156 4.885-1.911 4.989-1.667 5.077-1.418 5.15-1.166 5.215-.91 5.269-.65 5.304-.394 5.331-.13 5.346.13 5.342.394 5.331.65 5.308.91 5.265 1.166 5.215 1.418 5.154 1.667 5.073 1.911 4.989 2.156 4.885 2.389 4.777 2.623 4.65 2.844 4.516 3.062 4.37 3.272 4.216 3.471 4.047 3.666 3.87 3.85 3.686 4.029 3.494 4.19 3.286 4.347 3.078 4.492 2.859 4.63 2.636 4.748 2.402 4.859 2.168 4.962 1.925 5.05 1.676 5.123 1.426 5.188 1.168 5.241.915 5.276.657 5.302.392 5.318.131 5.314-.131 5.302-.392 5.279-.657 5.237-.915 5.188-1.168 5.127-1.426 5.046-1.68 4.962-1.922 4.859-2.168 4.752-2.402 4.626-2.636 4.492-2.859 4.347-3.078 4.194-3.286 4.026-3.494 3.85-3.686 3.666-3.87 3.475-4.047 3.269-4.216 3.062-4.37 2.844-4.516 2.623-4.65 2.389-4.777 2.156-4.885 1.915-4.989 1.667-5.073 1.418-5.154 1.162-5.215.91-5.265.654-5.308.39-5.331.13-5.342-.13-5.346-.39-5.331-.654-5.304-.91-5.269-1.162-5.215-1.418-5.15-1.671-5.077-1.911-4.989-2.156-4.885-2.389-4.773-2.623-4.654-2.844-4.516-3.062-4.37-3.269-4.212-3.475-4.051-3.666-3.87-3.85-3.686-4.026-3.49-4.194-3.29-4.347-3.078-4.492-2.859-4.626-2.636-4.752-2.402-4.859-2.168-4.962-1.922-5.046-1.676-5.127-1.426-5.188-1.172-5.237-.915-5.279-.653-5.302-.396-5.314-.131zm0 0"
          ></path>
          <path
            id="firstBlock"
            fill="#fff"
            fillOpacity="1"
            d="M144.097 240.133l-3.656 25.245h66.992l-3.658-25.245h-59.678z"
            display="inline"
          ></path>
          <path
            id="secondBlock"
            fill="#fff"
            fillOpacity="1"
            d="M145.053 233.541h57.766l-2.863-19.776h-52.035z"
            display="inline"
          ></path>
          <path
            id="thirdBlock"
            fill="#fff"
            fillOpacity="1"
            d="M151.738 187.402l-2.863 19.776h50.126l-2.868-19.776z"
            display="inline"
          ></path>
          <path
            id="forthBlock"
            fill="#fff"
            fillOpacity="1"
            d="M156.994 151.151l-4.297 29.664h42.482l-4.297-29.664z"
          ></path>
          <path
            id="fiftBlock"
            fill="#fff"
            fillOpacity="1"
            strokeWidth="1.32"
            d="M198.414 108.61a26.396 26.396 0 00-48.95 0zm0 0"
            display="inline"
          ></path>
          <path
            id="greenLight"
            fill="none"
            fillOpacity="1"
            stroke="#45ca63"
            strokeDasharray="none"
            strokeLinecap="round"
            strokeLinejoin="miter"
            strokeMiterlimit="4"
            strokeOpacity="1"
            strokeWidth="17.175"
            d="M132.988 129.82c13.72-.187 27.441-.325 41.163-.413 10.7-.068 21.433-.104 32.06 1.153 11.554 1.366 23.42 4.52 32.06 12.315 3.236 2.919 5.96 6.475 7.534 10.539 2.41 6.221 1.951 13.37-.658 19.51-2.61 6.14-7.252 11.296-12.736 15.096a41.513 41.513 0 01-4.855 2.901c-9.14 4.636-19.667 5.55-29.904 6.037-6.801.324-13.61.496-20.42.517"
            opacity="1"
          ></path>
          <ellipse
            id="whiteInnerRing"
            cx="186.938"
            cy="188.012"
            fill="none"
            fillOpacity="1"
            fillRule="evenodd"
            stroke="#fff"
            strokeLinecap="round"
            strokeOpacity="1"
            strokeWidth="4.688"
            paintOrder="stroke markers fill"
            rx="110.293"
            ry="110.779"
          ></ellipse>
          <ellipse
            id="whiteOuterRing"
            cx="185.891"
            cy="189.22"
            fill="none"
            fillOpacity="1"
            fillRule="evenodd"
            stroke="#fff"
            strokeLinecap="round"
            strokeOpacity="1"
            strokeWidth="6.962"
            paintOrder="stroke markers fill"
            rx="163.801"
            ry="164.523"
          ></ellipse>
        </svg>
      </div>
      {/*         <div id="lowerWrap">
          <div id="lower"></div>
        </div> */}
    </div>
  );
}
