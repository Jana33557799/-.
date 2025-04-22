
document.getElementById("certificateForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const teacher = document.getElementById("teacherName").value;
  const student = document.getElementById("studentName").value;
  const message = document.getElementById("thankYouMessage").value;
  const messageText = message === "message1" ? 
    "إلى من زرع فينا بذور الطموح..." :
    "في لحظة تخرجي، لا يسعني إلا أن أقف...";
  document.getElementById("certificateResult").innerHTML = `
    <div style='margin-top:20px'>
      <h2>شهادة شكر</h2>
      <p><strong>${teacher}</strong></p>
      <p>${messageText}</p>
      <p><strong>${student}</strong></p>
      <a href="#" onclick="window.print()">تحميل كـ PDF أو صورة</a>
    </div>
  `;
});
