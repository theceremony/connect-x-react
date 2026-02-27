import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
const App = lazy(() => import("./App.tsx"));

import { AnimatePresence } from "motion/react";
import AnimatedLoader from "./components/scaffold/AnimatedLoader.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <AnimatePresence>
    <Suspense fallback={<AnimatedLoader />}>
      <App />
    </Suspense>
  </AnimatePresence>,
);
