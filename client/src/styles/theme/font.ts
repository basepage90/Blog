const fontHelper = (fontType: any) => `
    font-family: ${fontType.fontFamily};
    font-weight: ${fontType.fontWeight};
    font-size: ${fontType.fontSize};
    line-height: ${fontType.lineHeight};
    letter-spacing: ${fontType.letterSpacing};
`;

const h1 = {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: 300,
    fontSize: "6rem",
    lineHeight: 1.167,
    letterSpacing: "-0.01562em"
};

const h2 = {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: 300,
    fontSize: "3.75rem",
    lineHeight: 1.2,
    letterSpacing: "-0.00833em"
};

const h3 = {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: 400,
    fontSize: "3rem",
    lineHeight: 1.167,
    letterSpacing: "0em"
};

const  h4 = {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: 400,
    fontSize: "2.125rem",
    lineHeight: 1.235,
    letterSpacing: "0.00735em"
};

const  h5 = {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: 400,
    fontSize: "1.5rem",
    lineHeight: 1.334,
    letterSpacing: "0em"
};

const h6 = {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: 500,
    fontSize: "1.25rem",
    lineHeight: 1.6,
    letterSpacing: "0.0075em"
};

const subtitle1 = {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: 1.75,
    letterSpacing: "0.00938em"
};

const subtitle2 = {

    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: 500,
    fontSize: "0.875rem",
    lineHeight: 1.57,
    letterSpacing: "0.00714em"
};

const body1 = {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: 400,
    fontSize: "1rem",
    lineHeight: 1.5,
    letterSpacing: "0.00938em"
};

const body2 = {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: 1.43,
    letterSpacing: "0.01071em"
};

const button = {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: 500,
    fontSize: "0.875rem",
    lineHeight: 1.75,
    letterSpacing: "0.02857em",
    textTransform: "uppercase"
};

const caption = {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: 1.66,
    letterSpacing: "0.03333em"
};

const overline = {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: 2.66,
    letterSpacing: "0.08333em",
    textTransform: "uppercase"
};

const font = {
    h1: fontHelper(h1),
    h2: fontHelper(h2),
    h3: fontHelper(h3),
    h4: fontHelper(h4),
    h5: fontHelper(h5),
    h6: fontHelper(h6),
    subtitle1: fontHelper(subtitle1),
    subtitle2: fontHelper(subtitle2),
    body1: fontHelper(body1),
    body2: fontHelper(body2),
    button: fontHelper(button),
    caption: fontHelper(caption),
    overline: fontHelper(overline),
};

export default font;