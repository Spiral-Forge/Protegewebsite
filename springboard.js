document.addEventListener("DOMContentLoaded", function() {
    const faqs = document.querySelectorAll(".faq");

    faqs.forEach(faq => {
        const question = faq.querySelector(".faq-question");

        question.addEventListener("click", function() {
            const answer = faq.querySelector(".faq-answer");
            const icon = question.querySelector("i");

            if (answer.style.display === "block") {
                answer.style.display = "none";
                icon.classList.remove("fa-minus");
                icon.classList.add("fa-plus");
            } else {
                answer.style.display = "block";
                icon.classList.remove("fa-plus");
                icon.classList.add("fa-minus");
            }
        });
    });
});
