const CHUNK_PUBLIC_PATH = "server/app/icon.svg/route.js";
const runtime = require("../../chunks/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/node_modules_next_c29920._.js");
runtime.loadChunk("server/chunks/app_icon--route-entry_b5899d.js");
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/node_modules/next/dist/esm/build/templates/app-route.js { INNER_APP_ROUTE => \"[project]/app/icon--route-entry.js [app-rsc] (ecmascript)\" } [app-rsc] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
