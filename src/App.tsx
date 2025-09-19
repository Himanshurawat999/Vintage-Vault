import { Outlet } from "react-router";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="w-full min-h-screen max-w-[1500px] mx-auto font-open-sans select-none">
        <Outlet />
      </div>
      
    </>
  );
};

export default App;
