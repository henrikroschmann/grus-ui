import { items } from "../menuItems";
import { MenuItem } from "../types/MenuItem";

type FlatRoute = { title: string, key: string; route: string };

export const getFlatRoutes = (): FlatRoute[] => {
  const flatRoutes: FlatRoute[] = [];

  const traverseRoutes = (routes: MenuItem[], parentRoute: string) => {
    routes.forEach((route) => {
      const fullRoute = `${parentRoute}${route.route}`;

      flatRoutes.push({
        title: route.title,
        key: route.key,
        route: fullRoute,
      });

      if (route.children) {
        traverseRoutes(route.children, `${fullRoute}/`);
      }
    });
  };

  traverseRoutes(items, "");

  return flatRoutes;
};
