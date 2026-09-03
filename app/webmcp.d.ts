type WhoFollowsTool={name:string;description:string;inputSchema:Record<string,unknown>;annotations?:{readOnlyHint?:boolean;untrustedContentHint?:boolean};execute:(input:Record<string,unknown>,context?:{signal?:AbortSignal})=>Promise<string>|string};
interface DocumentModelContext{registerTool(tool:WhoFollowsTool,options?:{signal?:AbortSignal}):Promise<void>}
interface Document{modelContext?:DocumentModelContext}
