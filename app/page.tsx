import { chatGPTSignInPath, getChatGPTUser } from "./chatgpt-auth";
import { ArrowRight, Check, ClipboardPaste, Copy, Globe2 } from "lucide-react";
import AccountMenu from "./account-menu";
import StartFlow from "./start-flow";

export const dynamic = "force-dynamic";

export default async function Home() {
  const user = await getChatGPTUser();
  return <main className="landing-shell">
    <nav className="nav-wrap"><a className="brand who-brand" href="/">Who Follows<span>?</span></a><AccountMenu email={user?.email}/></nav>
    <section className="hero"><h1>Who appeared?<br/><em>Who disappeared?</em></h1><p className="hero-copy">Compare Followers and Following between two moments. You bring the lists—Who Follows? quietly shows what changed.</p><StartFlow signedIn={Boolean(user)} signInPath={chatGPTSignInPath("/app")}/></section>
    <section className="instruction-section"><p className="instruction-kicker">HOW TO ADD A SNAPSHOT</p><h2>Instagram → Who Follows?</h2><div className="visual-flow">
      <article><div className="visual-window instagram-window"><div className="window-top"><i/><i/><i/></div><Globe2 size={38}/><div className="fake-profile"><b>@profile</b><span>Instagram in your browser</span></div></div><p>Open the profile in Instagram Web.</p></article><ArrowRight className="flow-arrow" size={30}/>
      <article><div className="visual-window list-window"><div className="mini-list"><i/><span>@username_one</span></div><div className="mini-list selected"><i/><span>@username_two</span></div><div className="mini-list selected"><i/><span>@username_three</span></div><div className="copy-badge"><Copy size={16}/>Copy</div></div><p>Copy Following or Followers.</p></article><ArrowRight className="flow-arrow" size={30}/>
      <article><div className="visual-window paste-window"><ClipboardPaste size={31}/><div><span>@username_one</span><span>@username_two</span><span>@username_three</span></div><b>Added ✓</b></div><p>Paste the list into Who Follows?</p></article>
    </div><p className="flow-note">For a long list, copy and add it in smaller parts.</p></section>
    <section className="benefits"><h2>Who Follows? takes care of the rest</h2><div><p><Check size={19}/>Finds usernames and removes interface text</p><p><Check size={19}/>Combines parts and removes duplicates</p><p><Check size={19}/>Saves snapshots for your next comparison</p><p><Check size={19}/>Shows exactly who appeared and disappeared</p><p><Check size={19}/>Never asks for your Instagram password</p><p><Check size={19}/>Only compares lists you provide</p></div></section>
  </main>;
}
