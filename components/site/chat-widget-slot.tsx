'use client'

import Script from 'next/script'

/**
 * ============================================================
 *  CHATBASE CHAT WIDGET
 * ============================================================
 *  1. Create your bot in the Chatbase dashboard.
 *  2. Copy the bot ID and set it in .env.local:
 *        NEXT_PUBLIC_CHATBASE_ID=your-bot-id
 *  3. Done. The widget loads after the page is idle, so it never blocks load.
 *
 *  If your dashboard gives you a different snippet, paste it in the
 *  marked block below instead of using the ID.
 *  Renders nothing when no ID is set.
 * ============================================================
 */
const CHATBASE_ID = process.env.NEXT_PUBLIC_CHATBASE_ID

export function ChatWidgetSlot() {
  if (!CHATBASE_ID) return null

  const snippet = `
(function(){
  if(!window.chatbase||window.chatbase("getState")!=="initialized"){
    window.chatbase=(...args)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(args)};
    window.chatbase=new Proxy(window.chatbase,{get(t,p){if(p==="q"){return t.q}return(...a)=>t(p,...a)}})
  }
  const s=document.createElement("script");
  s.src="https://www.chatbase.co/embed.min.js";
  s.id=${JSON.stringify(CHATBASE_ID)};
  s.domain="www.chatbase.co";
  document.body.appendChild(s);
})();`

  return (
    <>
      {/* ---- PASTE YOUR CHATBASE DASHBOARD SNIPPET HERE (optional, replaces the block below) ---- */}
      <Script id="chatbase-embed" strategy="lazyOnload" dangerouslySetInnerHTML={{ __html: snippet }} />
      {/* ---- END CHATBASE ---- */}
    </>
  )
}
