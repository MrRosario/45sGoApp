import { scaleFont } from "./mixins";

const Font = {
  FAMILY: {
    REGULAR: "Ubuntu-Regular",
    LIGHT: "Ubuntu-Light",
    BOLD: "Ubuntu-Bold",
    MEDIUM: "Ubuntu-Medium",
  },
  WEIGHT: {
    LIGHT: "300",
    REGULAR: "400",
    MEDIUM: "500",
    SEMI_BOLD: "600",
    BOLD: "700",
    EXTRA_BOLD: "800",
    BLACK: "900",
  },
  SIZE: {
    SIZE_10: scaleFont(10),
    SIZE_12: scaleFont(12),
    SIZE_14: scaleFont(14),
    SIZE_16: scaleFont(16),
    SIZE_18: scaleFont(18),
    SIZE_20: scaleFont(20),
    SIZE_22: scaleFont(22),
    SIZE_25: scaleFont(25),
    SIZE_30: scaleFont(30),
    SIZE_60: scaleFont(60),
  },
  LINE_HEIGHT: {
    _16: scaleFont(16),
    _20: scaleFont(20),
    _23: scaleFont(23),
    _24: scaleFont(24),
  },
};

export default Font;
