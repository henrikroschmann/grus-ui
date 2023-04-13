import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { getFlatRoutes } from "../../routes/routesUtils";


interface BreadcrumbItemData {
  key: string;
  route: string;
  title: string;
}

const ApplicationBreadcrumb = () => {
  const location = useLocation();
  const flatRoutes = getFlatRoutes();

  const parts = location.pathname.split("/").filter((part) => part !== "");
  let currentPath = "";
  const breadcrumbItems: BreadcrumbItemData[] = parts
    .map((part, i) => {
      currentPath += `/${part}`;
      const route = flatRoutes.find((r) => r.route === currentPath);

      if (route) {
        return {
          key: route.key,
          route: route.route,
          title: route.title,
        };
      }

      return null;
    })
    .filter((item): item is BreadcrumbItemData => item !== null);

  const breadcrumbItemsWithHome = [
    {
      key: "home",
      route: "/",
      title: "Home",
    },
    ...breadcrumbItems,
  ];

  return (
    <Breadcrumb
      className="breadcrumb"
      items={breadcrumbItemsWithHome.map((item) => ({
        key: item.key,
        title: (
          <Link to={item.route}>
            {item.title}
          </Link>
        ),
      }))}
    />
  );
};

export default ApplicationBreadcrumb;
