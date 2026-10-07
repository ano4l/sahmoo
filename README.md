# Sahmoo Tattoos

Portfolio website, appointment checkout and private studio dashboard.

- `/`: Instagram artwork, studio introduction and summer specials.
- `/book`: session and available time selection, customer details, a 60-minute reservation, demo EFT instructions and private proof-of-payment uploads.
- `/admin`: booking search and status filters, PoP downloads and approval/rejection, payment ledger, outstanding balances, private notes, cancellations and completion.

Bookings and payment records persist in Cloudflare D1. Uploaded PDFs, JPGs and PNGs persist privately in R2. Booking access uses a random private-link token; the database stores its SHA-256 hash. Admin endpoints require a platform-authenticated identity with an allowlisted email. Payment amounts and slot conflicts are checked on the server. Duplicate proof approvals cannot create duplicate payments.

## Development

Requires Node.js 22+.

```sh
npm ci
npm run db:local
npm run dev
```

Open `http://localhost:3000`. Local development uses Wrangler's local D1/R2 emulation. `/admin` uses platform authentication in the hosted environment; local API tests supply test identity headers. There is no public admin password or client-side access bypass.

```sh
npm test       # integration tests against the running local server
npm run build # Worker, assets and migration output in dist/
```

The integration tests create test records only in the local database. Do not run them against production. Local-only records are not included in deployments.

## Configuration

`server/config.js` contains services, demo banking details and schedule defaults. The current packages and date range come from the Instagram summer special, 15 October–30 December 2026. Micro package durations (1, 2 and 3 hours) and Tuesday–Saturday 10:00–18:00 opening hours are provisional scheduling defaults and must be confirmed with the artist. Half/full-day durations are from the published special.

Production runtime values are managed through Sites:

- `ADMIN_EMAILS`: comma-separated authorised admin emails; initially `anotida174@icloud.com`.
- `BOOKING_START_DATE` / `BOOKING_END_DATE`: ISO booking date bounds.

`wrangler.jsonc` holds local binding placeholders; the Sites host provisions actual D1/R2 bindings. `.openai/hosting.json` identifies the existing hosted site. The site's private audience is preserved.

Banking details are deliberately fictional: Demo Bank, account `0000000000`, branch `000000`. Do not send real money. Payments are manually verified; this is not a payment-gateway integration. Uploading a PoP does not mean payment has been verified. The admin verifies its amount; the appointment becomes confirmed once the verified total reaches its 50% deposit. Completing an appointment requires full payment. Cancellation does not issue a refund automatically.

Customer booking links are stored in the URL fragment so they survive refreshes without sending the secret token in normal request URLs. Customers must save their private link; there is no email or SMS notification service connected. Studio contact is available through WhatsApp.

## Source artwork

Tattoo photographs, artist portrait and special prices were taken from the public Instagram account supplied by the user: https://www.instagram.com/sahmoo.tattoos/ . The flower still life is generated decorative imagery, not a tattoo portfolio image.
