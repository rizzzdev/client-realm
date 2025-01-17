const string =
  "Rumus Einstein <equation>E = mc^2</equation>, Rumus Newton <equation>F = ma</equation>";

console.log(string.split(/<\/?bola>/).filter((a) => a.trim() !== ""));
