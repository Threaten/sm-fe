# Skill & Mix frontend

The frontend reads courses, staff, services, gallery items, and global site
content from the Payload backend. Contact form submissions are sent through a
same-origin Next.js route to Payload.

## Local development

From the workspace root, start the backend on port `3002`, then start this app
in a second terminal:

```bash
npm run dev:be
npm run dev
```

In development the frontend defaults to `http://admin.skillandmix.com`. For deployed
environments, set the server-only variable below on the frontend deployment:

```bash
PAYLOAD_URL=https://your-payload-backend.example.com
```

`NEXT_PUBLIC_PAYLOAD_URL` remains supported for compatibility, but
`PAYLOAD_URL` is preferred because the browser does not need direct backend
access.
