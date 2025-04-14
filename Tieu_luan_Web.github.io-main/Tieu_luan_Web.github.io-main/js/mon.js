document.addEventListener("DOMContentLoaded", () => {
  const addCourseButtons = document.querySelectorAll(".add-course-btn");
  const registeredList = document.querySelector(".registered-list");
  const submitButton = document.getElementById("submit-register");

  let registeredCourses = [];

  // Hàm thêm môn học vào danh sách đã đăng ký
  addCourseButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      const courseItem = e.target.closest(".list-group-item");
      const courseTitle = courseItem.querySelector("strong").innerText;
      const courseTime = courseItem.querySelector("small").innerText;
      
      // Kiểm tra nếu đã đăng ký môn học
      if (registeredCourses.some(course => course.title === courseTitle)) {
        alert("Môn học này đã được đăng ký!");
        return;
      }

      // Thêm môn học vào danh sách đã đăng ký
      registeredCourses.push({ title: courseTitle, time: courseTime });

      const courseDiv = document.createElement("div");
      courseDiv.classList.add("list-group-item");
      courseDiv.innerHTML = `
        <div class="d-flex justify-content-between">
          <div>
            <strong>${courseTitle}</strong><br />
            <small>${courseTime}</small>
          </div>
          <button class="btn btn-sm btn-danger remove-course-btn">
            <i class="fas fa-times"></i> Hủy
          </button>
        </div>
      `;
      registeredList.appendChild(courseDiv);

      // Cập nhật lại các nút "Đăng ký" sau khi đã chọn
      courseItem.querySelector(".add-course-btn").disabled = true;
    });
  });

  // Hàm hủy đăng ký môn học
  registeredList.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-course-btn")) {
      const courseDiv = e.target.closest(".list-group-item");
      const courseTitle = courseDiv.querySelector("strong").innerText;

      // Xóa môn học khỏi danh sách đã đăng ký
      registeredCourses = registeredCourses.filter(course => course.title !== courseTitle);
      courseDiv.remove();

      // Cập nhật lại nút "Đăng ký" ở danh sách môn học
      const courseItem = Array.from(document.querySelectorAll(".list-group-item")).find(item => 
        item.querySelector("strong").innerText === courseTitle);
      if (courseItem) {
        courseItem.querySelector(".add-course-btn").disabled = false;
      }
    }
  });

  // Hàm khóa tất cả các thao tác sau khi bấm "Gửi đăng ký"
  submitButton.addEventListener("click", () => {
    // Khóa các thao tác
    document.querySelectorAll(".add-course-btn, .remove-course-btn").forEach(button => {
      button.disabled = true;
    });
    submitButton.disabled = true;

    alert("Đăng ký đã được gửi thành công!");
  });
});
