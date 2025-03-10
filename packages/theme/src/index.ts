import { grabbingCursor,grabCursor } from "./cursors";

export const camelToKebab = (s: string) => {
  if (typeof s !== 'string') return '';
  return s
    .replace(/-/g, '_')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
    .toLowerCase()
    .replace(/(\D+)(\d+)$/g, '$1-$2')
    .replace(/\s|_/g, '-');
};

const toCSSCursor = (cursor: string, fallbacks: string[]) => {
  return `url(${cursor}), ${fallbacks.join(', ')}`;
}

type Kebab<
  T extends string,
  A extends string = ''
> = T extends `${infer F}${infer R}`
  ? Kebab<R, `${A}${F extends Lowercase<F> ? '' : '-'}${Lowercase<F>}`>
  : A;

export type AffineTheme = typeof lightTheme & {
  editorMode: 'page' | 'edgeless';
};

export type AffineCssVariables = {
  [Key in `--affine-${Kebab<keyof AffineTheme>}`]: string;
};

const basicFontFamily =
  `apple-system, BlinkMacSystemFont,'Helvetica Neue', Tahoma, 'PingFang SC', 'Microsoft Yahei', Arial,'Hiragino Sans GB', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji','Segoe UI Symbol', 'Noto Color Emoji'`;

export const baseTheme = {
  // font
  fontFamily: `'Inter', 'Source Sans 3', Poppins, ${basicFontFamily}`,
  fontSerifFamily: `'Source Serif 4', 'Noto Serif' , serif, 'Cambria', ${basicFontFamily}`,
  fontMonoFamily: `'Source Code Pro', 'IBM Plex Mono', 'Roboto Mono','Noto Sans Mono', 'Noto Sans CJK',  ${basicFontFamily}`,
  fontSansFamily: `'Inter', 'Source Sans 3', Poppins, ${basicFontFamily}`,

  fontNumberFamily: `'Roboto Mono', 'Noto Sans Mono', ${basicFontFamily}`,
  fontCodeFamily: `'Space Mono', Consolas, Menlo, Monaco, Courier, monospace, ${basicFontFamily}`,
  fontTitle: '36px',
  fontH1: '28px',
  fontH2: '26px',
  fontH3: '24px',
  fontH4: '22px',
  fontH5: '20px',
  fontH6: '18px',
  fontBase: '15px',
  fontSm: '14px',
  fontXs: '12px',

  lineHeight: 'calc(1em + 8px)',

  zIndexModal: '1000',
  zIndexPopover: '1000',

  paragraphSpace: '8px',
  popoverRadius: '12px',

  editorWidth: '944px',
  editorSidePadding:'96px',
  zoom: '1',
  scale: 'calc(1 / var(--affine-zoom))',
  paletteLineYellow: 'rgb(255, 211, 56)',
  paletteLineOrange: 'rgb(255, 175, 56)',
  paletteLineTangerine: 'rgb(250, 124, 69)',
  paletteLineRed: 'rgb(237, 63, 63)',
  paletteLineMagenta: 'rgb(230, 96, 164)',
  paletteLinePurple: 'rgb(110, 82, 223)',
  paletteLineNavy: 'rgb(59, 37, 204)',
  paletteLineBlue: 'rgb(79, 144, 255)',
  paletteLineGreen: 'rgb(124, 194, 112)',
  paletteLineWhite: 'rgb(255, 255, 255)',
  paletteLineBlack: 'rgb(35, 35, 35)',
  paletteLineGrey: 'rgb(191, 192, 191)',
  paletteShapeYellow: 'rgb(255, 223, 107)',
  paletteShapeOrange: 'rgb(255, 196, 107)',
  paletteShapeTangerine: 'rgb(251, 161, 121)',
  paletteShapeRed: 'rgb(241, 111, 111)',
  paletteShapeMagenta: 'rgb(237, 140, 189)',
  paletteShapePurple: 'rgb(147, 126, 231)',
  paletteShapeNavy: 'rgb(122, 149, 246)',
  paletteShapeBlue: 'rgb(184, 227, 255)',
  paletteShapeGreen: 'rgb(157, 209, 148)',
  paletteShapeWhite: 'rgb(255, 255, 255)',
  paletteShapeBlack: 'rgb(35, 35, 35)',
  paletteShapeGrey: 'rgb(216, 217, 216)',
  multiPlayersPurple: 'rgba(123,97,255,1)',
  multiPlayersMagenta: 'rgba(245, 49, 179, 1)',
  multiPlayersRed: 'rgba(243,87,52,1)',
  multiPlayersOrange: 'rgba(255, 138, 0, 1)',
  multiPlayersGreen: 'rgba(27, 196, 125, 1)',
  multiPlayersBlue: 'rgba(24, 160, 251, 1)',
  multiPlayersBrown: 'rgba(154, 101, 51, 1)',
  multiPlayersGrey: 'rgba(170, 170, 170, 1)',
  blue: 'rgba(30, 150, 235, 1)',
  pureBlack: 'rgba(0, 0, 0, 1)',
  pureBlack10: 'rgba(0, 0, 0, 0.1)',
  pureBlack20: 'rgba(0, 0, 0, 0.2)',
  pureBlack80: 'rgba(0, 0, 0, 0.8)',
  pureWhite: 'rgba(255, 255, 255, 1)',
  pureWhite10: 'rgba(255, 255, 255, 0.1)',
  toggleCircleBackgroundColor: 'rgba(255, 255, 255, 1)',
  toggleDisableBackgroundColor: 'rgba(119, 117, 125, 1)',
  toggleCircleShadow:
    '0px 1px 2px 0px rgba(0, 0, 0, 0.25), inset -2px -3px 2px 0px rgba(0, 0, 0, 0.05)',
  buttonInnerShadow:
    ' 0px 1px 2px 0px rgba(255, 255, 255, 0.25) inset',
  multiCursorsShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.28)',
  multiPlayersShadow: '0px 1px 6px 0px rgba(0, 0, 0, 0.16)',

  // cursors
  grabbingCursor: toCSSCursor(grabbingCursor, ['grabbing']),
  grabCursor: toCSSCursor(grabCursor, ['grab'])
};

