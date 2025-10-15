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
"[project]/app/api/trial/start/route.ts [app-route] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "POST": ()=>POST,
    "runtime": ()=>runtime
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/prisma.ts [app-route] (ecmascript)");
var __TURBOPACK__commonjs__external__bcryptjs__ = __turbopack_external_require__("bcryptjs", true);
"__TURBOPACK__ecmascript__hoisting__location__";
;
;
;
const runtime = "nodejs";
async function POST(request) {
    try {
        console.log("Trial start API called");
        if (!process.env.DATABASE_URL) {
            console.error("DATABASE_URL is not set");
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "Server misconfiguration: DATABASE_URL is missing"
            }, {
                status: 500
            });
        }
        console.log("DATABASE_URL is set, parsing request body");
        const { name, email, phone, businessName, city, state, plan = "BASIC" } = await request.json();
        console.log("Request body parsed:", {
            name,
            email,
            businessName,
            city,
            state,
            plan
        });
        // Check if user already exists
        console.log("Checking if user exists for email:", email);
        const existingUser = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
            where: {
                email
            }
        });
        if (existingUser) {
            console.log("User already exists:", email);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                message: "User already exists"
            }, {
                status: 400
            });
        }
        // Create organization first
        console.log("Creating organization for:", businessName);
        const trialEndsAt = new Date();
        trialEndsAt.setDate(trialEndsAt.getDate() + 30);
        const org = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].org.create({
            data: {
                name: businessName,
                city,
                state,
                plan: plan,
                trialEndsAt,
                onboardedAt: new Date()
            }
        });
        console.log("Organization created with ID:", org.id);
        // Create user
        console.log("Creating user for:", email);
        const tempPassword = Math.random().toString(36).slice(-8);
        const passwordHash = await __TURBOPACK__commonjs__external__bcryptjs__["default"].hash(tempPassword, 12);
        const user = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].user.create({
            data: {
                name,
                email,
                passwordHash,
                orgId: org.id
            }
        });
        console.log("User created with ID:", user.id);
        // Create some demo data for the new organization
        console.log("Creating demo data for org:", org.id);
        await createDemoData(org.id);
        console.log("Demo data created successfully");
        // In a real app, you'd send an email with login credentials here
        console.log(`Created account for ${email} with temp password: ${tempPassword}`);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Account created successfully",
            orgId: org.id,
            userId: user.id,
            tempPassword
        });
    } catch (error) {
        console.error("Trial creation error:", error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            message: "Internal server error",
            error: error?.message ?? "unknown"
        }, {
            status: 500
        });
    }
}
async function createDemoData(orgId) {
    // Create demo leads
    const demoLeads = [
        {
            name: "Dr. Sarah Johnson",
            clinic: "Wellness Chiropractic",
            city: "Miami",
            source: "Email Campaign",
            status: "QUALIFIED"
        },
        {
            name: "Dr. Michael Chen",
            clinic: "Chen Family Practice",
            city: "Tampa",
            source: "LinkedIn",
            status: "BOOKED"
        },
        {
            name: "Dr. Lisa Rodriguez",
            clinic: "Sunshine Med Spa",
            city: "Orlando",
            source: "Email Campaign",
            status: "CLOSED"
        },
        {
            name: "Dr. James Wilson",
            clinic: "Wilson Chiropractic",
            city: "Jacksonville",
            source: "Referral",
            status: "NEW"
        },
        {
            name: "Dr. Emily Davis",
            clinic: "Rejuvenate Med Spa",
            city: "Fort Lauderdale",
            source: "Email Campaign",
            status: "SHOWED"
        }
    ];
    await Promise.all(demoLeads.map((lead)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].lead.create({
            data: {
                ...lead,
                orgId,
                status: lead.status,
                lastTouch: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
            }
        })));
    // Create demo campaigns
    const demoCampaigns = [
        {
            name: "Chiro New Patient Campaign",
            channel: "email",
            sends: 150,
            opens: 45,
            replies: 8,
            replyRate: 5.3
        },
        {
            name: "Med Spa Holiday Promo",
            channel: "email",
            sends: 200,
            opens: 72,
            replies: 12,
            replyRate: 6.0
        },
        {
            name: "LinkedIn Outreach",
            channel: "linkedin",
            sends: 100,
            opens: 35,
            replies: 4,
            replyRate: 4.0
        }
    ];
    await Promise.all(demoCampaigns.map((campaign)=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].campaign.create({
            data: {
                ...campaign,
                orgId
            }
        })));
    // Create demo KPI data for the last 30 days
    const kpiPromises = [];
    for(let i = 0; i < 30; i++){
        const date = new Date();
        date.setDate(date.getDate() - i);
        kpiPromises.push(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prisma$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["prisma"].kpiDaily.create({
            data: {
                orgId,
                date: date,
                leads: Math.floor(Math.random() * 10) + 1,
                positiveReplies: Math.floor(Math.random() * 5),
                qualified: Math.floor(Math.random() * 3),
                booked: Math.floor(Math.random() * 2),
                showed: Math.floor(Math.random() * 2),
                closed: Math.floor(Math.random() * 1)
            }
        }));
    }
    await Promise.all(kpiPromises);
}

})()),

};

//# sourceMappingURL=_a3ec33._.js.map