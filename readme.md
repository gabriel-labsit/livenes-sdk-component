# Liveness component

Primeiro, realizar a instalação do component

```sh
yarn add livenes-sdk-component
```

Para chamar o componente

```ts
// ====== Modo 1
interface SdkSettings {
    cpf: string,
    fcvarUrlbase: string,
    nascimento: string,
    nome: string,
    user: string,
    pass: string,
};

// Objeto com as informações
const settings: SdkSettings = { } as SdkSettings;

// Passando esse objeto de configuração
<LivenessComponent settings={settings} />


// ====== Modo 2
// Settando as informações via desestruturação
<LivenessComponent settings={{ cpf: "", fcvarUrlbase: "", nascimento: "", nome: "", user: "", pass: "" }} />;
```
