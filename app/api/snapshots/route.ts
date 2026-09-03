import { desc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { getDb } from "../../../db";
import { snapshots } from "../../../db/schema";

async function owner(){return (await headers()).get("oai-authenticated-user-id");}
export async function GET(){const id=await owner();if(!id)return Response.json({error:"Sign in required"},{status:401});const rows=await getDb().select().from(snapshots).where(eq(snapshots.ownerId,id)).orderBy(desc(snapshots.createdAt)).limit(60);const weekAgo=new Date(Date.now()-7*86400000).toISOString();const used=rows.filter(x=>x.createdAt>=weekAgo).length;return Response.json({snapshots:rows,usage:{used,limit:3,remaining:Math.max(0,3-used)}});}
export async function POST(request:Request){const id=await owner();if(!id)return Response.json({error:"Sign in required"},{status:401});const body=await request.json() as {profileName?:string;listType?:string;usernames?:string[]};const profileName=body.profileName?.trim().toLowerCase();const listType=body.listType==="followers"?"followers":"following";const usernames=[...new Set((body.usernames??[]).map(x=>x.toLowerCase()).filter(x=>/^[a-z0-9._]{1,30}$/.test(x)))];if(!profileName||!usernames.length)return Response.json({error:"A profile and at least one username are required."},{status:400});
 const weekAgo=new Date(Date.now()-7*86400000).toISOString();const recent=(await getDb().select().from(snapshots).where(eq(snapshots.ownerId,id))).filter(x=>x.createdAt>=weekAgo);if(recent.length>=3)return Response.json({error:"You’ve reached three saved comparisons this week. Your existing snapshots are still available."},{status:429});
 const [snapshot]=await getDb().insert(snapshots).values({ownerId:id,profileName,listType,usernames}).returning();return Response.json({snapshot,usage:{used:recent.length+1,limit:3,remaining:Math.max(0,2-recent.length)}},{status:201});}
