document.addEventListener('DOMContentLoaded', function () {
  fetchData();
  fetchFiles();
});

function fetchData() {
  fetch('fetch_data.php')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('table-body');
      tableBody.innerHTML = '';
      Object.keys(data).forEach(password => {
        const file = data[password];
        const row = `<tr>
                      <td>${password}</td>
                      <td>${file}</td>
                      <td>
                        <button class="btn-td-js" onclick="editData('${password}', '${file}')">Edit</button>
                        <button class="btn-td-js" onclick="removeData('${password}')">Delete</button>
                      </td>
                    </tr>`;
        tableBody.innerHTML += row;
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}

function fetchFiles() {
  fetch('fetch_files.php')
    .then(response => response.json())
    .then(files => {
      const fileList = document.getElementById('file-list');
      fileList.innerHTML = '';
      files.forEach(file => {
        const listItem = document.createElement('li');
        listItem.textContent = file;
        fileList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching files:', error));
}

function addData() {
  const password = document.getElementById('password').value;
  const file = document.getElementById('file').value;
  if (password && file) {
    fetch('add_data.php', {
      method: 'POST',
      body: JSON.stringify({ password, file }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      fetchData();
    })
    .catch(error => console.error('Error adding data:', error));
  } else {
    alert('Please enter both password and file name.');
  }
}

function editData(password, file) {
  const newPassword = prompt('Enter new password:', password);
  if (newPassword !== null) {
    const newFile = prompt('Enter new file name:', file);
    if (newFile !== null) {
      fetch('edit_data.php', {
        method: 'POST',
        body: JSON.stringify({ oldPassword: password, newPassword, newFile }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        fetchData();
      })
      .catch(error => console.error('Error editing data:', error));
    }
  }
}

function removeData(password) {
  if (confirm('Are you sure you want to delete this entry?')) {
    fetch('delete_data.php', {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      fetchData();
    })
    .catch(error => console.error('Error deleting data:', error));
  }
}

function uploadFile() {
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch('upload_file.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            fetchFiles(); // Refresh file list in sidebar
        })
        .catch(error => console.error('Error uploading file:', error));
    } else {
        alert('Please select a file to upload.');
    }
}
