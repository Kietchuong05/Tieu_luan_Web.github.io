document.addEventListener("DOMContentLoaded", function () {
  // Dữ liệu mẫu sinh viên theo lớp
  const studentData = {
    "CS406.1": [
      { id: "SV001", name: "Trần Văn Tèo", gender: "Nam", dob: "2002-01-15", email: "teo@sv.edu.vn",  },
      { id: "SV002", name: "Nguyễn Thị Tý", gender: "Nữ", dob: "2002-03-22", email: "ty@sv.edu.vn", },
      { id: "SV003", name: "Lê Văn B", gender: "Nam", dob: "2002-08-10", email: "b@sv.edu.vn", }
    ],
    "CS465.2": [
      { id: "SV004", name: "Phạm Văn C", gender: "Nam", dob: "2001-12-01", email: "c@sv.edu.vn", },
      { id: "SV005", name: "Đặng Thị D", gender: "Nữ", dob: "2001-07-09", email: "d@sv.edu.vn", }
    ]
  };
  

  // Xử lý khi click nút "Danh sách"
  document.querySelectorAll(".btn-outline-success").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const row = btn.closest("tr");
      const classId = row.children[1].textContent.trim(); // Mã lớp là cột thứ 2
      const className = row.children[0].textContent.trim(); // Môn học

      // Tìm vùng hiển thị danh sách hoặc tạo mới nếu chưa có
      let existingContainer = document.getElementById("student-list-container");

      if (!existingContainer) {
        existingContainer = document.createElement("div");
        existingContainer.id = "student-list-container";
        existingContainer.className = "row mt-4";
        existingContainer.innerHTML = `
          <div class="col-md-12">
            <h4><i class="fas fa-users me-2"></i>Danh sách sinh viên lớp <span id="selected-class-name"></span></h4>
            <div class="table-responsive">
              <table class="table table-bordered" id="student-list-table">
                <thead class="table-light">
                  <tr>
                    <th>Mã SV</th>
                    <th>Họ tên</th>
                    <th>Giới tính</th>
                    <th>Ngày sinh</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody></tbody>
              </table>
            </div>
          </div>
        `;
        row.parentElement.parentElement.parentElement.appendChild(existingContainer);
      }

      // Cập nhật tên lớp
      document.getElementById("selected-class-name").textContent = `${className} - ${classId}`;

      // Hiển thị dữ liệu sinh viên
      const tbody = document.querySelector("#student-list-table tbody");
      tbody.innerHTML = "";

      const students = studentData[classId] || [];
      if (students.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center text-danger">Không có dữ liệu sinh viên</td></tr>`;
      } else {
        students.forEach((student) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.gender}</td>
            <td>${student.dob}</td>
            <td>${student.email}</td>
          `;
          tbody.appendChild(row);
        });
      }

      existingContainer.style.display = "block";
    });
  });
});
