import { Suspense } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";

function PageFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm font-bold text-slate-600">
      Đang tải…
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