// Refs: https://github.com/toeverything/AFFiNE/issues/1796
export const lightTheme = {
  ...baseTheme,

  themeMode: 'light',

  brandColor: '#1E96EB',
  tertiaryColor: 'rgba(239, 250, 255, 1)',
  primaryColor: '#1E96EB',
  primaryColor04: 'rgba(30, 150, 235, 0.04)',
  secondaryColor: 'rgb(125, 145, 255)',

  blue50: 'rgba(239, 250, 255, 1)',
  blue100: 'rgba(219, 244, 254, 1)',
  blue200: 'rgba(191, 236, 254, 1)',
  blue300: 'rgba(147, 226, 253, 1)',
  blue400: 'rgba(96, 207, 250, 1)',
  blue500: 'rgba(58, 181, 247, 1)',
  blue600: 'rgba(30, 150, 235, 1)',
  blue700: 'rgba(28, 129, 217, 1)',
  blue800: 'rgba(30, 103, 175, 1)',
  blue900: 'rgba(30, 87, 138, 1)',
  blue950: 'rgba(23, 54, 84, 1)',

  backgroundSuccessColor: 'rgba(231, 250, 243, 1)',
  backgroundErrorColor: 'rgba(253, 236, 235, 1)',
  backgroundProcessingColor: 'rgba(233, 241, 255, 1)',
  backgroundWarningColor: 'rgba(255, 237, 219, 1)',
  backgroundPrimaryColor: 'rgb(255, 255, 255)',
  backgroundOverlayPanelColor: 'rgb(251, 251, 252)',
  backgroundSecondaryColor: 'rgba(244, 244, 245, 1)',
  backgroundTertiaryColor: 'rgb(238, 238, 238)',
  backgroundCodeBlock: 'rgba(247, 246, 250, 1)',
  backgroundModalColor: 'rgba(0, 0, 0, 0.75)',
  textPrimaryColor: 'rgb(66, 65, 73)',
  textSecondaryColor: 'rgb(142, 141, 145)',
  textDisableColor: 'rgb(169, 169, 173)',
  textEmphasisColor: '#1E96EB',
  hoverColor: 'rgba(0, 0, 0, 0.04)',
  hoverColorFilled: 'rgb(245, 245, 245)',
  linkColor: '#1E67AF',
  quoteColor: 'rgba(194, 193, 197, 1)',
  listColor: 'rgba(133, 131, 140, 1)',
  iconColor: 'rgb(119, 117, 125)',
  iconSecondary: 'rgba(119, 117, 125, 0.6)',
  borderColor: 'rgb(227, 226, 228)',
  dividerColor: 'rgb(227, 226, 228)',
  placeholderColor: 'rgb(192, 191, 193)',
  edgelessGridColor: 'rgb(230, 230, 230)',
  successColor: 'rgb(16, 203, 134)',
  warningColor: 'rgb(235, 67, 53)',
  errorColor: 'rgb(235, 67, 53)',
  processingColor: 'rgb(39, 118, 255)',
  black10: 'rgba(0, 0, 0, 0.1)',
  black30: 'rgba(0, 0, 0, 0.3)',
  black50: 'rgba(0, 0, 0, 0.5)',
  black60: 'rgba(0, 0, 0, 0.6)',
  black80: 'rgba(0, 0, 0, 0.8)',
  black90: 'rgba(0, 0, 0, 0.9)',
  black: 'rgb(0, 0, 0)',
  white10: 'rgba(255, 255, 255, 0.1)',
  white30: 'rgba(255, 255, 255, 0.3)',
  white50: 'rgba(255, 255, 255, 0.5)',
  white60: 'rgba(255, 255, 255, 0.6)',
  white80: 'rgba(255, 255, 255, 0.8)',
  white90: 'rgba(255, 255, 255, 0.9)',
  white: 'rgb(255, 255, 255)',
  tagWhite: 'rgba(245, 245, 245, 1)',
  tagGray: 'rgba(227, 226, 224, 1)',
  tagRed: 'rgba(255, 225, 225, 1)',
  tagOrange: 'rgba(255, 233, 201, 1)',
  tagYellow: 'rgba(255, 243, 215, 1)',
  tagGreen: 'rgba(222, 244, 231, 1)',
  tagTeal: 'rgba(222, 244, 243, 1)',
  tagBlue: 'rgba(225, 238, 255, 1)',
  tagPurple: 'rgba(243, 240, 255, 1)',
  tagPink: 'rgba(251, 231, 255, 1)',
  tooltip: 'rgba(0, 0, 0, 1)',
  menuShadow:
    '0px 0px 12px rgba(66, 65, 73, 0.14), inset 0px 0px 0px 0.5px rgba(227, 227, 228, 1)',
  activeShadow: '0px 0px 0px 2px rgba(30, 150, 235, 0.30)',
  shadow1: '0px 0px 4px 0px rgba(66, 65, 73, 0.14)',
  shadow2: '0px 0px 12px 0px rgba(66, 65, 73, 0.18)',
  shadow3: '0px 0px 20px 0px rgba(66, 65, 73, 0.22)',
  popoverShadow:
    '0px 0px 30px rgba(75, 75, 75, 0.2), 0px 0px 4px rgba(75, 75, 75, 0.3), inset 0px 0px 0px rgba(227, 226, 228, 1)',
  floatButtonShadow:
    '0px 0px 10px rgba(0, 0, 0, 0.05), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.1)',
  floatButtonShadow1:
    '0px 4px 6px -3px rgba(66, 65, 73, 0.10), 0px 10px 12px -2px rgba(66, 65, 73, 0.10)',
  floatButtonShadow2:
    '0px 4px 4px -2px rgba(66, 65, 73, 0.10), 0px 6px 8px 1px rgba(66, 65, 73, 0.05)',
  kanbanShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.05)',
  cmdShadow: '0px 10px 80px 0px rgba(0, 0, 0, 0.20)',
  largeButtonEffect: '0px 12px 21px 4px rgba(30, 150, 235, 0.15)',
  buttonGrayColor: 'rgba(245, 245, 245, 1)',
  cardBackgroundBlue: 'linear-gradient(180deg, #F0F3FD 0%, #FCFCFD 100%)',
  cardBackgroundGreen: 'linear-gradient(180deg, #F3F9FD 0%, #FCFCFD 100%)',
  cardBackgroundGrey: 'linear-gradient(180deg, #F1F1F1 0%, #FCFCFD 100%)',
  windowsCloseButton: '#C42B1C',
  textHighlightPink: 'rgba(255, 206, 206, 1)',
  textHighlightOrange: 'rgba(255, 203, 166, 1)',
  textHighlightYellow: 'rgba(255, 245, 171, 1)',
  textHighlightGreen: 'rgba(197, 251, 224, 1)',
  textHighlightTeal: 'rgba(198, 241, 243, 1)',
  textHighlightBlue: 'rgba(195, 219, 255, 1)',
  textHighlightPurple: 'rgba(227, 222, 255, 1)',
  textHighlightGrey: 'rgba(236, 241, 251, 1)',
};

