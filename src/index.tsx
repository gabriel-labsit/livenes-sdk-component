import React from "react";
import SdkSettings from "./Interfaces/Settings/SdkSettings";

import { IniciarFluxo, iniciarCamera } from "./SdkInitializer";
import GlobalStyles, {
  Content,
  Container,
  OuterR4x3,
  Inner,
  Overlay,
  ContentVideo,
  Video,
  DivLoader,
  Loader,
  DivMessage,
  DivSorriso,
  DivButton,
  Button,
} from "./styles";

interface ComponentInterface {
  settings: SdkSettings;
}

const LivenessComponent: React.FC<ComponentInterface> = ({ settings }) => {
  return (
    <>
      <GlobalStyles />
      <Content id="content">
        <Container id="container">
          <OuterR4x3>
            <Inner>
              <Overlay id="overlay" />

              <ContentVideo id="content-video">
                <Video id="player" />
              </ContentVideo>

              <DivLoader id="divLoader" style={{ display: "none" }}>
                <Loader />
              </DivLoader>

              <DivMessage id="divMsg" style={{ display: "none" }}>
                <img id="imgMsg" />
                <span id="spanMsg">CLIQUE EM INICIAR</span>
              </DivMessage>

              <DivSorriso id="divSorriso" style={{ display: "none" }}>
                <img id="imgChallenge" />
              </DivSorriso>

              <DivButton id="divButton">
                <Button id="btnIniciar" onClick={() => IniciarFluxo(settings)}>
                  INICIAR
                </Button>
              </DivButton>
            </Inner>
          </OuterR4x3>
        </Container>

        <canvas id="fc_canvas" style={{ display: "none" }}></canvas>
      </Content>
    </>
  );
};

export { LivenessComponent as default, iniciarCamera };
