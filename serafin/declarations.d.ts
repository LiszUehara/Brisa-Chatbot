declare module "*.svg" {
    import React from "react";
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
}
declare module '@env' {
    export const API_KEY_GPT: string;
    export const API_KEY_SEFIN: string;
  }