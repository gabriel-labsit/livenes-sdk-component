import React from "react";
import "./index.css";
import SdkSettings from "./Interfaces/Settings/SdkSettings";

import { IniciarFluxo } from "./SdkInitializer";

interface ComponentInterface {
  settings: SdkSettings;
}

const LivenessComponent: React.FC<ComponentInterface> = ({ settings }) => {
  return (
    <div id="content" className="content">
      <div id="container" className="container">
        <div className="outer r4x3">
          <div className="inner">
            {/* <div id="divPowered">
              <span className="spanMsg" th:text="#{liveness_msgPowered}">
                Powered by Oiti Technologies
              </span>
            </div> */}
            <div id="overlay" className="overlay"></div>

            <div id="content-video" className="content-video">
              <video id="player"></video>
            </div>

            <div id="divLoader">
              <div className="loader"></div>
            </div>

            <div id="divMsg">
              <img id="imgMsg" />
              <span id="spanMsg">CLIQUE EM INICIAR</span>
            </div>

            <div id="divSorriso">
              <img id="imgChallenge" />
            </div>

            <div id="divButton">
              <button
                id="btnIniciar"
                onClick={() => IniciarFluxo(settings)}
                className="rect green"
              >
                INICIAR
              </button>
            </div>
          </div>
        </div>
      </div>

      <canvas id="fc_canvas"></canvas>
    </div>
  );
};

export default LivenessComponent;
