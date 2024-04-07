const passwordForm = document.getElementById('passwordForm');
const passwordInput = document.getElementById('password');
const statusMessage = document.querySelector('.status-message');

passwordForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    const password = passwordInput.value;

    // Fetch JSON file containing filenames and passwords
    fetch('dynamic/files.json')
        .then(response => response.json())
        .then(data => {
            // Find the filename corresponding to the entered password
            const filename = data[password];
            if (filename) {
                downloadFile(filename);
            } else {
                statusMessage.textContent = "Incorrect password. Please try again.";
                statusMessage.classList.remove('success');
                statusMessage.classList.add('error');
                statusMessage.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            statusMessage.textContent = "Error: Unable to validate password.";
            statusMessage.classList.remove('success');
            statusMessage.classList.add('error');
            statusMessage.style.display = 'block';
        });
});

function downloadFile(filename) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "upload/" + filename, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
        if (xhr.status === 200) {
            const blob = xhr.response;
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            link.click();
            statusMessage.textContent = "Download successful!";
            statusMessage.classList.remove('error');
            statusMessage.classList.add('success');
            statusMessage.style.display = 'block';
        } else {
            statusMessage.textContent = "Error: Unable to download file.";
            statusMessage.classList.remove('success');
            statusMessage.classList.add('error');
            statusMessage.style.display = 'block';
        }
    };
    xhr.send();
};