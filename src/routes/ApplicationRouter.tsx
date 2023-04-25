import { Navigate, Route, Routes } from "react-router-dom";
import { items } from "../menuItems";
import React, { useContext } from "react";
import { MenuItem } from "../types/MenuItem";
import { AuthContext } from "../contexts/AuthContext";
import SignIn from "../components/auth/SignIn";

const ApplicationRouter = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const renderRoutes = (menuItems: MenuItem[]) =>
    menuItems.map((menuItem) => {
      if (menuItem.children) {
        return (
          <Route key={menuItem.key} path={menuItem.route}>
            <React.Fragment>{renderRoutes(menuItem.children)}</React.Fragment>
          </Route>
        );
      }

      return (
        <Route
          key={menuItem.key}
          path={menuItem.route}
          element={
            !isAuthenticated && menuItem.protected ? (
              <Navigate to="/signin" />
            ) : (
              <menuItem.component />
            )
          }
        />
      );
    });

  return (
    <Routes>
      <Route path="/*" element={<></>} />
      <Route path="/signin" element={<SignIn />} />
      {renderRoutes(items)}
    </Routes>
  );
};

export default ApplicationRouter;
