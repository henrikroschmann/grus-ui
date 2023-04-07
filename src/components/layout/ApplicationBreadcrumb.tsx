import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";
import { getFlatRoutes } from "../../utils/routesUtils";

const ApplicationBreadcrumb = () => {
  const location = useLocation();
  const flatRoutes = getFlatRoutes();

  const parts = location.pathname.split("/").filter((part) => part !== "");
  let currentPath = "";
  const breadcrumbItems = parts.map((part, i) => {
    currentPath += `/${part}`;
    const route = flatRoutes.find((r) => r.route === currentPath);

    if (route) {
      return (
        <Breadcrumb.Item key={route.key}>
          <Link to={route.route}>{route.title}</Link>
        </Breadcrumb.Item>
      );
    }

    return null;
  });

  return (
    <Breadcrumb className="breadcrumb">
      <Breadcrumb.Item key="home">
        <Link to="/">Home</Link>
      </Breadcrumb.Item>
      {breadcrumbItems}
    </Breadcrumb>
  );
};

export default ApplicationBreadcrumb;
