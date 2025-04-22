function generate() {
  const teacher = document.getElementById('teacher').value.trim();
  const student = document.getElementById('student').value.trim();
  const sel = document.querySelector('input[name="thankMessage"]:checked');
  if (!teacher || !sel || !student) {
    alert('يرجى ملء جميع الحقول واختيار رسالة الشكر');
    return;
  }
  const messages = {
    msg1: document.querySelector('#msg1 + p').innerText,
    msg2: document.querySelector('#msg2 + p').innerText
  };
  const thankMessage = messages[sel.value];

  const canvas = document.getElementById('certificate');
  const ctx = canvas.getContext('2d');
  const img = new Image();
  img.src = 'certificate.png';
  img.onload = () => {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.drawImage(img,0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = 'bold 30px Cairo';
    ctx.fillText(teacher, canvas.width/2, 260);
    ctx.font = 'bold 34px Cairo';
    wrapText(ctx, thankMessage, canvas.width/2, 320, 800, 40);
    ctx.font = 'bold 32px Cairo';
    ctx.fillText(student, canvas.width/2, 600);
    canvas.style.display = 'block';
  };
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  for(let n=0;n<words.length;n++){
    const testLine = line+words[n]+' ';
    if(ctx.measureText(testLine).width>maxWidth && n>0){
      ctx.fillText(line,x,y);
      line = words[n]+' ';
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line,x,y);
}

function downloadImage() {
  const canvas = document.getElementById('certificate');
  const link = document.createElement('a');
  link.download = 'certificate.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}

function downloadPDF() {
  const canvas = document.getElementById('certificate');
  const imgData = canvas.toDataURL('image/png');
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] });
  pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
  pdf.save('certificate.pdf');
}
