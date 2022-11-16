import { createGlobalStyle } from "styled-components";
import { accentColor, textColor } from "../../constants/colors";

const GlobalStyle = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}

* {
	box-sizing: border-box;
	font-family: 'Raleway', sans-serif;
}
button {
	height: 46px;
	width: 100%;
	background-color: ${accentColor};
	border-radius: 5px;
	border-style: none;
	font-size: 20px;
	font-weight: 700;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	color: #FFFFFF;
	padding: 0 20px;
	margin: 8px 0;
	cursor: pointer;
	&:disabled {
		opacity: 0.7;
	}
}
input {
	height: 58px;
	width: 100%;
	background-color: #FFFFFF;
	border-radius: 5px;
	border-style: none;
	font-size: 20px;
	font-weight: 400;
	margin: 8px 0;
	padding: 0 10px;
	display: flex;
	align-items: center;
	color: ${textColor};
	&::placeholder{
		color: ${textColor};
	}
	&:disabled {
		opacity: 0.7;
	}
	
}
`;

export default GlobalStyle;
