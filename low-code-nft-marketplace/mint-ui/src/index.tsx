import ReactDOM from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material";
import { HashRouter } from 'react-router-dom';

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const customTheme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#181817",
			contrastText: "#FBFBF9",
		},
	},
});

root.render(
	<HashRouter>
		<ThemeProvider theme={customTheme}>
			<App />
		</ThemeProvider>
	</HashRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
