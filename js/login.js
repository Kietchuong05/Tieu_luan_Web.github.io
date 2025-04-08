document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".login-container form");
    const usernameInput = form.querySelector('input[type="text"]');
    const passwordInput = form.querySelector('input[type="password"]');
  
    // Danh sách tài khoản mẫu
    const accounts = [
      { username: "sv001", password: "123456", role: "Sinh viên" },
      { username: "gv001", password: "654321", role: "Giảng viên" },
      { username: "ql001", password: "admin@khv", role: "Quản lý" }
    ];
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      // Reset trạng thái cũ
      resetInputStyles();
  
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
  
      let isValid = true;
  
      // Kiểm tra rỗng
      if (username === "") {
        showError(usernameInput, "Vui lòng nhập tên đăng nhập");
        isValid = false;
      }
  
      if (password === "") {
        showError(passwordInput, "Vui lòng nhập mật khẩu");
        isValid = false;
      }
  
      if (!isValid) return;
  
      // Kiểm tra tài khoản
      const foundAccount = accounts.find(
        acc => acc.username === username && acc.password === password
      );
  
      if (!foundAccount) {
        showError(usernameInput);
        showError(passwordInput);
        showMessage("Sai thông tin đăng nhập!", "danger");
      } else {
        showMessage(`Đăng nhập thành công với vai trò: ${foundAccount.role}`, "success");
        // Nếu cần chuyển trang:
        if (!foundAccount) {
            showError(usernameInput);
            showError(passwordInput);
            showMessage("Sai thông tin đăng nhập!", "danger");
          } else {
            showMessage(`Đăng nhập thành công với vai trò: ${foundAccount.role}`, "success");
          
            // Chuyển trang theo vai trò
            switch (foundAccount.role) {
              case "Sinh viên":
                window.location.href = "sinhvien.html";
                break;
              case "Giảng viên":
                window.location.href = "giangvien.html";
                break;
              case "Quản lý":
                window.location.href = "quanly.html";
                break;
              default:
                showMessage("Vai trò không xác định!", "danger");
            }
          }
      }
    });
  
    function showError(input, message) {
      input.classList.add("is-invalid");
      if (message) showMessage(message, "warning");
    }
  
    function resetInputStyles() {
      usernameInput.classList.remove("is-invalid");
      passwordInput.classList.remove("is-invalid");
      const alertBox = document.querySelector(".alert-box");
      if (alertBox) alertBox.remove();
    }
  
    function showMessage(message, type = "info") {
      const alert = document.createElement("div");
      alert.className = `alert alert-${type} alert-box mt-2`;
      alert.textContent = message;
  
      const button = form.querySelector("button");
      if (button.nextElementSibling) button.nextElementSibling.remove();
      button.after(alert);
    }
  });
  
  