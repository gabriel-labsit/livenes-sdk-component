import React from "react";
import SdkSettings from "./Interfaces/Settings/SdkSettings";
import { iniciarCamera } from "./SdkInitializer";
interface ComponentInterface {
    settings: SdkSettings;
}
declare const LivenessComponent: React.FC<ComponentInterface>;
export { LivenessComponent as default, iniciarCamera };
