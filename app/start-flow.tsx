"use client";

import { useState } from "react";
import { ArrowRight, Check, LockKeyhole } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function StartFlow({ signedIn, signInPath }: { signedIn: boolean; signInPath: string }) {
  const [profile, setProfile] = useState("");
  const [open, setOpen] = useState(false);
  const normalized = profile.replace(/^@/, "").trim().toLowerCase();

  function rememberProfile() {
    if (normalized) sessionStorage.setItem("who-follows-profile", normalized);
  }

  return <>
    <div className="start-box">
      <label htmlFor="start-profile">Which profile would you like to check?</label>
      <div className="start-input"><span>@</span><Input id="start-profile" value={profile} onChange={event => setProfile(event.target.value.replace(/^@/, ""))} placeholder="username" onKeyDown={event => { if (event.key === "Enter" && normalized) setOpen(true); }}/></div>
      <button className="primary-cta" disabled={!normalized} onClick={() => setOpen(true)}>Continue <ArrowRight size={19}/></button>
    </div>
    <p className="microcopy"><LockKeyhole size={14}/> No Instagram password. No continuous tracking.</p>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="registration-dialog">
        <DialogHeader>
          <span className="dialog-kicker">@{normalized}</span>
          <DialogTitle>{signedIn ? "Ready for your first snapshot" : "Create your private account"}</DialogTitle>
          <DialogDescription>{signedIn ? "This profile will be added to your private dashboard." : "Sign in to save this profile and compare it again later."}</DialogDescription>
        </DialogHeader>
        <div className="limit-card"><b>Free account</b><strong>3 saved checks</strong><span>every rolling 7 days</span></div>
        <div className="registration-points"><p><Check size={16}/>Your snapshots stay attached to your account</p><p><Check size={16}/>Failed imports never use a check</p><p><Check size={16}/>We never ask for your Instagram login</p></div>
        <a className="dialog-action" href={signedIn ? "/app" : signInPath} target={signedIn ? undefined : "_top"} onClick={rememberProfile}>{signedIn ? "Continue to import" : "Sign in to continue"}<ArrowRight size={18}/></a>
        <small className="dialog-fineprint">A check is counted only when a snapshot is successfully saved.</small>
      </DialogContent>
    </Dialog>
  </>;
}
