
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

    // اسم عضو هيئة التدريس (فوق)
    ctx.font = "bold 28px Arial";
    ctx.textAlign = "center";
    ctx.fillText(teacherName, canvas.width / 2, 170);

    // نص رسالة الشكر (وسط الصفحة بخط أصغر)
    let message = "";
    if (messageOption === "1") {
      message = `إلى من زرع فينا بذور الطموح، وسقاها علمًا واهتمامًا حتى أينعت إنجازًا وتخرجًا…
كنتم لنا أكثر من معلّم، كنتم الدافع حين تراجعنا، والسند حين ترددنا، والنور حين غابت الرؤية.
لم تكن كلماتكم تمرُّ مرورًا عابرًا، بل كانت ترسخ في الذاكرة وتبني فينا الإنسان قبل أن تُشكّل فينا الطالب.
وفي يوم التخرّج، لا يسعنا إلا أن نلتفت بامتنان لمن كان له الفضل بعد الله في وصولنا،
شكرًا لكم… فقد كنتم أثرًا لا يُمحى، وعلامة فارقة في دربنا العلمي والإنساني .`;
    } else {
      message = `في لحظة تخرجي، لا يسعني إلا أن أقف وقفة تقدير وإجلال،
لمن كان النور في طريق العتمة، والدافع في لحظة التراجع، والقدوة حين ضاعت المعايير.
لقد تركتم فينا أثرًا لا تمحوه الأيام، وزرعتم في قلوبنا امتنانًا لا يزول.
شكرًا لكم، لأنكم كنتم أكثر من معلّم… كنتم مصدرًا للثقة، ومثالًا للرسالة النبيلة .`;
    }

    ctx.font = "14px Arial";
    ctx.textAlign = "right";
    wrapText(ctx, message, canvas.width - 80, 300, 700, 24);

    // اسم الطالب تحت الرسالة
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.fillText(studentName, canvas.width / 2, 460);

    canvas.style.display = "block";
  };
}

function downloadImage() {
  const canvas = document.getElementById("certificateCanvas");
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "certificate.png";
  link.href = image;
  link.click();
}
