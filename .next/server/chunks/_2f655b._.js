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
"[project]/app/api/dashboard/summary/route.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "GET": ()=>GET
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next-auth/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/date-fns/subDays.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_import__("[project]/node_modules/date-fns/format.mjs [app-route] (ecmascript) <locals>");
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
;
;
async function GET(request) {
    console.log('Dashboard summary API called');
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authOptions"]);
    console.log('Session in API:', JSON.stringify(session, null, 2));
    if (!session) {
        console.error('No session found');
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "No session found"
        }, {
            status: 401
        });
    }
    if (!session.user?.orgId) {
        console.error('No orgId in session. User data:', JSON.stringify(session.user, null, 2));
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Organization ID not found in session"
        }, {
            status: 401
        });
    }
    try {
        const { searchParams } = new URL(request.url);
        const days = parseInt(searchParams.get("days") || "30");
        const startDate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$subDays$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["subDays"])(new Date(), days);
        // Get KPIs for the date range
        const kpiData = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].kpiDaily.findMany({
            where: {
                orgId: session.user.orgId,
                date: {
                    gte: startDate
                }
            },
            orderBy: {
                date: "desc"
            }
        });
        const kpis = kpiData.reduce((acc, day)=>({
                newLeads: acc.newLeads + day.leads,
                positiveReplies: acc.positiveReplies + day.positiveReplies,
                qualified: acc.qualified + day.qualified,
                booked: acc.booked + day.booked,
                showed: acc.showed + day.showed,
                closed: acc.closed + day.closed
            }), {
            newLeads: 0,
            positiveReplies: 0,
            qualified: 0,
            booked: 0,
            showed: 0,
            closed: 0
        });
        // Chart data - leads by day
        const leadsByDay = kpiData.reverse().map((day)=>({
                date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(day.date, "MMM dd"),
                leads: day.leads
            }));
        // Pipeline funnel data
        const pipelineFunnel = [
            {
                stage: "Lead",
                count: kpis.newLeads,
                color: "#3b82f6"
            },
            {
                stage: "Qualified",
                count: kpis.qualified,
                color: "#8b5cf6"
            },
            {
                stage: "Booked",
                count: kpis.booked,
                color: "#f59e0b"
            },
            {
                stage: "Showed",
                count: kpis.showed,
                color: "#06b6d4"
            },
            {
                stage: "Closed",
                count: kpis.closed,
                color: "#10b981"
            }
        ];
        // Latest leads
        const latestLeads = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].lead.findMany({
            where: {
                orgId: session.user.orgId
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 10,
            select: {
                id: true,
                name: true,
                clinic: true,
                city: true,
                source: true,
                status: true,
                lastTouch: true
            }
        });
        // Campaign performance
        const campaigns = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].campaign.findMany({
            where: {
                orgId: session.user.orgId
            },
            select: {
                name: true,
                sends: true,
                opens: true,
                replies: true,
                replyRate: true
            }
        });
        // Growth since registration
        const org = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].org.findUnique({
            where: {
                id: session.user.orgId
            },
            select: {
                createdAt: true
            }
        });
        // Calculate baseline (first week after registration)
        const registrationDate = org?.createdAt || new Date();
        const baselineEnd = new Date(registrationDate);
        baselineEnd.setDate(baselineEnd.getDate() + 7);
        const baselineKpis = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].kpiDaily.findMany({
            where: {
                orgId: session.user.orgId,
                date: {
                    gte: registrationDate,
                    lte: baselineEnd
                }
            }
        });
        const baselineLeads = baselineKpis.reduce((sum, day)=>sum + day.leads, 0);
        const baselineClosed = baselineKpis.reduce((sum, day)=>sum + day.closed, 0);
        const currentLeads = kpis.newLeads;
        const currentClosed = kpis.closed;
        const growthSinceRegistration = {
            leadsGrowth: {
                current: currentLeads,
                baseline: baselineLeads,
                percentage: baselineLeads > 0 ? (currentLeads - baselineLeads) / baselineLeads * 100 : 0
            },
            clientsGrowth: {
                current: currentClosed,
                baseline: baselineClosed,
                percentage: baselineClosed > 0 ? (currentClosed - baselineClosed) / baselineClosed * 100 : 0
            }
        };
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            kpis,
            chartSeries: {
                leadsByDay,
                callsByWeek: [],
                replyRateByCampaign: campaigns.map((c)=>({
                        campaign: c.name,
                        rate: c.replyRate
                    })),
                pipelineFunnel
            },
            tables: {
                latestLeads: latestLeads.map((lead)=>({
                        ...lead,
                        lastTouch: lead.lastTouch ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$date$2d$fns$2f$format$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["format"])(lead.lastTouch, "MMM dd") : "Never"
                    })),
                campaignPerformance: campaigns
            },
            growthSinceRegistration
        });
    } catch (error) {
        console.error("Dashboard summary error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Internal server error"
        }, {
            status: 500
        });
    }
}

})()),

};

//# sourceMappingURL=_2f655b._.js.map