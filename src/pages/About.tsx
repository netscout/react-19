import { Link } from "react-router-dom";
import Parent from "./components/Parent";

const About = () => {
  return (
    <div className="h-screen w-full flex flex-col">
      <div className="w-full flex items-center gap-2 text-blue-500 underline">
        <Link to="/">Index</Link>
        <Link to="/about">About</Link>
      </div>
      <div className="text-4xl font-bold">About</div>
      <Parent />
    </div>
  );
};
export default About;
