import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
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
