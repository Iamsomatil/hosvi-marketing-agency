module.exports = {

"[project]/lib/prisma.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "prisma": ()=>prisma
});
var __TURBOPACK__commonjs__external__$40$prisma$2f$client__ = __turbopack_external_require__("@prisma/client", true);
"__TURBOPACK__ecmascript__hoisting__location__";
;
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new __TURBOPACK__commonjs__external__$40$prisma$2f$client__["PrismaClient"]();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;

})()),
"[project]/lib/auth.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "authOptions": ()=>authOptions
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/providers/credentials.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$prisma$2d$adapter$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/@auth/prisma-adapter/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__commonjs__external__bcryptjs__ = __turbopack_external_require__("bcryptjs", true);
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
const authOptions = {
    adapter: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth$2f$prisma$2d$adapter$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PrismaAdapter"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"]),
    session: {
        strategy: "jwt"
    },
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize (credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }
                const user = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });
                if (!user || !user.passwordHash) {
                    return null;
                }
                const isPasswordValid = await __TURBOPACK__commonjs__external__bcryptjs__["default"].compare(credentials.password, user.passwordHash);
                if (!isPasswordValid) {
                    return null;
                }
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image || undefined,
                    role: user.role
                };
            }
        })
    ],
    callbacks: {
        async jwt ({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                // Make sure we have all required fields
                if (!token.id || !token.role) {
                    console.error('Missing required token fields:', {
                        token,
                        user
                    });
                }
            }
            return token;
        },
        async session ({ session, token }) {
            if (!session.user) {
                console.error('No user in session object');
                return session;
            }
            // Ensure we have all required fields from token
            if (!token.id || !token.role) {
                console.error('Missing required token fields:', {
                    tokenId: !!token.id,
                    tokenRole: !!token.role,
                    tokenKeys: Object.keys(token)
                });
                return session;
            }
            // Create a new session object with the correct type
            const updatedSession = {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role
                }
            };
            try {
                // Fetch the latest user data with org
                const dbUser = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
                    where: {
                        id: token.id
                    },
                    include: {
                        org: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                });
                if (dbUser) {
                    // Ensure we have a valid role
                    const userRole = dbUser.role || 'USER';
                    // Update the session user with all required fields
                    updatedSession.user = {
                        ...updatedSession.user,
                        id: dbUser.id,
                        email: dbUser.email || null,
                        name: dbUser.name || null,
                        role: userRole,
                        orgId: dbUser.org?.id || null,
                        orgName: dbUser.org?.name || null
                    };
                    // Add role to token for future requests
                    token.role = userRole;
                } else {
                    console.error('User not found in database:', token.id);
                }
            } catch (error) {
                console.error('Error fetching user data in session callback:', error);
            // Return the session with token data if DB fetch fails
            }
            return updatedSession;
        }
    },
    pages: {
        signIn: "/login"
    }
};

})()),
"[project]/app/api/auth/[...nextauth]/route.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "GET": ()=>handler,
    "POST": ()=>handler
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/auth.ts [app-route] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
const handler = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authOptions"]);
;

})()),

};

//# sourceMappingURL=_7ec7fd._.js.map