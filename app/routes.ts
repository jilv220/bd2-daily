import {
	type RouteConfig,
	index,
	layout,
	route,
} from "@react-router/dev/routes";

export default [
	layout("./home/layout.tsx", [route("/", "./home/index.tsx")]),
	layout("./auth/layout.tsx", [route("signin", "./auth/signin.tsx")]),
] satisfies RouteConfig;
