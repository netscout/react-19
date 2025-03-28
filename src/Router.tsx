import { lazy } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const List = lazy(() => import("./pages/List"));

// 루트 레이아웃 컴포넌트
// eslint-disable-next-line react-refresh/only-export-components
const RootLayout = () => {
  return (
    <div className="h-screen w-full">
      <Outlet />
    </div>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/list",
        element: <List />,
      },
    ],
  },
]);
