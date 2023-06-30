import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

import { FaissStore } from 'langchain/vectorstores/faiss';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { RetrievalQAChain } from 'langchain/chains';
import { loadQAStuffChain } from 'langchain/chains';

import fs from 'fs';
import { config } from 'dotenv';
config();

const FIREBASE_KEY = process.env.VITE_FIREBASE_KEY;
const OPEN_AI_KEY = process.env.VITE_OPENAI_API_KEY;

const firebaseConfig = {
    apiKey: FIREBASE_KEY,
    authDomain: 'aisberg-ai1.firebaseapp.com',
    projectId: 'aisberg-ai1',
    storageBucket: 'aisberg-ai1.appspot.com',
    messagingSenderId: '134614804027',
    appId: '1:134614804027:web:7f2ed557914d471e8e1e1e',
};

const pdfName = 'VisionPro';
const storagePath = `${pdfName}_vectors/`
const localFolderPath = './tmp/';

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const downloadAndSaveFile = async (fileName) => {
    const fileRef = ref(storage, `${storagePath}${fileName}`);
    const downloadURL = await getDownloadURL(fileRef);
    const response = await fetch(downloadURL);
    const fileData = await response.arrayBuffer();
    const filePath = `${localFolderPath}${fileName}`;
    fs.writeFileSync(filePath, Buffer.from(fileData));
    console.log(`File ${fileName} downloaded and saved.`);
};

if (!fs.existsSync(localFolderPath)) {
    fs.mkdirSync(localFolderPath);
    console.log("Local folder created:", localFolderPath);
  }

const filesToDownload = ['docstore.json', 'faiss.index'];

// Download and save each file locally
for (const fileName of filesToDownload) {
    await downloadAndSaveFile(fileName);
}

const embeddings = new OpenAIEmbeddings({
    openAIApiKey: OPEN_AI_KEY,
    modelName: 'text-embedding-ada-002',
});

const model = new ChatOpenAI({
    openAIApiKey: OPEN_AI_KEY,
    modelName: 'gpt-3.5-turbo',
    temperature: 0,
    verbose: true,
});

const vectorStore = await FaissStore.load('./tmp', embeddings);

const chains = new RetrievalQAChain({
    combineDocumentsChain: loadQAStuffChain(model),
    retriever: vectorStore.asRetriever(),
    returnSourceDocuments: true,
});

const res = await chains.call({
    query: 'tell me some advantages of Apple Vision Pro in 3 sentances',
});

console.log(res.text);
