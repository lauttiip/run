import * as React from "react";
import Svg, { Rect, Path } from "react-native-svg";
export const Logo = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Strava"
    viewBox="0 0 512 512"
    {...props}
  >
    <Rect width={512} height={512} fill="#fc4c01" rx="15%" />
    <Path fill="#fff" d="M120 288 232 56l112 232h-72l-40-96-40 96z" />
    <Path fill="#fda580" d="m280 288 32 72 32-72h48l-80 168-80-168z" />
  </Svg>
);
