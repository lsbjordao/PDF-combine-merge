const fs = require("fs-extra");
const path = require("path");
const { exec } = require("child_process");

const inputDir = path.resolve("./input");

async function convertPptxToPdf() {
  try {
    // Certifique-se de que o diretório existe
    if (!fs.existsSync(inputDir)) {
      console.error("A pasta './input/' não existe!");
      return;
    }

    // Liste todos os arquivos na pasta
    const files = fs.readdirSync(inputDir);

    // Filtra os arquivos .pptx
    const pptxFiles = files.filter((file) => file.endsWith(".pptx"));

    if (pptxFiles.length === 0) {
      console.log("Nenhum arquivo .pptx foi encontrado na pasta './input/'!");
      return;
    }

    console.log(`Convertendo ${pptxFiles.length} arquivos .pptx para PDF...`);

    // Processa cada arquivo .pptx
    for (const file of pptxFiles) {
      const filePath = path.join(inputDir, file);
      const outputDir = inputDir; // PDFs serão salvos na mesma pasta

      console.log(`Convertendo: ${file} para PDF...`);

      // Executa o comando do LibreOffice
      const sofficePath = "C:\\Program Files\\LibreOffice\\program\\soffice.exe"; // Altere se o caminho for diferente
      const command = `"${sofficePath}" --headless --convert-to pdf "${filePath}" --outdir "${outputDir}"`;


      await new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`Erro ao converter ${file}:`, stderr.trim());
            reject(error);
          } else {
            console.log(`Sucesso: ${file} convertido para PDF.`);
            resolve(stdout.trim());
          }
        });
      });
    }

    console.log("Conversão concluída!");
  } catch (error) {
    console.error("Erro geral:", error.message);
  }
}

convertPptxToPdf();
