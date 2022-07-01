import React from "react";
// import "./index.css";
import SdkSettings from "./Interfaces/Settings/SdkSettings";

import { IniciarFluxo, IniciarCamera } from "./SdkInitializer";

interface ComponentInterface {
  settings: SdkSettings;
}

import {
  StyledButton,
  StyledCanvas,
  StyledDiv,
  StyledDiv_10,
  StyledDiv_11,
  StyledDiv_2,
  StyledDiv_3,
  StyledDiv_4,
  StyledDiv_5,
  StyledDiv_6,
  StyledDiv_7,
  StyledDiv_8,
  StyledDiv_9,
  StyledImg,
  StyledImg_2,
  StyledSpan,
  StyledVideo,
} from "./styles";

const LivenessComponent: React.FC<ComponentInterface> = ({ settings }) => {
  return (
    <StyledDiv id="content">
      <StyledDiv_2 id="container">
        <StyledDiv_3>
          <StyledDiv_4>
            <StyledDiv_5 />

            <StyledDiv_6 id="content-video">
              <StyledVideo id="player" />
            </StyledDiv_6>

            <StyledDiv_7 id="divLoader">
              <StyledDiv_8 />
            </StyledDiv_7>

            <StyledDiv_9 id="divMsg">
              <StyledImg id="imgMsg" />
              <StyledSpan id="spanMsg">CLIQUE EM INICIAR</StyledSpan>
            </StyledDiv_9>

            <StyledDiv_10 id="divSorriso">
              <StyledImg_2 id="imgChallenge" />
            </StyledDiv_10>

            <StyledDiv_11 id="divButton">
              <StyledButton id="btnIniciar">INICIAR</StyledButton>
            </StyledDiv_11>
          </StyledDiv_4>
        </StyledDiv_3>
      </StyledDiv_2>
      <StyledCanvas id="fc_canvas" />
    </StyledDiv>

    // <div id="content" className="content">
    //   <div id="container" className="container">
    //     <div className="outer r4x3">
    //       <div className="inner">
    //         <div id="overlay" className="overlay"></div>

    //         <div id="content-video" className="content-video">
    //           <video id="player"></video>
    //         </div>

    //         <div id="divLoader">
    //           <div className="loader"></div>
    //         </div>

    //         <div id="divMsg">
    //           <img id="imgMsg" />
    //           <span id="spanMsg">CLIQUE EM INICIAR</span>
    //         </div>

    //         <div id="divSorriso">
    //           <img id="imgChallenge" />
    //         </div>

    //         <div id="divButton">
    //           <button
    //             id="btnIniciar"
    //             onClick={() => IniciarFluxo(settings)}
    //             className="rect green"
    //           >
    //             INICIAR
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>

    //   <canvas id="fc_canvas" style={{ display: "none" }}></canvas>
    // </div>
  );
};

export { LivenessComponent as default, IniciarCamera };
