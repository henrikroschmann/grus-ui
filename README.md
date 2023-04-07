# Design Template

Design Template is a starter project for creating React applications with Tailwind CSS and Ant Design icons.

## Installation

To install Design Template, use the package manager npm:

```bash
npm install
```

## Usage

To start the project in development mode, run:

```bash
npm start
```

To build the project for production, run:

```bash
npm run build
```
## Features
* Pre-configured with Tailwind CSS and Ant Design icons
* Uses React Router DOM for routing
* Includes a reusable breadcrumb navigation component



## ApplicationBreadcrumb Component


The `ApplicationBreadcrumb` component is a reusable component that can be used to display a breadcrumb navigation based on the current location of the user.

### Usage

To use the `ApplicationBreadcrumb` component in your project, simply import it and add it to your JSX.

```jsx
import ApplicationBreadcrumb from "./components/layout/ApplicationBreadcrumb";

function App() {
  return (
    <div>
      <ApplicationBreadcrumb />
      {/* rest of the app */}
    </div>
  );
}

```

## Setting Up Menu Items

To use the `ApplicationBreadcrumb` component, you need to define the menu items that correspond to the routes in your application. The `MenuItem` interface is defined in the `types/MenuItem.ts` file and contains the following properties:


```typescript
interface MenuItem {
  title: string;
  key: string;
  icon?: React.ReactNode;
  route: string;
  component: React.ComponentType<any>;
  children?: MenuItem[];
}
```

* `title`: The title of the menu item.
* `key`: A unique key for the menu item.
* `icon`: An optional icon for the menu item.
* `route`: The route that corresponds to the menu item.
* `component`: The React component that should be rendered when the user navigates to this route.
* `children`: An optional array of child menu items. Use this to create nested menu items.

Here's an example of how to define menu items:

```jsx
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons";
import Option1 from "./components/pages/Option1";
import Option2 from "./components/pages/Option2";
import { MenuItem } from "./types/MenuItem";

export const items: MenuItem[] = [
  {
    title: "Option 1",
    key: "1",
    icon: <PieChartOutlined />,
    route: "/",
    component: Option1,
  },
  {
    title: "Option 2",
    key: "2",
    icon: <DesktopOutlined />,
    route: "/option2",
    component: Option2,
  },
```
