import React from "react";
import "./index.css";
import SdkSettings from "./Interfaces/Settings/SdkSettings";
interface ComponentInterface {
    settings: SdkSettings;
}
declare const LivenessComponent: React.FC<ComponentInterface>;
export default LivenessComponent;
