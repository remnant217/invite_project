const FORMSPREE_ENDPOINT = "https://formspree.io/f/mpqknwvk";

document.addEventListener(
  "submit",
  async function (event) {
    const form = event.target;

    if (!form.matches("#wedding-form")) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
    const status = form.querySelector(".wedding-form__status");

    const originalButtonText = submitButton ? submitButton.textContent : "";

    if (status) {
      status.textContent = "Отправляем...";
      status.classList.remove("wedding-form__status_success", "wedding-form__status_error");
    }

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "ОТПРАВЛЯЕМ...";
    }

    const formData = new FormData(form);
    formData.append("_subject", "Анкета со свадебного сайта");

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        form.reset();

        if (status) {
          status.textContent = "Форма отправлена, спасибо!";
          status.classList.add("wedding-form__status_success");
        }
      } else {
        if (status) {
          status.textContent = "Не получилось отправить анкету. Попробуйте ещё раз.";
          status.classList.add("wedding-form__status_error");
        }
      }
    } catch (error) {
      if (status) {
        status.textContent = "Ошибка соединения. Проверьте интернет и попробуйте ещё раз.";
        status.classList.add("wedding-form__status_error");
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    }
  },
  true
);