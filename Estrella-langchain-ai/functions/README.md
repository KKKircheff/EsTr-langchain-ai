1. pnpm create vite Estrella-langchain-ai --template react-ts
2. pnpm install -D tailwindcss postcss autoprefixer
	npx tailwindcss init -p

	than add in VScode settings (if not added) - "files.associations": {
 	 						 "*.css": "tailwindcss"
							}
3. pnpm i tailwind-merge
4. pnpm install -D prettier prettier-plugin-tailwindcss
5. pnpm install -S daisyui
			
  - register daisyui in tailwindcss.config

	module.exports = {
            ...
	    plugins: [
              require('daisyui'),
      	      require('@tailwindcss/typography'),
             ],
	    ...
 	  }

 - for the 'require' error add in .eslintrc.cjs:
		 env: { browser: true, es2020: true, node:true },
 - add in index.html in the html tag for a dark theme for example: <html data-theme="dark">
 - add in tailwindcss.config (prevents from tailwind optimize cleaner): 
	purge: {
   	 content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   	 options: {
    	 	 safelist: [
      			  /data-theme$/,
      			]
    		  },
 	       },

- pnpm install @tailwindcss/typography

 - optional !!! In case of no themeing:
		 daisyui: {
     		    styled: true,
    		    themes: false,
    		    rtl: false,
   		 }, 

6. pnpm install react-icons 
7. firebase experiments:enable webframeworks /* vscode prompt terminal
8. firebase init     /* before create project in firebase prompt terminal
9. pnpm install langchain //* in backend ( functions folder)
10. pnpm install firebase
11. firebase init emulators      /* in vscode terminal and in the backend
12. firebase emulators:start   /* in vscode terminal and in the backend
13. pnpm install typeorm  !!!! some problem with langchain, install same folder as langchain
14. pnpm add @google-cloud/functions-framework
15. pnpm install faiss-node /* in ./functions
16. pnpm install pdf-parse   /*in ./functions
17. npm install pickleparser  /* needed for faiss-node
18. npm intsall firebase-admin





To start vite app:		 npm run dev
To test functions with eslint:	 npm run lint -- --fix    		 /* in the functions folder
To build functions after lint:	 npm run build		  		 /* in the functions folder
To deploy functions 		 firebase deploy --only functions	 /* in the functions folder
To start functions emulator	 firebase emulators:start --only functions /* from main project folder


To deploy app:
npm run build
firebase deploy --only hosting /* main app folder

CORS policy for functions useful video: https://www.youtube.com/watch?v=f6_q5fumj9U

-------- MARKS ------
tailwind + vite docs:    https://tailwindcss.com/docs/guides/vite

daisyUI - themes docs: https://v1.daisyui.com/docs/default-themes 

git rm .env --cached
git commit -m "Any message" /*stop tracking .env in vite


firebase experiments:enable webframeworks

!!!! Do not install second eslint with 'firebase init' !!!! 

in .eslintrc for long text lines add in 'rules':
"max-len": [
      "error",
      {
        "code": 80,
        "ignoreComments": true, // "comments": 80
        "ignoreUrls": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
      },
    ],


deploy multiple functions: 
https://gcpfirebase.com/structure-cloud-functions-for-firebase-to-deploy-multiple-functions-from-multiple-files/

best practice for defining region:
export const templateCall = functions.region('europe-west1').https.onRequest(async (req, res) => {
....
}

the example was: 

const functions = require('firebase-functions');
exports.webhookEurope = functions
    .region('europe-west1')
    .https.onRequest((req, res) => {
            res.send("Hello");
    });




The difference between ChatOpenAi and OpenAI models is:
that the first one is the pretrained model,
while the second one is only language model

http://127.0.0.1:5001/aisberg-ai1/europe-west1/templateCall?message=could you give me the location of Sofia Bulgaria

Github with firebase and pnpm 
https://www.elian.codes/blog/22-08-10-deploy-firebase-using-github-actions/