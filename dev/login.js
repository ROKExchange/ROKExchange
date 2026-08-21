const loginForm =
    document.getElementById("dev-login-form");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const loginMessage =
    document.getElementById("login-message");

const loginButton =
    document.getElementById("login-button");


/* =========================================
   CHECK IF ALREADY LOGGED IN
   ========================================= */

async function checkExistingLogin() {

    const {
        data: { session }
    } = await supabaseClient.auth.getSession();


    if (session) {

        window.location.replace("index.html");

    }

}


checkExistingLogin();


/* =========================================
   LOGIN
   ========================================= */

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        loginMessage.textContent =
            "Checking credentials...";

        loginButton.disabled = true;


        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        const {
            data,
            error
        } = await supabaseClient.auth.signInWithPassword({

            email: email,

            password: password

        });


        if (error) {

            console.error(
                "Login error:",
                error
            );

            loginMessage.textContent =
                "Incorrect email or password.";

            loginButton.disabled = false;

            return;

        }


        if (data.session) {

            window.location.replace(
                "index.html"
            );

        }

    }
);
