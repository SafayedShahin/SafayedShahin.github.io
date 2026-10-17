(function () {
    const LANGUAGE_KEY = "siteLanguage";

    function getSavedLanguage() {
        try {
            return localStorage.getItem(LANGUAGE_KEY) === "ja" ? "ja" : "en";
        } catch (error) {
            return "en";
        }
    }

    function setLanguage(language) {
        language = language === "ja" ? "ja" : "en";

        document.documentElement.lang = language;

        // Translate text that has English and Japanese versions.
        document.querySelectorAll("[data-en][data-ja]").forEach(function (element) {
            element.textContent = element.getAttribute("data-" + language);
        });

        // Translate input placeholders.
        document.querySelectorAll(
            "[data-placeholder-en][data-placeholder-ja]"
        ).forEach(function (element) {
            element.placeholder = element.getAttribute(
                "data-placeholder-" + language
            );
        });

        // Update every language button on the page.
        document.querySelectorAll(".language-toggle").forEach(function (button) {
            button.textContent = language === "en"
                ? "🇯🇵 日本語"
                : "🇬🇧 English";
        });

        // Remember the language for other pages.
        try {
            localStorage.setItem(LANGUAGE_KEY, language);
        } catch (error) {
            console.warn("Could not save language preference.");
        }
    }

    // Allow existing page buttons to call setLanguage("en") or setLanguage("ja").
    window.setLanguage = setLanguage;

    function initializeLanguage() {
        setLanguage(getSavedLanguage());

        // Event delegation supports the language button on every page.
        document.addEventListener("click", function (event) {
            const button = event.target.closest(".language-toggle");
            if (!button) return;

            const currentLanguage = document.documentElement.lang;
            setLanguage(currentLanguage === "ja" ? "en" : "ja");
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initializeLanguage);
    } else {
        initializeLanguage();
    }
})();
