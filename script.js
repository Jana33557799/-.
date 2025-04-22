function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}

function generateCertificate() {
  const teacherName = document.getElementById("teacherName").value.trim();
  const studentName = document.getElementById("studentName").value.trim();
  const messageOption = document.getElementById("thankMessage").value;

  if (!teacherName || !studentName) {
    alert("يرجى تعبئة جميع الحقول");
    return;
  }

  const canvas = document.getElementById("certificateCanvas");
  const ctx = canvas.getContext("2d");

  const image = new Image();
  image.src = "certificate.png";

  image.onload = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    ctx.font = "bold 32px Arial";
    ctx.fillText(teacherName, canvas.width / 2, 300);

    ctx.font = "34px Arial";
    let message = "";
    if (messageOption === "1") {
      message = `إلى من زرع فينا بذور الطموح، وسقاها علمًا واهتمامًا حتى أينعت إنجازًا وتخرجًا… كنتم لنا أكثر من معلّم، كنتم الدافع حين تراجعنا، والسند حين ترددنا، والنور حين غابت الرؤية.`;
    } else {
      message = `في لحظة تخرجي، لا يسعني إلا أن أقف وقفة تقدير وإجلال لكل من علمني، وساندني، وكان له بالغ الأثر في رحلتي التعليمية.`;
    }

    wrapText(ctx, message, canvas.width - 100, 100, 700, 44);

    ctx.font = "bold 32px Arial";
    ctx.fillText(studentName, canvas.width / 2, 700);

    canvas.style.display = "block";
  };
}

function downloadImage() {
  const canvas = document.getElementById("certificateCanvas");
  const image = canvas.toDataURL("image/png");
