"use client";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, Sparkles } from "lucide-react";
import { getLatestChanges, type Snapshot } from "../app/comparison";

const demoSnapshots:Snapshot[]=[
 {id:2,profileName:"demo.profile",listType:"following",createdAt:"2026-09-03T10:00:00Z",usernames:["calm.design","gentle.tech","new.account","shared.friend"]},
 {id:1,profileName:"demo.profile",listType:"following",createdAt:"2026-08-27T10:00:00Z",usernames:["calm.design","gentle.tech","older.account","shared.friend"]}
];
const demoComparison=getLatestChanges(demoSnapshots,"demo.profile","following")!;

export default function WebMCPDemo(){
 const [activity,setActivity]=useState("Waiting for an agent request");
 const comparison=demoComparison;
 useEffect(()=>{
  if(!document.modelContext){setActivity("WebMCP is not available in this browser");return}
  const controller=new AbortController();
  Promise.resolve(document.modelContext.registerTool({name:"get_latest_changes",description:"Return the deterministic difference between the latest two user-provided snapshots for one saved Instagram profile and list type. Use appeared/disappeared without inferring motives or actual follow events.",inputSchema:{type:"object",properties:{profile:{type:"string",const:"demo.profile",description:"The saved demo profile."},list_type:{type:"string",const:"following",description:"The list type available in this demo."}},required:["profile","list_type"],additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:true},execute:async()=>{setActivity("Agent called get_latest_changes — verified result returned");return JSON.stringify(comparison)}},{signal:controller.signal})).catch(()=>setActivity("WebMCP tool registration failed"));
  return()=>controller.abort();
 },[]);
 return <main className="webmcp-demo"><nav><a href="/"><ArrowLeft size={17}/>Who Follows?</a><span><Sparkles size={14}/>WebMCP demo</span></nav><header><p>DETERMINISTIC, AGENT-READY</p><h1>WhoFollows owns the facts.<br/><em>AI owns the conversation.</em></h1><span>This page contains only fictional challenge data.</span></header><section className="demo-grid"><article><small>PREVIOUS SNAPSHOT</small><b>27 Aug 2026</b><strong>4</strong><span>Following</span></article><article><small>LATEST SNAPSHOT</small><b>3 Sep 2026</b><strong>4</strong><span>Following</span></article></section><section className="demo-result"><div><small>VERIFIED COMPARISON</small><h2>@demo.profile</h2></div><div className="demo-changes"><p><b>+{comparison.appeared.length}</b><span>appeared</span><small>@{comparison.appeared.join(", @")}</small></p><p><b>−{comparison.disappeared.length}</b><span>disappeared</span><small>@{comparison.disappeared.join(", @")}</small></p></div><p className="demo-boundary">{comparison.interpretation_boundary}</p></section><section className="tool-status"><Check size={18}/><div><b>get_latest_changes</b><span>{activity}</span></div></section></main>
}
