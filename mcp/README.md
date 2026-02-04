# Supabase MCP

This repo includes MCP config for:
- Cursor: `.cursor/mcp.json`
- Claude Code: `.claude/mcp.json`

Both point at the hosted Supabase MCP server:
`https://mcp.supabase.com/mcp`

## Linking your Supabase account
1. Open your MCP client (Cursor or Claude Code).
2. The first time you use the Supabase MCP server, it should open a browser for OAuth.
3. Sign in to Supabase, choose your org/project, and approve.
4. The client stores the token locally (not in this repo).

## VS Code (Codes)
VS Code MCP support depends on the extension you are using.
Common flow:
- Open the MCP extension settings in VS Code.
- Add a server named `supabase` with URL `https://mcp.supabase.com/mcp`.
- Trigger the OAuth flow when prompted.

If you tell me the exact MCP extension, I can add the exact config file for it.
