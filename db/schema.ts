import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, index } from "drizzle-orm/sqlite-core";
export const snapshots = sqliteTable("snapshots",{
 id:integer("id").primaryKey({autoIncrement:true}), ownerId:text("owner_id").notNull(), profileName:text("profile_name").notNull(), listType:text("list_type",{enum:["following","followers"]}).notNull().default("following"), usernames:text("usernames",{mode:"json"}).$type<string[]>().notNull(), createdAt:text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`)
},t=>[index("snapshots_owner_profile_idx").on(t.ownerId,t.profileName,t.listType)]);
