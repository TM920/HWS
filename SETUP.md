# Homework Sorter website

This folder is a deployable website project based on your original Homework Sorter HTML file.

## What works immediately
- Homework creation, completion, sorting, class tabs, due-date grouping and calendar imports.
- Themes and class colors.
- Browser-local storage when cloud setup is not configured.
- Responsive layout and a welcome/landing header.

## Turn on accounts, cloud sync and shared notes
These features need a free Supabase project. They are not active until you connect one.

1. Create a project at https://supabase.com/ (ask a parent/guardian before creating an account if needed).
2. In the project dashboard, open SQL Editor and run `supabase/schema.sql`.
3. Open Project Settings → API. Copy the Project URL and anon/public key into `config.js`.
4. In Authentication → URL Configuration, add your deployed website URL to the allowed redirect URLs. For testing, you can temporarily disable email confirmation in Authentication settings; for a real site, keep email confirmation enabled.
5. Deploy the site folder to Netlify or another static host. Do not upload private keys or passwords.

Once configured, users can create accounts, sign in, sync their own homework/themes across devices, and share class notes with other signed-in users of the same project. Each account's homework is private. Shared notes are visible to signed-in members; remind classmates not to post personal information.

## Turn on the AI study helper
The AI helper requires an OpenAI API key stored as a server-side Supabase secret. Never put the key in `index.html` or `config.js`.

1. Install the Supabase CLI and link this folder to your project (`supabase link --project-ref YOUR_PROJECT_REF`).
2. Set the secret: `supabase secrets set OPENAI_API_KEY=YOUR_KEY`.
3. Deploy the function: `supabase functions deploy study-helper`.

The browser calls the function only after sign-in. Review usage and billing limits in your OpenAI account before enabling it.

## Publish the website

### Netlify Drop (simplest)
1. Go to https://app.netlify.com/drop
2. Drag the entire `homework-sorter-site` folder onto the page (not just the HTML file).
3. Netlify will publish it and give you a temporary `netlify.app` address.
4. In Netlify → Domain management, add a domain you own and follow its DNS instructions. A custom domain must be purchased separately; this project cannot buy or configure one without your account access.

### GitHub Pages
Upload the files to a GitHub repository, enable Pages in repository Settings, and choose the branch/root folder. Netlify is easier for this project.

## Important limitations / privacy
- Without Supabase configuration, homework and theme data stay in that browser only.
- With Supabase configured, each account's homework is cloud-synced privately. Shared class notes are visible to all signed-in users of this Supabase project.
- Do not collect student names, school IDs, grades, or other sensitive information in shared notes. If other students will use this, get school/parent approval and use appropriate privacy settings.
- A custom domain requires a domain name you own. Do not share your registrar password with anyone.
