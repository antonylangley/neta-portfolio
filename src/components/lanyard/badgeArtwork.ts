function roundedRectPath(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

export function createBadgeImage() {
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 1180;

  const context = canvas.getContext("2d");

  if (!context) {
    return null;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  roundedRectPath(context, 32, 32, 836, 1116, 76);
  context.fillStyle = "#fffdf9";
  context.fill();

  roundedRectPath(context, 76, 78, 748, 258, 44);
  context.fillStyle = "#262320";
  context.fill();

  context.fillStyle = "#e8583a";
  context.fillRect(76, 324, 748, 12);

  context.fillStyle = "#fffdf9";
  context.font = "500 30px Arial, sans-serif";
  context.letterSpacing = "7px";
  context.fillText("PORTFOLIO PASS", 116, 158);

  context.font = "500 118px Georgia, serif";
  context.letterSpacing = "0px";
  context.fillText("Neta", 112, 263);

  context.strokeStyle = "rgba(255, 253, 249, 0.38)";
  context.lineWidth = 3;
  context.beginPath();
  context.arc(724, 205, 58, 0, Math.PI * 2);
  context.stroke();

  context.fillStyle = "#e8583a";
  context.font = "600 38px Arial, sans-serif";
  context.textAlign = "center";
  context.fillText("NR", 724, 219);
  context.textAlign = "left";

  context.fillStyle = "#262320";
  context.font = "500 94px Georgia, serif";
  context.fillText("Rogovsky", 94, 474);

  context.fillStyle = "#4a473f";
  context.font = "500 34px Arial, sans-serif";
  context.letterSpacing = "6px";
  context.fillText("HCI / UI UX DESIGNER", 98, 542);

  context.strokeStyle = "#ddd6c8";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(94, 604);
  context.lineTo(806, 604);
  context.stroke();

  context.fillStyle = "#8a8578";
  context.font = "500 25px Arial, sans-serif";
  context.letterSpacing = "4px";
  context.fillText("SCHOOL", 98, 674);

  context.fillStyle = "#262320";
  context.font = "500 39px Arial, sans-serif";
  context.letterSpacing = "0px";
  context.fillText("New Jersey Institute", 98, 726);
  context.fillText("of Technology", 98, 774);

  const chips = ["Research", "Prototyping", "Figma"];
  let chipX = 98;

  chips.forEach((chip) => {
    const width = context.measureText(chip).width + 54;
    roundedRectPath(context, chipX, 846, width, 66, 33);
    context.fillStyle = chip === "Prototyping" ? "#e8583a" : "#f7f4ee";
    context.fill();
    context.fillStyle = chip === "Prototyping" ? "#fffdf9" : "#262320";
    context.font = "500 28px Arial, sans-serif";
    context.fillText(chip, chipX + 27, 889);
    chipX += width + 18;
  });

  context.fillStyle = "#262320";
  context.fillRect(98, 990, 18, 88);
  context.fillRect(134, 990, 8, 88);
  context.fillRect(160, 990, 24, 88);
  context.fillRect(205, 990, 10, 88);
  context.fillRect(234, 990, 18, 88);
  context.fillRect(280, 990, 8, 88);
  context.fillRect(304, 990, 34, 88);
  context.fillRect(360, 990, 12, 88);
  context.fillRect(396, 990, 20, 88);

  context.fillStyle = "#8a8578";
  context.font = "500 25px Arial, sans-serif";
  context.letterSpacing = "2px";
  context.fillText("SELECTED WORK 2026", 498, 1041);

  return canvas.toDataURL("image/png");
}
