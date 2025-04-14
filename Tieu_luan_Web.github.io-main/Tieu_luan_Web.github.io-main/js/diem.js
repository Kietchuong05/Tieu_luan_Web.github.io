document.addEventListener('DOMContentLoaded', function () {
  const courseSelect = document.getElementById('course-select');
  const scoreTableContainer = document.getElementById('score-table-container');
  const scoreTable = document.getElementById('score-table');
  const saveButton = document.getElementById('save-btn');
  const deleteAllButton = document.getElementById('delete-all-btn');

  // Dữ liệu mẫu sinh viên
  const studentsData = {
    "Công nghệ Web - CS406.1": [
      { id: "SV001", name: "Trần Văn Tèo", qtScore: 8.0, examScore: 7.5, totalScore: 7.8 },
      { id: "SV002", name: "Nguyễn Thị Tý", qtScore: 6.5, examScore: 8.0, totalScore: 7.2 },
      { id: "SV003", name: "Lê Văn B", qtScore: 6.5, examScore: 8.0, totalScore: 7.2 }
    ],
    "Trí tuệ nhân tạo - CS465.2": [
      { id: "SV004", name: "Phạm Văn C", qtScore: 9.0, examScore: 8.5, totalScore: 8.8 },
      { id: "SV005", name: "Đặng Thị D", qtScore: 7.0, examScore: 6.5, totalScore: 6.8 }
    ]
  };

  // Xử lý thay đổi môn học được chọn
  courseSelect.addEventListener('change', function () {
    const selectedCourse = courseSelect.value;

    if (selectedCourse !== '-- Chọn môn học --') {
      // Hiển thị bảng điểm
      scoreTableContainer.style.display = 'block';

      // Tải dữ liệu sinh viên và điểm theo môn học
      loadStudentData(selectedCourse);
    } else {
      // Ẩn bảng điểm nếu không chọn môn học
      scoreTableContainer.style.display = 'none';
    }
  });

  // Hàm tải dữ liệu sinh viên theo môn học
  function loadStudentData(course) {
    const students = studentsData[course];

    // Xóa dữ liệu cũ trong bảng
    scoreTable.querySelector('tbody').innerHTML = '';

    // Thêm dữ liệu vào bảng
    students.forEach(student => {
      const row = scoreTable.querySelector('tbody').insertRow();
      row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td><input type="number" value="${student.qtScore}" class="form-control" data-type="qtScore" disabled></td>
        <td><input type="number" value="${student.examScore}" class="form-control" data-type="examScore" disabled></td>
        <td><span class="total-score">${student.totalScore.toFixed(2)}</span></td>
        <td>
          <button class="btn btn-warning btn-sm edit-btn">Chỉnh sửa</button>
          <button class="btn btn-danger btn-sm delete-btn">Xóa</button>
        </td>
      `;

      // Thêm sự kiện thay đổi điểm QT và điểm thi
      row.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function () {
          const qtScore = parseFloat(row.querySelector('[data-type="qtScore"]').value) || 0;
          const examScore = parseFloat(row.querySelector('[data-type="examScore"]').value) || 0;
          const totalScore = qtScore * 0.4 + examScore * 0.6;
          row.querySelector('.total-score').textContent = totalScore.toFixed(2); // Cập nhật điểm tổng
        });
      });
    });

    // Thêm sự kiện xóa cho các nút "Xóa"
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', function () {
        const row = button.closest('tr');
        row.remove(); // Xóa hàng khỏi bảng
      });
    });

    // Thêm sự kiện chỉnh sửa cho các nút "Chỉnh sửa"
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
      button.addEventListener('click', function () {
        const row = button.closest('tr');
        const inputs = row.querySelectorAll('input');
        
        // Mở các ô nhập liệu
        inputs.forEach(input => input.disabled = false);

        // Ẩn nút chỉnh sửa và hiển thị nút lưu
        button.style.display = 'none';
        let saveButton = row.querySelector('.save-btn');
        if (!saveButton) {
          saveButton = document.createElement('button');
          saveButton.classList.add('btn', 'btn-success', 'btn-sm', 'save-btn');
          saveButton.innerText = 'Lưu';
          button.closest('td').appendChild(saveButton);

          saveButton.addEventListener('click', function () {
            // Lưu các thay đổi
            inputs.forEach(input => input.disabled = true); // Khóa các ô nhập liệu sau khi lưu
            button.style.display = 'inline-block'; // Hiển thị lại nút chỉnh sửa
            saveButton.style.display = 'none'; // Ẩn nút lưu

            const qtScore = parseFloat(row.querySelector('[data-type="qtScore"]').value) || 0;
            const examScore = parseFloat(row.querySelector('[data-type="examScore"]').value) || 0;
            const totalScore = qtScore * 0.4 + examScore * 0.6;
            row.querySelector('.total-score').textContent = totalScore.toFixed(2); // Cập nhật điểm tổng
          });
        }
      });
    });
  }

  // Xử lý sự kiện nhấn nút "Lưu tất cả"
  saveButton.addEventListener('click', function () {
    const rows = scoreTable.querySelector('tbody').rows;
    const dataToSave = [];
    for (let i = 0; i < rows.length; i++) {
      const cells = rows[i].cells;
      const studentData = {
        studentId: cells[0].innerText,
        fullName: cells[1].innerText,
        qtScore: cells[2].querySelector('input').value,
        examScore: cells[3].querySelector('input').value,
        totalScore: cells[4].innerText,
      };
      dataToSave.push(studentData);
    }

    console.log('Dữ liệu đã lưu:', dataToSave);
    alert('Dữ liệu đã được lưu!');

    // Khóa tất cả ô nhập điểm
    const inputFields = scoreTable.querySelectorAll('input');
    inputFields.forEach(input => {
      input.disabled = true; // Vô hiệu hóa tất cả ô nhập liệu
    });

    // Ẩn tất cả các nút chỉnh sửa
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
      button.style.display = 'none';
    });
  });

  // Xử lý sự kiện nhấn nút "Xóa tất cả"
  deleteAllButton.addEventListener('click', function () {
    const rows = scoreTable.querySelector('tbody').rows;
    while (rows.length > 0) {
      rows[0].remove(); // Xóa tất cả các hàng trong bảng
    }
  });
});
