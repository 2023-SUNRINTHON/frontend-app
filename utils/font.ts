export const Pretendard = {
  Thin: "Pretendard-Thin",
  ExtraLight: "Pretendard-ExtraLight",
  Light: "Pretendard-Light",
  Regular: "Pretendard",
  Medium: "Pretendard-Medium",
  SemiBold: "Pretendard-SemiBold",
  Bold: "Pretendard-Bold",
  ExtraBold: "Pretendard-ExtraBold",
  Black: "Pretendard-Black",
  100: "Pretendard-Thin",
  200: "Pretendard-ExtraLight",
  300: "Pretendard-Light",
  400: "Pretendard",
  500: "Pretendard-Medium",
  600: "Pretendard-SemiBold",
  700: "Pretendard-Bold",
  800: "Pretendard-ExtraBold",
  900: "Pretendard-Black",
} as const;

export type Pretendard = (typeof Pretendard)[keyof typeof Pretendard];

type Props = {
  size: number;
  weight?: Pretendard;
  color?: string;
  lineHeight?: number;
  align?: "left" | "center" | "right";
};

export function Font(style: Props) {
  let { size, weight, color } = style;
  weight = weight || Pretendard.Regular;
  color = color || "#000000";

  return {
    fontFamily: weight,
    fontSize: size,
    color: color,
    lineHeight: style.lineHeight,
    textAlign: style.align,
  };
}
