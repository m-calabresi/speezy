import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, {
    transform: postgres.camel,
});

export default sql;
