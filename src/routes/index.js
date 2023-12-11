import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/error/error-page";
import EventListingPage from "../pages/event/event-table";
import AddOrEditEventPage from "../pages/add-edit-event/add-edit-event";
import USersListingPage from "../pages/users/user-listing";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    caseSensitive: true,
    Component: App,
    ErrorBoundary: ErrorPage,

    children: [
      {
        index: true,
        Component: EventListingPage,
      },
      {
        path: "/add-edit/event",
        Component: AddOrEditEventPage,
      },
      {
        path:'/add-edit/event/:id',
        Component:AddOrEditEventPage,
      },
      {
        path: "/users",
        Component: USersListingPage,
      },
    ],
  },
]);
