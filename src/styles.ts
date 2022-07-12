import styled, { keyframes, createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  font-family: "Hammersmith One", sans-serif;
}

body {
  min-height: 100%;
  height: 100%;
  padding: 0px;
  margin: 0px;
  background-image: url("https://raw.githubusercontent.com/gabriel-labsit/liveness-assets/main/bg_oiti_matrix.png");
  overflow: hidden;
  text-align: center;
  text-align: -webkit-center;
  text-align: -moz-center;
}

@media (max-width: 37em) {
  html,
  body {
    padding: 0px;
    margin: 0px;
    height: 100%;
  }
  }
`;

export const Content = styled.div`
  background-image: url("https://raw.githubusercontent.com/gabriel-labsit/liveness-assets/main/logo_oiti_trans.png");
  background-position-x: 20px;
  background-position-y: 20px;
  background-repeat: no-repeat;
  text-align: center;
  text-align: -webkit-center;
  text-align: -moz-center;
  height: 100%;
  background-size: 100px;

  @media (max-width: 37em) {
    height: 100%;
    padding: 0px;
  }
`;

export const Container = styled.div`
  text-align: -webkit-center;
  text-align: -moz-center;
  text-align: center;
  height: 100%;
  width: 320px;
  display: inline-block;

  @media (max-width: 37em) {
    width: 100%;
  }
`;

export const OuterR4x3 = styled.div`
  position: relative;
  width: 100%;
  padding-top: 150%; /* "height" will be 3/4 of width */

  @media (max-width: 37em) {
    padding-top: 0%; /* "height" will be 3/4 of width */
    height: 100%;
    min-height: 100%;
  }
`;

export const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Overlay = styled.div`
  background-image: url("https://raw.githubusercontent.com/gabriel-labsit/liveness-assets/6d0e8dd5823d60216e65f5f4a8ad70f631195868/desktop_layer-2.1.svg") !important;
  background-repeat: no-repeat !important;
  background-size: 100% 100% !important;
  height: 100%;
  min-height: 100%;
  width: 100%;
  position: absolute;
  top: auto;
  left: auto;
  z-index: 1;
  opacity: 0.5;
  border-radius: 0px;

  @media (max-width: 37em) {
    background-image: url("https://raw.githubusercontent.com/gabriel-labsit/liveness-assets/6d0e8dd5823d60216e65f5f4a8ad70f631195868/mobile_layer-2.1.svg") !important;
    background-repeat: no-repeat !important;
    background-size: 100% 100% !important;
    height: 100%;
    min-height: 100%;
    width: 100%;
    position: absolute;
    top: auto;
    left: auto;
    z-index: 1;
    opacity: 0.5;
    border-radius: 0px;
  }
`;

export const ContentVideo = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 100%;
  height: 100%;
  display: block;
  overflow: hidden;

  @media (max-width: 37em) {
    border-radius: initial;
    width: 100%;
    height: 100%;
    background-color: initial;
    background-repeat: round;
  }
`;

export const Video = styled.video`
  height: 100%;
  transform: rotateY(180deg);
  margin-left: -50%;

  @media (max-width: 37em) {
    position: relative;
    z-index: 0;
    top: 0px;
    left: 0px;
    margin-left: 0px;
    min-width: 100%;
    min-height: 100%;
    width: 100%;
    height: auto;
    transform: rotateY(180deg);
  }
`;

export const DivLoader = styled.div`
  top: 50%;
  left: 50%;
  position: absolute;
  width: 100%;
  height: 40px;
  text-align: center;
  text-align: -webkit-center;
  text-align: -moz-center;
  display: inline-block;

  @media (max-width: 37em) {
    top: 50%;
    left: 50%;
  }
`;

const load7 = keyframes`  
  0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
  }
`;

export const Loader = styled.div`
  color: #aed74e;
  font-size: 8px;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;

  :before,
  :after {
    border-radius: 53%;
    width: 2.5em;
    height: 2.5em;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation: ${load7} 1.8s infinite ease-in-out;
    animation: ${load7} 1.8s infinite ease-in-out;
    content: "";
    position: absolute;
    top: 0;
  }

  :before {
    left: -3.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }

  :after {
    left: 3.5em;
  }
`;

export const DivMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 30px;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.9);
  width: 80%;
  z-index: 2;

  @media (max-width: 37em) {
    width: 90%;
  }
`;

export const DivSorriso = styled.div`
  position: absolute;
  top: 58%;
  left: 70px;
  width: 58%;

  img {
    width: 30%;
  }
`;

export const DivButton = styled.div`
  bottom: 15px;
  position: absolute;
  width: 100%;
  z-index: 1;
`;

export const Button = styled.button`
  width: 40%;
  height: 50px;
  text-decoration: none;
  text-align: center;
  font-size: 25px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.7);
  letter-spacing: -0.065em;
  font-family: "Hammersmith One", sans-serif;
  -webkit-transition: all 0.25s ease-in-out;
  -o-transition: all 0.25s ease-in-out;
  -moz-transition: all 0.25s ease-in-out;
  transition: all 0.25s ease-in-out;
  box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.2);
  border-radius: 50px;
  z-index: 1;
  border-width: 4px;
  border-style: solid;

  background-color: rgb(176, 216, 59);
  color: rgb(73, 83, 92);
  border-color: rgba(0, 63, 71, 0.2);
`;
