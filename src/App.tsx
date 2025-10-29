import { useRoutes } from "react-router-dom";
import { routes } from "./router";

function App() {
  const routerElements = useRoutes(routes);
  

  return <>{routerElements}</>;
}

export default App;
