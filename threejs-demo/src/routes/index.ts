import Demo1 from "../pages/Demo1";

const routes = [
	{
		path: "demo1",
		// element: <Demo1 />,
		component: import("../pages/Demo1"),
	},
];

export default routes;
