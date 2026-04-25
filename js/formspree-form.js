const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpqknwvk';

document.addEventListener('submit', async function (event) {
    const form = event.target;

    if (!form.closest('#rec1862692201')) {
        return;
    }

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
    const originalButtonText = submitButton ? submitButton.textContent : '';

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Отправляем...';
    }

    const formData = new FormData(form);
    formData.append('_subject', 'Анкета со свадебного сайта');

    try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            body: formData,
            headers: {
                Accept: 'application/json'
            }
        });

        if (response.ok) {
            alert('Спасибо! Ваш ответ сохранён.');
            form.reset();
        } else {
            alert('Не получилось отправить анкету. Попробуйте ещё раз.');
        }
    } catch (error) {
        alert('Ошибка соединения. Проверьте интернет и попробуйте ещё раз.');
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        }
    }
}, true);