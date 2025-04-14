document.addEventListener("DOMContentLoaded", function () {
  const paymentMethodSelect = document.getElementById("payment-method");
  const paymentInstruction = document.getElementById("payment-instruction");
  const paymentAmountInput = document.getElementById("payment-amount");
  const remainingAmountEl = document.getElementById("remaining-amount");
  const totalTuitionEl = document.getElementById("total-tuition");
  const paidAmountEl = document.getElementById("paid-amount");
  const totalCreditsEl = document.getElementById("total-credits");

  const payBtn = document.getElementById("pay-button");
  const printBtn = document.getElementById("print-invoice");
  const historyBody = document.getElementById("payment-history");

  const unitPrice = 500000;

  // Giả lập dữ liệu môn học đã đăng ký
  const registeredCourses = [
    { tenMon: "Cơ sở dữ liệu", soTinChi: 3 },
    { tenMon: "Cấu trúc dữ liệu", soTinChi: 3 },
    { tenMon: "Mạng máy tính", soTinChi: 3 },
    { tenMon: "Trí tuệ nhân tạo", soTinChi: 3 },
    { tenMon: "Hệ điều hành", soTinChi: 3 },
  ];

  function formatCurrency(num) {
    return num.toLocaleString("vi-VN") + " VND";
  }

  function updateTuitionInfo() {
    const totalCredits = registeredCourses.reduce((sum, c) => sum + c.soTinChi, 0);
    const totalTuition = totalCredits * unitPrice;
    const paid = 5000000;
    const remaining = totalTuition - paid;

    totalCreditsEl.textContent = totalCredits;
    totalTuitionEl.textContent = formatCurrency(totalTuition);
    paidAmountEl.textContent = formatCurrency(paid);
    remainingAmountEl.textContent = formatCurrency(remaining);
    paymentAmountInput.value = formatCurrency(remaining);
  }

  paymentMethodSelect.addEventListener("change", function () {
    if (paymentMethodSelect.value === "transfer") {
      paymentInstruction.style.display = "block";
    } else {
      paymentInstruction.style.display = "none";
    }
  });

  payBtn.addEventListener("click", function () {
    alert("Vui lòng quét mã QR để thanh toán!");

    // Hiển thị ảnh QR (giả lập)
    const qrSection = document.createElement("div");
    qrSection.className = "text-center mt-4";
    qrSection.innerHTML = `
      <h5>Quét mã QR để thanh toán</h5>
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=HocPhi-${paymentAmountInput.value}" style="max-width: 200px;" />
  <div class="mt-4 text-start" style="max-width: 400px; margin: 0 auto;">
    <h6><i class="fas fa-university"></i> Thông tin chuyển khoản</h6>
    <p><strong>Ngân hàng:</strong> Vietcombank</p>
    <p><strong>Số tài khoản:</strong> 123456789</p>
    <p><strong>Tên tài khoản:</strong> Đại học KHV</p>
    <p><strong>Nội dung:</strong> SV001 - Nguyễn Văn A - Học phí HK1</p>
  </div>

  <div class="mt-3">
    <button class="btn btn-success" id="confirm-payment">
      <i class="fas fa-check-circle"></i> Xác nhận đã thanh toán
    </button>
  </div>
    `;
    payBtn.parentElement.appendChild(qrSection);

    const confirmBtn = qrSection.querySelector("#confirm-payment");
    confirmBtn.addEventListener("click", function () {
      const now = new Date().toLocaleDateString("vi-VN");
      const method = paymentMethodSelect.options[paymentMethodSelect.selectedIndex].text;
      const amount = paymentAmountInput.value;

      // Cập nhật lịch sử thanh toán
      historyBody.innerHTML += `
        <tr>
          <td>${now}</td>
          <td>${amount}</td>
          <td>${method}</td>
          <td><span class="badge bg-success">Hoàn thành</span></td>
        </tr>
      `;

      // Cập nhật phần còn nợ
      remainingAmountEl.textContent = "0 VND";
      paymentAmountInput.value = "0 VND";

      alert("Thanh toán thành công!");
      qrSection.remove();
    });
  });

  printBtn.addEventListener("click", function () {
    const win = window.open("", "", "width=800,height=700");
    const danhSach = registeredCourses.map(
      (m) => `<li>${m.tenMon} - ${m.soTinChi} tín chỉ</li>`
    ).join("");

    const tongTinChi = registeredCourses.reduce((sum, c) => sum + c.soTinChi, 0);
    const tongHocPhi = tongTinChi * unitPrice;

    win.document.write(`
      <h2>HÓA ĐƠN HỌC PHÍ</h2>
      <p><strong>Sinh viên:</strong> Nguyễn Văn A (SV001)</p>
      <p><strong>Học kỳ:</strong> HK1 - Năm học 2025</p>
      <hr/>
      <h4>Danh sách môn học:</h4>
      <ul>${danhSach}</ul>
      <p><strong>Tổng tín chỉ:</strong> ${tongTinChi}</p>
      <p><strong>Đơn giá:</strong> ${formatCurrency(unitPrice)}</p>
      <p><strong>Tổng học phí:</strong> ${formatCurrency(tongHocPhi)}</p>
      <p><strong>Phương thức:</strong> ${paymentMethodSelect.options[paymentMethodSelect.selectedIndex].text}</p>
      <p><strong>Trạng thái:</strong> ĐÃ THANH TOÁN</p>
    `);
    win.print();
  });

  updateTuitionInfo();
});
