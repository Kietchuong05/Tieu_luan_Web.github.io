document.addEventListener("DOMContentLoaded", () => {
  const updateBtn = document.querySelector(".btn-primary"); // Nút cập nhật thông tin
  const emailDiv = document.querySelector(".form-control-static:nth-child(5)"); // Div chứa email
  const phoneDiv = document.querySelector(".form-control-static:nth-child(6)"); // Div chứa số điện thoại
  const avatarImg = document.querySelector(".avatar"); // Ảnh đại diện
  const changeAvatarBtn = document.querySelector(".btn-success"); // Nút đổi ảnh
  
  // Tạo input file ẩn để đổi avatar
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.style.display = "none";
  document.body.appendChild(fileInput);

  // Khi bấm vào nút "Đổi ảnh", kích hoạt input file
  changeAvatarBtn.addEventListener("click", () => {
    fileInput.click();
  });

  // Khi người dùng chọn ảnh, thay đổi avatar
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        avatarImg.src = e.target.result; // Thay đổi nguồn ảnh
      };
      reader.readAsDataURL(file);
    }
  });

  let isEditing = false; // Cờ kiểm tra chế độ chỉnh sửa

  // Chức năng cập nhật thông tin
  updateBtn.addEventListener("click", () => {
    if (!isEditing) {
      // Đổi sang chế độ chỉnh sửa
      const currentEmail = emailDiv.innerText.trim();
      const currentPhone = phoneDiv.innerText.trim();

      // Chuyển email và số điện thoại thành input
      emailDiv.innerHTML = `<input type="email" class="form-control" id="email-input" value="${currentEmail}">`;
      phoneDiv.innerHTML = `<input type="tel" class="form-control" id="phone-input" value="${currentPhone}">`;

      updateBtn.innerHTML = `<i class="fas fa-save"></i> Lưu thông tin`; // Thay đổi nội dung nút
      updateBtn.classList.remove("btn-primary");
      updateBtn.classList.add("btn-success");

      isEditing = true;
    } else {
      // Lưu lại thông tin
      const newEmail = document.getElementById("email-input").value;
      const newPhone = document.getElementById("phone-input").value;

      // Cập nhật lại thông tin hiển thị
      emailDiv.innerText = newEmail;
      phoneDiv.innerText = newPhone;

      updateBtn.innerHTML = `<i class="fas fa-edit"></i> Cập nhật thông tin`; // Đổi lại nội dung nút
      updateBtn.classList.remove("btn-success");
      updateBtn.classList.add("btn-primary");

      isEditing = false;
    }
  });
});