const SUPABASE_URL =
    "https://uzjlztwhccqdzyqibrzf.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_pJo4e1e9qubkxvJTgmrerg_QIF6XFqR";


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
