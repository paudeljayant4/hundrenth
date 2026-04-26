import { HashRouter } from "./components/Router";
import Landing from "./pages/Landing";
import Surprise from "./pages/Surprise";

export default function App() {
  return (
    <HashRouter
      routes={{
        "/": <Landing />,
        "/100days": <Surprise />,
      }}
    />
  );
}
