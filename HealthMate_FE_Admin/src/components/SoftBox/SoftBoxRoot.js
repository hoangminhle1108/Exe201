// @mui material components
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export default styled(Box)(({ theme, ownerState }) => {
  const { palette, functions, borders = {}, boxShadows } = theme; // Add fallback for `borders`
  const { variant, bgColor, color, opacity, borderRadius, shadow } = ownerState;

  const { gradients, grey, white } = palette;
  const { linearGradient } = functions || {};

  // Fallback for `radius` if `borders` is not defined or is empty
  const { borderRadius: radius = {} } = borders;

  // Debugging: Check what `radius` and `borderRadius` are
  console.log("radius:", radius);
  console.log("borderRadius (ownerState):", borderRadius);

  const greyColors = {
    "grey-100": grey[100],
    "grey-200": grey[200],
    "grey-300": grey[300],
    "grey-400": grey[400],
    "grey-500": grey[500],
    "grey-600": grey[600],
    "grey-700": grey[700],
    "grey-800": grey[800],
    "grey-900": grey[900],
  };

  const validGradients = [
    "primary", "secondary", "info", "success", "warning", "error", "dark", "light",
  ];

  const validColors = [
    "transparent", "white", "black", "primary", "secondary", "info", "success", "warning",
    "error", "light", "dark", "text", "grey-100", "grey-200", "grey-300", "grey-400",
    "grey-500", "grey-600", "grey-700", "grey-800", "grey-900",
  ];

  const validBorderRadius = ["xs", "sm", "md", "lg", "xl", "xxl", "section"];
  const validBoxShadows = ["xs", "sm", "md", "lg", "xl", "xxl", "inset"];

  // background value
  let backgroundValue = bgColor;

  if (variant === "gradient") {
    backgroundValue = validGradients.find((el) => el === bgColor)
      ? linearGradient(gradients[bgColor].main, gradients[bgColor].state)
      : white.main;
  } else if (validColors.find((el) => el === bgColor)) {
    backgroundValue = palette[bgColor] ? palette[bgColor].main : greyColors[bgColor];
  } else {
    backgroundValue = bgColor;
  }

  // color value
  let colorValue = color;

  if (validColors.find((el) => el === color)) {
    colorValue = palette[color] ? palette[color].main : greyColors[color];
  }

  // borderRadius value
  let borderRadiusValue = borderRadius;

  // Debugging: Log the value of `borderRadius` before accessing it
  console.log("Attempting to set borderRadiusValue:", borderRadiusValue);

  // Check if radius and borderRadius are both valid, and if the radius[borderRadius] exists
  if (validBorderRadius.includes(borderRadius) && radius && radius[borderRadius]) {
    borderRadiusValue = radius[borderRadius];
  } else {
    // Log the fallback logic if the value is undefined
    console.log("Using fallback borderRadius:", radius['md'] || '4px');
    // Use a fallback value if radius is not defined for the given borderRadius
    borderRadiusValue = radius['md'] || '4px'; // Default fallback to 'md' or '4px' if not found
  }

  // boxShadow value
  let boxShadowValue = boxShadows;

  if (validBoxShadows.find((el) => el === shadow)) {
    boxShadowValue = boxShadows[shadow];
  }

  return {
    opacity,
    background: backgroundValue,
    color: colorValue,
    borderRadius: borderRadiusValue,
    boxShadow: boxShadowValue,
  };
});
