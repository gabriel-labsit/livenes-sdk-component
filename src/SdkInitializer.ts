import SdkSettings from "./Interfaces/Settings/SdkSettings";
import { startCapture, startCamera } from "./Componentes/Sdk";
import jQuery from "jquery";
import Token from "./Interfaces/Responses/Token";

let sdkSettings: SdkSettings = {} as SdkSettings;
export const IniciarFluxo = (settings: SdkSettings) => {
  sdkSettings = settings;
  let vazio: boolean = false;

  // Checando se o objeto tem algum atributo vazio.
  for (let key of Object.keys(sdkSettings))
    if (!sdkSettings[key]) {
      console.log(`A key ${key} tá vazia!`);
      vazio = true;
      break;
    }

  if (vazio) return;

  gerarCredencial();
};

export const iniciarCamera = () => startCamera();

// Gera credencial de acesso. Deve ser feita no backend
const gerarCredencial = () => {
  var data = jQuery.param({
    user: sdkSettings.user,
    pass: sdkSettings.pass,
  });

  // console.log("gerei a credencial.");

  jQuery.support.cors = true;
  jQuery.ajax({
    type: "POST",
    url: sdkSettings.fcvarUrlbase + "/facecaptcha/service/captcha/credencial",
    data: data,
    crossDomain: true,
    async: true,
    headers: {
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    success: (data) => {
      // ex: {"token":"V-zI5XK4bnlNVPSByxMeR9cHFpvAcdBypEFLU649aEQ","expires":"24/01/2019 22:51:20"}
      gerarAppkey(data);
    },
    error: (xhr, textStatus) => {
      console.log(textStatus);
      console.log(xhr);
    },
  });
};

// Gera appkey de acesso. Deve ser feita no backend.
const gerarAppkey = (chavePrivada: Token) => {
  var data = jQuery.param({
    user: sdkSettings.user,
    token: JSON.stringify(chavePrivada),
    cpf: sdkSettings.cpf,
    nome: sdkSettings.nome,
    nascimento: sdkSettings.nascimento,
  });

  console.log("gerei a appkey.");

  jQuery.support.cors = true;
  jQuery.ajax({
    type: "POST",
    url: sdkSettings.fcvarUrlbase + "/facecaptcha/service/captcha/appkey",
    data: data,
    crossDomain: true,
    async: true,
    headers: {
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
    },
    success: (data) => {
      // ex: {"appkey":"HS256.payload.secret"}
      let appkey = data.appkey;
      // inicializa captura dos desafios.
      startCapture(appkey);
    },
    error: (xhr, textStatus) => {
      console.log(textStatus);
      console.log(xhr);
    },
  });
};
