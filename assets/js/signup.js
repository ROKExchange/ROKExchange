const SUPABASE_URL = "https://uzjlztwhccqdzyqibrzf.supabase.co";
const SUPABASE_KEY = "sb_publishable_pJo4e1e9qubkxvJTgmrerg_QIF6XFqR";

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const form = document.getElementById("email-form");
const emailInput = document.getElementById("email");
const message = document.getElementById("form-message");


form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = emailInput.value.trim();

    if (!email) {
        message.textContent = "Please enter an email address.";
        return;
    }

    message.textContent = "Signing you up...";

    const { error } = await supabaseClient
        .from("email_subscribers")
        .insert({
            email: email
        });

    if (error) {

        console.error(error);

        if (error.code === "23505") {
            message.textContent =
                "You're already on the update list!";
        } else {
            message.textContent =
                "Something went wrong. Please try again.";
        }

        return;
    }

    message.textContent =
        "Thank you! You're now on the update list.";

    emailInput.value = "";
});  
