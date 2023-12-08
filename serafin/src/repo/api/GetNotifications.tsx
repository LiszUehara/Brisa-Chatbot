import Papa from 'papaparse';
import RNFetchBlob from 'rn-fetch-blob';

const downloadAndReadCSV = async (url) => {
  try {
    const response = await RNFetchBlob.config({
      fileCache: true,
    }).fetch('GET', url);

    const localPath = response.path();

    const fileContent = await RNFetchBlob.fs.readFile(localPath, 'utf-8');
    //console.log(fileContent)

    return readCSVFile(fileContent);
  } catch (error) {
    console.error('Erro ao baixar ou ler o arquivo CSV:', error);
    throw error;
  }
};

const readCSVFile = (content) => {
  try {
    const parsedData = Papa.parse(content, { header: true });
    //console.log("testando "+parsedData)
    return parsedData.data;
  } catch (error) {
    console.error('Erro ao ler o arquivo CSV:', error);
    throw error;
  }
};

export { downloadAndReadCSV };
