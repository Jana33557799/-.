function generateCertificate() {
  const canvas = document.getElementById('certificateCanvas');
  const ctx = canvas.getContext('2d');
  const teacherName = document.getElementById('teacherName').value.trim();
  const studentName = document.getElementById('studentName').value.trim();
  const message = document.getElementById('message').value.trim();

  const background = new Image();
  background.src = 'certificate.png';
  background.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.textAlign = 'center';
    ctx.fillStyle = '#333';

    // اسم عضو هيئة التدريس - رفع إلى y = 290
    ctx.font = 'bold 30px Cairo';
    ctx.fillText(teacherName || ' ', canvas.width / 2, 290);

    // اسم الطالب - تحت المربع بثلاث أسطر تقريباً
    ctx.font = 'bold 34px Cairo';
    ctx.fillText(studentName || ' ', canvas.width / 2, 355);

    // رسالة الشكر - حجم خط أكبر
    ctx.font = 'bold 32px Cairo';
    wrapText(ctx, message, canvas.width / 2, 410, 750, 40);
  };
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

function downloadImage() {
  const canvas = document.getElementById('certificateCanvas');
  const link = document.createElement('a');
  link.download = 'certificate.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function downloadPDF() {
  const canvas = document.getElementById('certificateCanvas');
  const imgData = canvas.toDataURL('image/png');
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] });
  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save('certificate.pdf');
}
