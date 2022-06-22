# Liveness component

Primeiro, realizar a instalação do component

```sh
yarn add livenes-sdk-component
```

Para chamar o componente

```ts
// ====== IMPORTS
import LivenessComponent from "livenes-sdk-component";
import SdkSettings from "livenes-sdk-component/dist/Interfaces/Settings/SdkSettings";

// ====== Modo 1
// Utilizando uma const para setar os dados.
function App() {
  const sdkSettings: SdkSettings = {} as SdkSettings;

  return <LivenessComponent settings={sdkSettings} />;
}

// ====== Modo 2
// Settando as informações via desestruturação
function App() {
  return (
    <LivenessComponent
      settings={{
        cpf: "",
        fcvarUrlbase: "",
        nascimento: "",
        nome: "",
        user: "",
        pass: "",
      }}
    />
  );
}
```
