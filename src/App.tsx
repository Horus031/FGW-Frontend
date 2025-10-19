import { routes } from "./router";
import { useRoutes } from "react-router-dom";

function App() {
  const routerElements = useRoutes(routes);
  

  return <>{routerElements}</>;
}

export default App;
