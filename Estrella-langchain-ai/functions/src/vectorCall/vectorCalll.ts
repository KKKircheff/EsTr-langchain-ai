import * as functions from "firebase-functions";
import {getStorage, ref, getDownloadURL} from "firebase/storage";
import {initializeApp} from "firebase/app";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";

import {FaissStore} from "langchain/vectorstores/faiss";
import {OpenAIEmbeddings} from "langchain/embeddings/openai";
import {ChatOpenAI} from "langchain/chat_models/openai";
import {RetrievalQAChain, loadQAStuffChain} from "langchain/chains";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
};

export const vectorCall = functions
  .region("europe-west1")
  .https.onRequest(
    async (req, res) => {
      const {message} = req.query;
      if (typeof message !== "string") {
        res.status(400).json({
          response:
                        "Sorry something went wrong with the type of message. Could you be more specific, please.",
        });
        return;
      }

      const pdfName = "VisionPro";
      const storagePath = `${pdfName}_vectors/`;
      const filesToDownload = ["docstore.json", "faiss.index"];

      const FIREBASE_KEY = process.env.VITE_FIREBASE_KEY;
      const OPEN_AI_KEY = process.env.VITE_OPENAI_API_KEY;

      try {
        const firebaseConfig = {
          apiKey: FIREBASE_KEY,
          authDomain: "aisberg-ai1.firebaseapp.com",
          projectId: "aisberg-ai1",
          storageBucket: "aisberg-ai1.appspot.com",
          messagingSenderId: "134614804027",
          appId: "1:134614804027:web:7f2ed557914d471e8e1e1e",
        };

        const app = initializeApp(firebaseConfig);
        const storage = getStorage(app);

        const downloadAndSaveFile = async (fileName: string) => {
          const fileRef = ref(storage, `${storagePath}${fileName}`);
          const downloadURL = await getDownloadURL(fileRef);
          const response = await fetch(downloadURL);
          const fileData = await response.arrayBuffer();
          const tempFilePath = path.join(os.tmpdir(), fileName);
          fs.writeFileSync(tempFilePath, Buffer.from(fileData));
          console.log(`File ${fileName} downloaded and saved.`);
        };

        for (const fileName of filesToDownload) {
          await downloadAndSaveFile(fileName);
        }

        const embeddings = new OpenAIEmbeddings({
          openAIApiKey: OPEN_AI_KEY,
          modelName: "text-embedding-ada-002",
        });

        const model = new ChatOpenAI({
          openAIApiKey: OPEN_AI_KEY,
          modelName: "gpt-3.5-turbo",
          temperature: 0,
          verbose: true,
        });

        const vectorStore = await FaissStore.load("./tmp", embeddings);

        const chains = new RetrievalQAChain({
          combineDocumentsChain: loadQAStuffChain(model),
          retriever: vectorStore.asRetriever(),
          returnSourceDocuments: true,
        });

        const data = await chains.call({
          query: `Answer following prompt: ${message} in 3 sentences`,
        });
        const response = data.text;
        res.set(CORS_HEADERS);
        res.status(200).json({
          response,
        });
      } catch (error) {
        console.error("Error:", error);
        res.set(CORS_HEADERS);
        res.status(500).json({
          response: `Sorry, something went wrong with this search.
          I tried hard but could not find a proper result. ${error}`,
        });
      }
    });
