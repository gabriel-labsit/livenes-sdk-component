Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
require('./index.css');
var CryptoJS = require('crypto-js');
var Swal = require('sweetalert2');
var $ = require('jquery');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var CryptoJS__default = /*#__PURE__*/_interopDefaultLegacy(CryptoJS);
var Swal__default = /*#__PURE__*/_interopDefaultLegacy(Swal);
var $__default = /*#__PURE__*/_interopDefaultLegacy($);

var BiometricIds = {
    biometricCodID: "Não foram detectados movimentos corretos. Vamos repetir o processo.",
    100.1: "Face não encontrada.",
    100.2: "Posicionamento não frontal.",
    100.3: "Você está muito próximo a câmera.",
    100.4: "Você está muito longe da câmera.",
    100.5: "Existe mais de uma face nas imagens.",
    100.6: "Iluminação inadequada.",
    200.1: "Face enviada não é a face cadastrada, ou tem similar com cpf diferente.",
    300.1: "Você não executou os desafios de forma adequada.",
};

// Default Objects
var GeneralInformation = {
    infoTitle: "Informação",
    gettingStarted: "Iniciando...",
    wait: "Aguarde...",
    finishedTitle: "Finalizado",
    finishedMsg: "A validação biométrica foi finalizada.",
};

var ErrorChallenge = {
    errorStartChallengeTitle: "Oops!",
    errorStartChallengeMsg: "Tivemos um problema ao tentar iniciar os desafios, mas podemos tentar novamente.",
    errorStopChallengeTitle: "Oops!",
    errorStopChallengeMsg: "Ocorreu um problema ao tentar validar os desafios.",
};

