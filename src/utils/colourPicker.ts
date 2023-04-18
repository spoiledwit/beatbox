import ImageColors from "react-native-image-colors";

export type ColorType = {
  value: string | null | undefined;
  name: string;
} | null;

export type Colors = {
  colorOne: ColorType;
  colorTwo: ColorType;
  colorThree: ColorType;
  colorFour: ColorType;
};

export const getColors = async (url: string): Promise<Colors | null> => {
  let colors: Colors = {
    colorOne: null,
    colorTwo: null,
    colorThree: null,
    colorFour: null,
  };

  try {
    const result = await ImageColors.getColors(url, {
      fallback: "#000000",
      quality: "low",
      pixelSpacing: 5,
      cache: true,
      headers: {
        authorization: "Basic 123",
      },
    });

    switch (result.platform) {
      case "android":
      case "web":
        colors = {
          colorOne: { value: result.lightVibrant, name: "lightVibrant" },
          colorTwo: { value: result.dominant, name: "dominant" },
          colorThree: { value: result.vibrant, name: "vibrant" },
          colorFour: { value: result.darkVibrant, name: "darkVibrant" },
        };
        break;
      case "ios":
        colors = {
          colorOne: { value: result.background, name: "background" },
          colorTwo: { value: result.detail, name: "detail" },
          colorThree: { value: result.primary, name: "primary" },
          colorFour: { value: result.secondary, name: "secondary" },
        };
        break;
      default:
        return null;
    }
    

  } catch (error) {
    console.error(error);
    return null;
  }

  return colors;
};
