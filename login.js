document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector(".login-container form"); 
    const usernameInput = document.querySelector('.login-container input[placeholder="Tên đăng nhập"]');
    const passwordInput = document.querySelector('.login-container input[placeholder="Mật khẩu"]');

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Ngăn load lại trang

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            
            let errorMessage = document.getElementById("error-message");
            if (!errorMessage) {
                errorMessage = document.createElement("div");
                errorMessage.id = "error-message";
                errorMessage.style.color = "red";
                errorMessage.style.marginBottom = "10px";
                errorMessage.style.fontWeight = "bold";
                loginForm.insertBefore(errorMessage, loginForm.firstChild);
            }

            // Xóa hiệu ứng cũ
            usernameInput.classList.remove("input-error");
            passwordInput.classList.remove("input-error");

            // Kiểm tra nhập đủ thông tin
            if (username === "" || password === "") {
                errorMessage.textContent = "⚠ Vui lòng nhập đầy đủ thông tin!";
                if (username === "") usernameInput.classList.add("input-error");
                if (password === "") passwordInput.classList.add("input-error");
                return;
            }

            // Danh sách tài khoản hợp lệ
            const users = {
                "sinhvien1": { password: "123", role: "sinhvien.html" },
                "sinhvien2": { password: "123", role: "sinhvien.html" },
                "giangvien": { password: "456", role: "giangvien.html" },
                "quanli": { password: "789", role: "quanli.html" },
            };

            // Kiểm tra đăng nhập
            if (users[username] && users[username].password === password) {
                window.location.href = users[username].role; // Chuyển trang
            } else {
                errorMessage.textContent = "❌ Tài khoản hoặc mật khẩu không đúng!";
                usernameInput.classList.add("input-error");
                passwordInput.classList.add("input-error");
            }
        });
    }
});

