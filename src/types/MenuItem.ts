export interface MenuItem {
    title: string;
    key: string;
    icon?: React.ReactNode;
    route: string;
    component: React.ComponentType<any>;
    children?: MenuItem[];
  }
  