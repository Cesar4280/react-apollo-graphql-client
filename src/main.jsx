import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { CssBaseline } from "@mui/material";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App.jsx";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const client = new ApolloClient({
	uri: "https://graphqlzero.almansi.me/api/",
	cache: new InMemoryCache()
});

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<StrictMode>
		<ApolloProvider client={client}>
			<CssBaseline />
			<App />
		</ApolloProvider>
	</StrictMode>
);
