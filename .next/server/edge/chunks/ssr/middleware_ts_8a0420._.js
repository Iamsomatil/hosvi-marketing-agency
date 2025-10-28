(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/ssr/middleware_ts_8a0420._.js", {

"[project]/middleware.ts [middleware] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "config": ()=>config,
    "middleware": ()=>middleware
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/api/server.js [middleware] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/jwt/index.js [middleware] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
async function middleware(request) {
    const { pathname } = request.nextUrl;
    // Allow static assets & special files to bypass auth
    const isStaticAsset = /\.(?:png|jpg|jpeg|webp|svg|gif|ico|txt|json|xml|csv|woff2?|ttf|eot|mp4|webm)$/i.test(pathname);
    const isSpecial = pathname === "/robots.txt" || pathname === "/sitemap.xml" || pathname === "/favicon.ico";
    if (isStaticAsset || isSpecial) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["getToken"])({
        req: request
    });
    console.log("Middleware - Path:", pathname);
    console.log("Middleware - Token:", {
        hasToken: !!token,
        userId: token?.sub,
        userRole: token?.role,
        orgId: token?.orgId
    });
    // Public routes that don't require authentication
    // Note: handle root '/' explicitly; do NOT include '/' in startsWith array
    const publicPaths = [
        "/login",
        "/register",
        "/api/auth",
        "/api/stripe",
        "/api/trial",
        "/about",
        "/trial",
        "/legal",
        "/success",
        "/cancel",
        "/terms",
        "/privacy",
        "/admin/login"
    ];
    const isPublicPath = pathname === "/" || publicPaths.some((path)=>pathname.startsWith(path));
    if (isPublicPath) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // If no token and not a public path, redirect to login
    if (!token) {
        console.log("No token found, redirecting to login");
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(loginUrl);
    }
    // Handle admin routes
    const isAdminPath = pathname.startsWith("/admin");
    const isAdmin = token.role === "ADMIN";
    if (isAdminPath && !isAdmin) {
        console.log("Non-admin user trying to access admin area, redirecting to dashboard");
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/dashboard", request.url));
    }
    // Handle dashboard routes
    const isDashboardPath = pathname.startsWith("/dashboard");
    const isClient = token.role === "CLIENT" || !token.role; // Default to client if no role
    if (isDashboardPath && !isClient) {
        console.log("Non-client user trying to access dashboard, checking role...");
        if (isAdmin) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/admin", request.url));
        }
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        // Exclude Next internals and any path containing a dot (treat as asset)
        "/((?!_next/static|_next/image|favicon.ico|.*..*).*)"
    ]
};

})()),
}]);

//# sourceMappingURL=middleware_ts_8a0420._.js.map