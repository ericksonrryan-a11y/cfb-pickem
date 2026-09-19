/* Supabase connection.
 *
 * Both values are meant to be public — the publishable key is designed to ship
 * in client-side code, and the row-level security policies on the tables are
 * what actually protect the data. Never put the service_role / secret key
 * here; it bypasses those policies entirely.
 *
 * SUPABASE_URL accepts either the project URL or the full REST endpoint.
 */
window.CFB_CONFIG = {
  SUPABASE_URL: "https://yjnagojqhlyfdpjhiwma.supabase.co",
  SUPABASE_ANON_KEY: "sb_publishable_WvjzTzgDnYkhmcjV3aC9Pg_Jvc-_UMg",

  // How often (ms) the leaderboard re-checks for other people's picks.
  POLL_MS: 20000
};
