export type ListType = "following" | "followers";
export type Snapshot = { id:number; profileName:string; listType?:ListType; usernames:string[]; createdAt:string };

export function getLatestChanges(snapshots:Snapshot[],profile:string,listType:ListType){
 const normalizedProfile=profile.replace(/^@/,"").trim().toLowerCase();
 const matching=snapshots.filter(s=>s.profileName===normalizedProfile&&(s.listType??"following")===listType).sort((a,b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime());
 if(matching.length<2)return null;
 const [current,previous]=matching,previousNames=new Set(previous.usernames),currentNames=new Set(current.usernames);
 return {profile:normalizedProfile,list_type:listType,previous_snapshot:{id:previous.id,timestamp:previous.createdAt,count:previous.usernames.length},current_snapshot:{id:current.id,timestamp:current.createdAt,count:current.usernames.length},appeared:current.usernames.filter(u=>!previousNames.has(u)),disappeared:previous.usernames.filter(u=>!currentNames.has(u)),unchanged_count:current.usernames.filter(u=>previousNames.has(u)).length,interpretation_boundary:"This is a deterministic difference between two user-provided lists. It does not establish when, why, or whether a follow or unfollow occurred; incomplete imports may affect the result."};
}