var fcvarUrlbase = "https://comercial.certiface.com.br:443";
var appkey = "";
var fcvarChkey;
var fcvarChallenge = "";
var fcvarTime;
var fcvarSnapFrequenceInMillis = 0;
var fcvarIntervalSnap;
var fcvarIntervalChallege;
var fcvarIntervalTimer;
// foto
var fcvarCurCha;
var fcvarSnaps = "";
var fcvarFirstSnap = "";
// inicia captura dos desafios.
function startCapture(appKeyParameter) {
    appkey = appKeyParameter;
    // esconde o botão e exibe loader
    $__default["default"]("#divButton").fadeOut();
    $__default["default"]("#divLoader").fadeIn();
    $__default["default"]("#spanMsg").text(GeneralInformation.gettingStarted);
    $__default["default"]("#divMsg").fadeIn(1000, function () {
        startChallenge("");
    });
}
// Busca novos desafios
function startChallenge(p) {
    var data = "?nc=" + new Date().getTime() + "&appkey=" + appkey + "&p=" + p;
    $__default["default"].support.cors = true;
    $__default["default"].ajax({
        type: "POST",
        url: fcvarUrlbase + "/facecaptcha/service/captcha/challenge",
        data: data,
        crossDomain: true,
        async: true,
        headers: {
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
        },
        success: function (response) {
            try {
                // resposta da requisição dos desafios
                response = JSON.parse(decChData(response));
                fcvarChkey = response.chkey; // chave da requisição
                fcvarChallenge = response.challenges; // desafios da requisição   [2]
                fcvarTime = response.totalTime; // tempo total de todos os desafios (seg)   [8]
                fcvarSnapFrequenceInMillis = response.snapFrequenceInMillis; // tempo para cada snap (mseg)  [1990]
                $__default["default"]("#divLoader").fadeOut(700);
                $__default["default"]("#divMsg").fadeOut(700, function () {
                    // prepara os desafios
                    prepareChallenge();
                });
            }
            catch (e) {
                console.log(e);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("ERROR");
            Swal__default["default"].fire({
                title: "errorStartChallengeTitle",
                text: "errorStartChallengeMsg",
                confirmButtonText: "btnTryAgain",
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            }).then(function () { return location.reload(); });
        },
    });
}
// Preparar desafios
function prepareChallenge() {
    // Intervalo de captura de image do video
    fcvarIntervalSnap = setInterval(function () {
        snapTick();
    }, fcvarSnapFrequenceInMillis);
    // aguarda fcvarTime em segundos para finalizar os desafios
    fcvarIntervalTimer = setInterval(function () {
        clearInterval(fcvarIntervalSnap);
        clearInterval(fcvarIntervalChallege);
        clearInterval(fcvarIntervalTimer);
        $__default["default"]("#divMsg").fadeOut(700, function () {
            stopChallenge();
        });
    }, fcvarTime * 1000);
    // exibe os desafios na tela
    showChallengeTick(fcvarChallenge, 0);
}
// Exibir desafios
function showChallengeTick(challenges, i) {
    fcvarCurCha = challenges[i];
    $__default["default"]("#imgMsg").attr("src", "");
    $__default["default"]("#spanMsg").text("");
    $__default["default"]("#divMsg").hide();
    $__default["default"]("#divSorriso").hide();
    // atribui imagem Desafio (msg)
    $__default["default"]("#imgMsg").attr("src", "data:image/png;base64," + challenges[i].mensagem);
    $__default["default"]("#divMsg").fadeIn();
    $__default["default"]("#divMsg").fadeOut(challenges[i].tempoEmSegundos * 1000); //exibe a mensagem do desafio pelo periodo de challenges[i].tempoEmSegundos
    // atribui imagem Desafio (emojji)
    $__default["default"]("#imgChallenge").attr("src", "data:image/png;base64," + challenges[i].tipoFace.imagem);
    $__default["default"]("#divSorriso").fadeIn();
    $__default["default"]("#divSorriso").fadeOut(challenges[i].tempoEmSegundos * 1000); //exibe o emojji do desafio pelo periodo de challenges[i].tempoEmSegundos
    fcvarIntervalChallege = setTimeout(function () {
        // Proximo desafio. Recursive
        showChallengeTick(challenges, ++i);
    }, challenges[i].tempoEmSegundos * 1000);
}
// prepara captura de imagem
function snapTick() {
    var snapb64 = snap();
    var snaps = [];
    if (fcvarFirstSnap === "") {
        fcvarFirstSnap = snapb64;
    }
    // necessario adicionar o codigo do tipoFace entre o 'data:image/jpeg' e o snapb64
    snaps = snapb64.split("data:image/jpeg;base64,");
    snapb64 =
        "data:image/jpeg;base64," +
            snaps[0] +
            "type:" +
            fcvarCurCha.tipoFace.codigo +
            "," +
            snaps[1];
    fcvarSnaps += snapb64;
}
// captura imagem da câmera
function snap() {
    var video = document.querySelector("video");
    var canvas = document.getElementById("fc_canvas");
    var ctx = canvas.getContext("2d");
    ctx.canvas.width = 320;
    ctx.canvas.height = 480;
    var ratio = video.videoWidth / video.videoHeight;
    var widthReal = 0, heightReal = 0;
    var startX = 0, startY = 0;
    if (ratio >= 1) {
        // paisagem
        widthReal = video.videoHeight / 1.5;
        heightReal = video.videoHeight;
        startX = (video.videoWidth - widthReal) / 2;
        startY = 0;
    }
    else {
        // retrato
        ratio = video.videoHeight / video.videoWidth;
        // verifica proporção
        if (ratio > 1.5) {
            widthReal = video.videoWidth;
            heightReal = video.videoWidth * 1.5;
            startX = 0;
            startY = (video.videoHeight - heightReal) / 2;
        }
        else {
            widthReal = video.videoHeight / 1.5;
            heightReal = video.videoHeight;
            startX = (video.videoWidth - widthReal) / 2;
            startY = 0;
        }
    }
    // crop image video
    ctx.drawImage(video, startX, startY, widthReal, heightReal, 0, 0, ctx.canvas.width, ctx.canvas.height);
    var img = new Image();
    img.src = canvas.toDataURL("image/jpeg");
    return img.src;
}
// finaliza desafios
function stopChallenge() {
    $__default["default"]("#imgMsg").attr("src", "");
    $__default["default"]("#divLoader").fadeIn();
    $__default["default"]("#spanMsg").text(GeneralInformation.wait);
    $__default["default"]("#divMsg").fadeIn();
    // encripta as imagens
    var data = $__default["default"].param({
        appkey: appkey,
        chkey: fcvarChkey,
        images: encChData(fcvarSnaps),
    });
    $__default["default"].support.cors = true;
    $__default["default"].ajax({
        type: "POST",
        url: fcvarUrlbase +
            "/facecaptcha/service/captcha" +
            "?nc=" +
            new Date().getTime(),
        crossDomain: true,
        async: true,
        headers: {
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        data: data,
        success: function (response) {
            $__default["default"]("#divLoader").fadeOut();
            $__default["default"]("#divMsg").fadeOut();
            response.snap = fcvarFirstSnap;
            if (response.valid) {
                // passou no prova de vida e biometria
                checkAnimStart();
            }
            else {
                // reprovou no prova de vida ou na biometria
                crossAnimStart(response);
            }
            // informa resltados
            onFinishFaceCaptcha(response);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $__default["default"]("#divLoader").fadeOut();
            Swal__default["default"].fire({
                title: ErrorChallenge.errorStopChallengeTitle,
                text: ErrorChallenge.errorStopChallengeMsg,
                confirmButtonText: "btnTryAgain",
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
            }).then(function () { return location.reload(); });
        },
        beforeSend: function (xhr) { },
    });
}
// exibe mensagem de sucesso
function checkAnimStart() {
    Swal__default["default"].fire({
        title: GeneralInformation.finishedTitle,
        text: GeneralInformation.finishedMsg,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
    }).then(function () { return location.reload(); });
}
// exibe informação de insucesso
function crossAnimStart(responseCaptcha) {
    var codID = responseCaptcha.codID;
    var msg = BiometricIds[codID] || BiometricIds.biometricCodID;
    Swal__default["default"].fire({
        title: GeneralInformation.infoTitle,
        text: msg,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
    }).then(function () { return location.reload(); });
}
// use este metodo para informar o backend
function onFinishFaceCaptcha(response) {
    console.log("onFinishFaceCaptcha");
    console.log(response);
    /*
      Ex:
      $.ajax({
          type: 'POST',
          url: '/result',
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(response),
          dataType: 'json',
          success: function(res){
              // sucesso
          },
          error: function(res){
              // ops!
          }
      });
      */
}
/* SECURITY */
function padMsg(source) {
    var paddingChar = " ";
    var size = 16;
    var x = source.length % size;
    var padLength = size - x;
    for (var i = 0; i < padLength; i++)
        source += paddingChar;
    return source;
}
function padKey(source) {
    if (source.length > 16) {
        return source.substring(0, 16);
    }
    return padMsg(source);
}
function decChData(data) {
    var key = CryptoJS__default["default"].enc.Latin1.parse(padKey(appkey));
    var iv = CryptoJS__default["default"].enc.Latin1.parse(padKey(appkey.split("").reverse().join("")));
    var decripted2 = CryptoJS__default["default"].enc.Utf8.stringify(CryptoJS__default["default"].AES.decrypt(data, key, {
        iv: iv,
        padding: CryptoJS__default["default"].pad.NoPadding,
        mode: CryptoJS__default["default"].mode.CBC,
    }));
    decripted2 = decripted2.substring(0, decripted2.lastIndexOf("}") + 1);
    decripted2 = decripted2.trim();
    return decripted2;
}
function encChData(data) {
    //var appkey = appkey;
    var key = CryptoJS__default["default"].enc.Latin1.parse(padKey(appkey));
    var iv = CryptoJS__default["default"].enc.Latin1.parse(padKey(appkey.split("").reverse().join("")));
    var result = CryptoJS__default["default"].AES.encrypt(padMsg(data), key, {
        iv: iv,
        padding: CryptoJS__default["default"].pad.Pkcs7,
        mode: CryptoJS__default["default"].mode.CBC,
    }).toString();
    return encodeURIComponent(result);
}

var sdkSettings = {};
var IniciarFluxo = function (settings) {
    sdkSettings = settings;
    var vazio = false;
    // Checando se o objeto tem algum atributo vazio.
    for (var _i = 0, _a = Object.keys(sdkSettings); _i < _a.length; _i++) {
        var key = _a[_i];
        if (!sdkSettings[key]) {
            console.log("A key ".concat(key, " t\u00E1 vazia!"));
            vazio = true;
            break;
        }
    }
    if (vazio)
        return;
    gerarCredencial();
};
// Gera credencial de acesso. Deve ser feita no backend
var gerarCredencial = function () {
    var data = $__default["default"].param({
        user: sdkSettings.user,
        pass: sdkSettings.pass,
    });
    console.log("gerei a credencial.");
    $__default["default"].support.cors = true;
    $__default["default"].ajax({
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
        success: function (data) {
            // ex: {"token":"V-zI5XK4bnlNVPSByxMeR9cHFpvAcdBypEFLU649aEQ","expires":"24/01/2019 22:51:20"}
            gerarAppkey(data);
        },
        error: function (xhr, textStatus) {
            console.log(textStatus);
            console.log(xhr);
        },
    });
};
// Gera appkey de acesso. Deve ser feita no backend.
var gerarAppkey = function (chavePrivada) {
    var data = $__default["default"].param({
        user: sdkSettings.user,
        token: JSON.stringify(chavePrivada),
        cpf: sdkSettings.cpf,
        nome: sdkSettings.nome,
        nascimento: sdkSettings.nascimento,
    });
    console.log("gerei a appkey.");
    $__default["default"].support.cors = true;
    $__default["default"].ajax({
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
        success: function (data) {
            // ex: {"appkey":"HS256.payload.secret"}
            var appkey = data.appkey;
            // inicializa captura dos desafios.
            startCapture(appkey);
        },
        error: function (xhr, textStatus) {
            console.log(textStatus);
            console.log(xhr);
        },
    });
};

var OitiLivenessComponent = function (_a) {
    var settings = _a.settings;
    return (React__default["default"].createElement("div", { id: "content", className: "content" },
        React__default["default"].createElement("div", { id: "container", className: "container" },
            React__default["default"].createElement("div", { className: "outer r4x3" },
                React__default["default"].createElement("div", { className: "inner" },
                    React__default["default"].createElement("div", { id: "overlay", className: "overlay" }),
                    React__default["default"].createElement("div", { id: "content-video", className: "content-video" },
                        React__default["default"].createElement("video", { id: "player" })),
                    React__default["default"].createElement("div", { id: "divLoader" },
                        React__default["default"].createElement("div", { className: "loader" })),
                    React__default["default"].createElement("div", { id: "divMsg" },
                        React__default["default"].createElement("img", { id: "imgMsg" }),
                        React__default["default"].createElement("span", { id: "spanMsg" }, "CLIQUE EM INICIAR")),
                    React__default["default"].createElement("div", { id: "divSorriso" },
                        React__default["default"].createElement("img", { id: "imgChallenge" })),
                    React__default["default"].createElement("div", { id: "divButton" },
                        React__default["default"].createElement("button", { id: "btnIniciar", onClick: function () { return IniciarFluxo(settings); }, className: "rect green" }, "INICIAR"))))),
        React__default["default"].createElement("canvas", { id: "fc_canvas" })));
};

exports["default"] = OitiLivenessComponent;
//# sourceMappingURL=index.js.map
