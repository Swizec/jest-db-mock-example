import { newDb } from "pg-mem";
import knexFile from "../../knexfile";

const mem = newDb();

export default mem.adapters.createKnex(0, knexFile) as typeof import("knex");
