const SUPABASE_URL =
    "YOUR_SUPABASE_PROJECT_URL";

const SUPABASE_KEY =
    "YOUR_SUPABASE_PUBLISHABLE_KEY";


const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


/* =========================================
   REQUIRE DEVELOPMENT LOGIN
   ========================================= */

async function requireDevLogin() {

    const {
        data: { session }
    } = await supabaseClient.auth.getSession();


    if (!session) {

        window.location.replace("login.html");

        return null;
    }


    return session;
}


/* =========================================
   LOG OUT
   ========================================= */

async function logoutDev() {

    await supabaseClient.auth.signOut();

    window.location.replace("login.html");

}
