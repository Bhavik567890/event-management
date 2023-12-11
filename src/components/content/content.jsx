import { Outlet } from "react-router-dom";

export default function Content() {
  return (
    <div className="w-4/5">
      <Outlet />
    </div>
  );
}