# Publish Homework Sorter from your existing GitHub repository

Your repository is **TM920/HWS**. This guide updates that repository; you do not need to create another one.

## A. Update the repository files

1. Download and extract `homework-sorter-website.zip`.
2. Open your existing repository: https://github.com/TM920/HWS
3. Choose **Add file → Upload files**.
4. Upload the *contents* of the extracted project folder (not the ZIP itself). Keep the folder structure exactly as shown:

   ```text
   index.html
   config.js
   README.md
   SETUP.md
   .nojekyll
   supabase/
     schema.sql
     functions/
       study-helper/
         index.ts
   ```

5. If GitHub asks whether to replace existing files, replace `index.html`, `config.js`, `SETUP.md`, and any older setup files with the versions from this package. Make sure `supabase/schema.sql` and `supabase/functions/study-helper/index.ts` are uploaded into those exact folders.
6. Click **Commit changes**.

## B. Enable GitHub Pages

1. Open **Settings → Pages** in this repository.
2. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
3. Set **Branch** to `main` and folder to `/(root)`.
4. Click **Save**.
5. Wait for the deployment to finish. Your address should be:

   `https://tm920.github.io/HWS/`

6. Reload Settings → Pages and use **Visit site** when GitHub displays it. First deployment can take several minutes.

## C. Optional accounts, cloud sync, and shared notes

The basic planner works without a backend, saving data only in the current browser. To enable accounts, cross-device planner sync, and shared notes, configure Supabase:

1. With a parent/guardian's help if needed, create a Supabase project.
2. Open **SQL Editor** and run the entire contents of `supabase/schema.sql`.
3. In **Project Settings → API**, copy the Project URL and the publishable/anon public key.
4. Edit `config.js` in GitHub and fill in only `SUPABASE_URL` and `SUPABASE_ANON_KEY`. These are public browser values; never put a service-role key or password here.
5. In Supabase **Authentication → URL Configuration**, set the Site URL to `https://tm920.github.io/HWS/` and add that exact address to the Redirect URLs allow-list.
6. Test sign-up, email confirmation, sign-in, planner sync, and shared notes.

## D. Optional AI study helper

The AI helper needs a server-side OpenAI API key and the Supabase Edge Function. Do not put an API key in `index.html`, `config.js`, or GitHub. Review usage limits/costs with a parent/guardian before enabling it. Follow the commands in `SETUP.md`; deploy `supabase/functions/study-helper/index.ts` as the `study-helper` function and store `OPENAI_API_KEY` as a Supabase secret.

## E. Optional custom domain

A custom domain is optional and must be purchased separately. A parent/guardian should handle the domain registrar and DNS account. After you own a domain, open **Settings → Pages → Custom domain** and follow GitHub's current DNS instructions. Never share registrar passwords.

## Privacy notes

- GitHub Pages content is public. Never commit student passwords, private keys, school IDs, or personal class information.
- Homework data is private per signed-in Supabase account. Shared notes are visible to signed-in users of this Supabase project, so do not post personal information.
- Without Supabase, homework remains in that browser/device and will not sync to other devices.
- GitHub Pages only hosts the front end. Supabase provides the optional account/database and server-function services.