export const darkTheme = {
  ...baseTheme,

  themeMode: 'dark',

  brandColor: '#1E96EB',
  primaryColor: '#1C9EE4',
  primaryColor04: 'rgba(52, 116, 173, 0.1)',
  secondaryColor: 'rgb(144, 150, 245)',
  tertiaryColor: 'rgb(30, 30, 30)',

  blue950: 'rgba(32, 45, 55, 1)',
  blue50: 'rgba(181, 208, 242, 1)',
  blue100: 'rgba(171, 204, 237, 1)',
  blue200: 'rgba(149, 194, 234, 1)',
  blue300: 'rgba(115, 182, 226, 1)',
  blue400: 'rgba(79, 162, 216, 1)',
  blue500: 'rgba(53, 140, 208, 1)',
  blue600: 'rgba(52, 116, 173, 1)',
  blue700: 'rgba(55, 106, 154, 1)',
  blue800: 'rgba(51, 88, 122, 1)',
  blue900: 'rgba(47, 75, 96, 1)',

  hoverColor: 'rgba(255, 255, 255, 0.1)',
  hoverColorFilled: 'rgb(42, 42, 42)',
  iconColor: 'rgb(168, 168, 160)',
  iconSecondary: 'rgba(168,168,160,0.6)',
  borderColor: 'rgba(46, 46, 46, 1)',
  dividerColor: 'rgb(114, 114, 114)',
  placeholderColor: 'rgb(62, 62, 63)',
  quoteColor: 'rgba(142, 141, 145, 1)',
  listColor: 'rgba(156, 155, 160, 1)',
  linkColor: '#78BEFF',
  edgelessGridColor: 'rgba(49, 49, 49, 0.35)',
  successColor: 'rgb(13, 162, 107)',
  warningColor: 'rgb(188, 54, 42)',
  errorColor: 'rgb(188, 54, 42)',
  processingColor: 'rgb(31, 94, 204)',
  textEmphasisColor: '#1E96EB',
  textPrimaryColor: 'rgb(234, 234, 234)',
  textSecondaryColor: 'rgb(156, 156, 160)',
  textDisableColor: 'rgb(119, 117, 125)',
  black10: 'rgba(255, 255, 255, 0.1)',
  black30: 'rgba(255, 255, 255, 0.3)',
  black50: 'rgba(255, 255, 255, 0.5)',
  black60: 'rgba(255, 255, 255, 0.6)',
  black80: 'rgba(255, 255, 255, 0.8)',
  black90: 'rgba(255, 255, 255, 0.9)',
  black: 'rgb(255, 255, 255)',
  white10: 'rgba(0, 0, 0, 0.1)',
  white30: 'rgba(0, 0, 0, 0.3)',
  white50: 'rgba(0, 0, 0, 0.5)',
  white60: 'rgba(0, 0, 0, 0.6)',
  white80: 'rgba(0, 0, 0, 0.8)',
  white90: 'rgba(0, 0, 0, 0.9)',
  white: 'rgb(0, 0, 0)',
  backgroundCodeBlock: 'rgba(46, 44, 52, 1)',
  backgroundTertiaryColor: 'rgb(48, 48, 48)',
  backgroundProcessingColor: 'rgba(22, 32, 48, 1)',
  backgroundErrorColor: 'rgba(46, 26, 24, 1)',
  backgroundWarningColor: 'rgba(48, 35, 19, 1)',
  backgroundSuccessColor: 'rgba(20, 42, 34, 1)',
  backgroundPrimaryColor: 'rgb(20, 20, 20)',
  backgroundSecondaryColor: 'rgba(37, 37, 37, 1)',
  backgroundModalColor: 'rgba(0, 0, 0, 0.5)',
  backgroundOverlayPanelColor: 'rgb(30, 30, 30)',
  tagBlue: 'rgba(8, 67, 136, 1)',
  tagGreen: 'rgba(44, 108, 63, 1)',
  tagTeal: 'rgba(26, 115, 110, 1)',
  tagWhite: 'rgba(67, 67, 67, 1)',
  tagPurple: 'rgba(47, 30, 113, 1)',
  tagRed: 'rgba(111, 50, 50, 1)',
  tagPink: 'rgba(155, 106, 106, 1)',
  tagYellow: 'rgba(150, 132, 49, 1)',
  tagOrange: 'rgba(185, 129, 46, 1)',
  tagGray: 'rgba(41, 41, 41, 1)',
  tooltip: 'rgba(234, 234, 234, 1)',

  menuShadow: 
    '0px 0px 16px rgba(0, 0, 0, 0.32), 0px 0px 0px 0.5px #2E2E2E inset',
  activeShadow: '0px 0px 0px 2px rgba(28, 158, 228, 0.30)', 
  shadow1: '0px 0px 4px 0px rgba(0, 0, 0, 0.24)',
  shadow2: '0px 0px 12px 0px rgba(0, 0, 0, 0.28)',
  shadow3: '0px 0px 20px 0px rgba(0, 0, 0, 0.32)', 
  popoverShadow:
    '0px 0px 30px 0px rgba(0, 0, 0, 0.1), 0px 0px 8px 0px rgba(0, 0, 0, 0.18), 0px 0px 0px 0.5px rgba(48, 48, 48, 1) inset',
  floatButtonShadow:
    '0px 0px 10px rgba(0, 0, 0, 0.05), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.1)',
  floatButtonShadow1:
    '0px 4px 6px -3px rgba(0, 0, 0, 0.1), 0px 10px 12px -2px rgba(0, 0, 0, 0.1)',
  floatButtonShadow2:
    '0px 4px 4px -2px rgba(15, 15, 15, 0.1), 0px 6px 8px 1px rgba(15, 15, 15, 0.05)',
  kanbanShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.60)',
  cmdShadow: '0px 16px 80px 0px rgba(0, 0, 0, 0.80)',
  largeButtonEffect: '0px 12px 20px 4px rgba(28, 158, 228, 0.18)',

  buttonGrayColor: 'rgba(85, 85, 85, 1)',
  cardBackgroundBlue: 'linear-gradient(180deg, #14171F 0%, #202020 100%)',
  cardBackgroundGreen: 'linear-gradient(180deg, #192023 0%, #202020 100%)',
  cardBackgroundGrey: 'linear-gradient(180deg, #313131 0%, #202020 100%)',
  windowsCloseButton: '#C42B1C',
  textHighlightPink: 'rgba(127, 93, 93, 1)',
  textHighlightOrange: 'rgba(127, 102, 84, 1)',
  textHighlightYellow: 'rgba(137, 133, 90, 1)',
  textHighlightGreen: 'rgba(90, 127, 109, 1)',
  textHighlightTeal: 'rgba(76, 125, 127, 1)',
  textHighlightBlue: 'rgba(72, 95, 127, 1)',
  textHighlightPurple: 'rgba(97, 90, 127, 1)',
  textHighlightGrey: 'rgba(111, 112, 117, 1)',
} satisfies Omit<AffineTheme, 'editorMode'>;

export const lightCssVariables = Object.entries(lightTheme).reduce(
  (variables, [key, value]) => {
    variables[`--affine-${camelToKebab(key)}` as keyof AffineCssVariables] =
      value;
    return variables;
  },
  {} as AffineCssVariables
);

export const darkCssVariables = Object.entries(darkTheme).reduce(
  (variables, [key, value]) => {
    variables[`--affine-${camelToKebab(key)}` as keyof AffineCssVariables] =
      value;
    return variables;
  },
  {} as AffineCssVariables
);
