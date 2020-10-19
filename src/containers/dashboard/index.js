import React, { Suspense, lazy } from "react";

const PageRef = lazy(() => import("./dashboard"));
const C = (p) => <Suspense fallback="">{p.Child}</Suspense>;
const Page = (p) => <C Child={<PageRef {...p} />} />;
export default Page;
