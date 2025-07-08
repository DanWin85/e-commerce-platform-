"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDB = exports.connectDB = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = globalThis.prisma || new client_1.PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});
if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma = exports.prisma;
}
const connectDB = async () => {
    try {
        await exports.prisma.$connect();
        console.log('✅ Neon PostgreSQL connected successfully');
        console.log('🌐 Database region: Asia Pacific (Sydney)');
    }
    catch (error) {
        console.error('❌ Neon PostgreSQL connection error:', error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
const disconnectDB = async () => {
    await exports.prisma.$disconnect();
};
exports.disconnectDB = disconnectDB;
// Graceful shutdown
process.on('beforeExit', async () => {
    await (0, exports.disconnectDB)();
});
process.on('SIGINT', async () => {
    await (0, exports.disconnectDB)();
    process.exit(0);
});
process.on('SIGTERM', async () => {
    await (0, exports.disconnectDB)();
    process.exit(0);
});
//# sourceMappingURL=database.js.map