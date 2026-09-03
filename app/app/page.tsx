import { requireChatGPTUser, chatGPTSignOutPath } from "../chatgpt-auth";
import Importer from "./importer";
import AccountMenu from "../account-menu";
export const dynamic = "force-dynamic";
export default async function AppPage() { const user = await requireChatGPTUser("/app"); return <main className="workspace-shell"><header className="workspace-nav"><a className="brand who-brand" href="/">Who Follows<span>?</span></a><AccountMenu email={user.email} signOutPath={chatGPTSignOutPath("/")}/></header><Importer /></main>; }
