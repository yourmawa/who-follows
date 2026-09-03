"use client";
import { useState } from "react";
import { CircleUserRound, History, Home, LogOut, Menu, ShieldCheck, X } from "lucide-react";

export default function AccountMenu({email,signOutPath}:{email?:string;signOutPath?:string}){
  const [open,setOpen]=useState(false);
  return <>
    <button className="profile-trigger" onClick={()=>setOpen(true)} aria-label="Open menu"><CircleUserRound size={23}/><Menu size={17}/></button>
    {open&&<div className="glass-overlay" onClick={()=>setOpen(false)}><aside className="glass-drawer" onClick={e=>e.stopPropagation()}>
      <button className="drawer-close" onClick={()=>setOpen(false)} aria-label="Close menu"><X size={20}/></button>
      <div className="drawer-account"><CircleUserRound size={38}/><div><b>Your Who Follows?</b>{email&&<span>{email}</span>}</div></div>
      <nav><a href="/"><Home size={18}/>Home</a>{email&&<a href="/app"><History size={18}/>Snapshots</a>}<div className="drawer-static"><ShieldCheck size={18}/>Your lists stay private</div></nav>
      {signOutPath?<a className="drawer-signout" href={signOutPath} target="_top"><LogOut size={18}/>Sign out</a>:<a className="drawer-signout" href="/app">Sign in</a>}
    </aside></div>}
  </>;
}
