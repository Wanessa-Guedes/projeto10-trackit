import ReactDom from "react-dom";

import "../src/assets/reset.css";
import "../src/assets/style.css";

import App from "./components/App";

ReactDom.render(<App />, document.querySelector(".root"));