
// دالة لف النص داخل الكانفاس
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

// دالة ترسل البيانات إلى جوجل شيتس
function sendDataToSheet(teacherName, studentName, messageOption) {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbyBfwEsjxYvhC50yDjg027jI9Y-7Fe4-1ZVTB2WxXKzANo5J3nUEQthY5HSTiPy_iNc/exec';
  const data = { teacherName, studentName, messageOption };

  fetch(scriptURL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: JSON.stringify(data) })
  })
  .then(() => console.log('تم إرسال البيانات بنجاح'))
  .catch(error => console.error('خطأ أثناء إرسال البيانات:', error));
}

// دالة إنشاء الشهادة
function generateCertificate() {
  const teacherName   = document.getElementById("teacherName").value.trim();
  const studentName   = document.getElementById("studentName").value.trim();
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
    // نظف الكانفاس وارسم الخلفية
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";

    // 1) اسم عضو هيئة التدريس في الأعلى
    ctx.font = "bold 28px Arial";
    ctx.textAlign = "center";
    ctx.fillText(teacherName, canvas.width / 2, 200);

    // 2) نص رسالة الشكر في المنتصف
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

    ctx.font = "25px Arial";
    ctx.textAlign = "right";
    wrapText(ctx, message, canvas.width - 80, 260, 700, 36);

    // 3) اسم الطالب تحت الرسالة
    ctx.font = "bold 23px Arial";
    ctx.textAlign = "center";
    ctx.fillText(studentName, canvas.width / 2, 475);

    // 4) نرسل البيانات إلى Google Sheets
    sendDataToSheet(teacherName, studentName, messageOption);

    // 5) أخيرًا نظهر الكانفاس
    canvas.style.display = "block";
  };
}

// دالة تحميل الشهادة كصورة
function downloadImage() {
  const canvas = document.getElementById("certificateCanvas");
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "certificate.png";
  link.href = image;
  link.click();
}
