import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
const App = lazy(() => import("./App.tsx"));

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <Suspense
    fallback={
      <div className="loader">
        <h1>loading...</h1>
      </div>
    }
  >
    <App />
  </Suspense>,
);
