const hviModal =
    document.getElementById("hvi-modal");

const openHviButton =
    document.getElementById("open-hvi");

const closeHviButton =
    document.getElementById("close-hvi");

const hviBackdrop =
    document.getElementById("hvi-backdrop");

const hviForm =
    document.getElementById("hvi-form");

const formView =
    document.getElementById("hvi-form-view");

const resultView =
    document.getElementById("hvi-result-view");

const valueAgainButton =
    document.getElementById("hvi-again");



/* =========================================
   OPEN / CLOSE MODAL
   ========================================= */

function openHviModal() {

    hviModal.classList.add("open");

    hviModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-open"
    );

}


function closeHviModal() {

    hviModal.classList.remove("open");

    hviModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


openHviButton.addEventListener(
    "click",
    openHviModal
);


closeHviButton.addEventListener(
    "click",
    closeHviModal
);


hviBackdrop.addEventListener(
    "click",
    closeHviModal
);



/* =========================================
   PROTOTYPE HORSE VALUE CALCULATOR
   ========================================= */

hviForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const age =
            Number(
                document.getElementById(
                    "horse-age"
                ).value
            );


        const sex =
            document.getElementById(
                "horse-sex"
            ).value;


        const breed =
            document.getElementById(
                "horse-breed"
            ).value;


        const registration =
            document.getElementById(
                "horse-registration"
            ).value;


        const discipline =
            document.getElementById(
                "horse-discipline"
            ).value;


        const training =
            document.getElementById(
                "horse-training"
            ).value;


        const earnings =
            document.getElementById(
                "horse-earnings"
            ).value;


        const soundness =
            document.getElementById(
                "horse-soundness"
            ).value;



        /*
         * IMPORTANT:
         *
         * This is prototype/demo logic only.
         *
         * It is NOT based on actual comparable
         * horse sale data yet.
         */

        let estimatedValue = 7500;



        /* =========================================
           AGE
           ========================================= */

        if (age >= 5 && age <= 12) {

            estimatedValue += 3000;

        }

        else if (age >= 3 && age <= 4) {

            estimatedValue += 1000;

        }

        else if (age >= 13 && age <= 17) {

            estimatedValue -= 1000;

        }

        else if (age >= 18) {

            estimatedValue -= 3000;

        }



        /* =========================================
           SEX
           ========================================= */

        if (sex === "gelding") {

            estimatedValue += 1000;

        }

        if (sex === "stallion") {

            estimatedValue += 1500;

        }



        /* =========================================
           BREED
           ========================================= */

        const breedAdjustments = {

            quarter: 2000,

            paint: 1000,

            appaloosa: 500,

            thoroughbred: 500,

            warmblood: 5000,

            arabian: 1000,

            mustang: -1000,

            other: 0

        };


        estimatedValue +=
            breedAdjustments[breed] || 0;



        /* =========================================
           REGISTRATION
           ========================================= */

        if (
            registration ===
            "registered"
        ) {

            estimatedValue += 2500;

        }



        /* =========================================
           DISCIPLINE
           ========================================= */

        const disciplineAdjustments = {

            ranch: 2000,

            roping: 3500,

            barrel: 3000,

            cutting: 4500,

            reining: 4000,

            trail: 500,

            hunter: 3500,

            dressage: 4000,

            general: 0,

            other: 0

        };


        estimatedValue +=
            disciplineAdjustments[
                discipline
            ] || 0;



        /* =========================================
           TRAINING
           ========================================= */

        const trainingAdjustments = {

            unstarted: -3000,

            green: -1000,

            started: 1000,

            finished: 5000,

            advanced: 9000

        };


        estimatedValue +=
            trainingAdjustments[
                training
            ] || 0;



        /* =========================================
           COMPETITION EARNINGS
           ========================================= */

        const earningsAdjustments = {

            none: 0,

            under5000: 2000,

            "5000to15000": 5000,

            "15000to50000": 10000,

            over50000: 20000

        };


        estimatedValue +=
            earningsAdjustments[
                earnings
            ] || 0;



        /* =========================================
           SOUNDNESS
           ========================================= */

        const soundnessAdjustments = {

            sound: 0,

            minor: -1500,

            managed: -4000,

            limited: -7000

        };


        estimatedValue +=
            soundnessAdjustments[
                soundness
            ] || 0;



        /*
         * Prevent unrealistic negative
         * prototype values.
         */

        estimatedValue =
            Math.max(
                estimatedValue,
                1500
            );



        /*
         * Create a range around
         * the midpoint.
         */

        let lowEstimate =
            estimatedValue * 0.82;

        let highEstimate =
            estimatedValue * 1.18;



        /*
         * Round estimates to the
         * nearest $500.
         */

        function roundTo500(value) {

            return Math.round(
                value / 500
            ) * 500;

        }


        lowEstimate =
            roundTo500(
                lowEstimate
            );


        highEstimate =
            roundTo500(
                highEstimate
            );


        estimatedValue =
            roundTo500(
                estimatedValue
            );



        /* =========================================
           DISPLAY RESULTS
           ========================================= */

        document.getElementById(
            "hvi-low-value"
        ).textContent =
            formatCurrency(
                lowEstimate
            );


        document.getElementById(
            "hvi-high-value"
        ).textContent =
            formatCurrency(
                highEstimate
            );


        document.getElementById(
            "hvi-mid-value"
        ).textContent =
            formatCurrency(
                estimatedValue
            );


        formView.hidden = true;

        resultView.hidden = false;

    }
);



/* =========================================
   FORMAT MONEY
   ========================================= */

function formatCurrency(value) {

    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",

            currency: "USD",

            maximumFractionDigits: 0
        }
    ).format(value);

}



/* =========================================
   VALUE ANOTHER HORSE
   ========================================= */

valueAgainButton.addEventListener(
    "click",
    function () {

        hviForm.reset();

        resultView.hidden = true;

        formView.hidden = false;

    }
);
