// Deploy with: supabase functions deploy study-helper
// Set the OPENAI_API_KEY secret before deploying. Never put this key in config.js.
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors() });
  try {
    const auth = req.headers.get("Authorization") || "";
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, { global: { headers: { Authorization: auth } } });
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return json({ error: "Sign in required" }, 401);
    const { topic, format, level, notes } = await req.json();
    if (typeof topic !== "string" || !topic.trim() || topic.length > 300) return json({ error: "A short topic is required." }, 400);
    const prompt = `Create a ${String(format || "clear summary").slice(0,100)} for ${String(level || "high school").slice(0,40)} level about: ${topic.trim()}. ${typeof notes === "string" && notes.trim() ? "Use these student notes as the main source and flag possible errors: " + notes.slice(0,8000) : "Use established knowledge and be clear about uncertainty."} Keep the answer under 700 words. Use plain text with headings and bullets.`;
    const response = await fetch("https://api.openai.com/v1/responses", { method: "POST", headers: { "Authorization": `Bearer ${Deno.env.get("OPENAI_API_KEY")}`, "Content-Type": "application/json" }, body: JSON.stringify({ model: "gpt-4.1-mini", input: prompt, max_output_tokens: 1200 }) });
    const result = await response.json();
    if (!response.ok) return json({ error: "Study helper request failed." }, 502);
    const text = (result.output || []).flatMap((item: any) => item.content || []).filter((part: any) => part.type === "output_text").map((part: any) => part.text).join("\n");
    return json({ text });
  } catch (_error) { return json({ error: "Unexpected server error." }, 500); }
});
function cors() { return { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS" }; }
function json(data: unknown, status = 200) { return new Response(JSON.stringify(data), { status, headers: { ...cors(), "Content-Type": "application/json" } }); }
