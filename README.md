# OpenAI different API capabilities (WIP)
This project was built to play a little bit with OpenAI capabilities.

&nbsp;
## Getting Started
1. Clone Project.
2. Install packages by running `npm install`
3. Create new file and name it `.env`
4. Generate and copy [API key](https://beta.openai.com/account/api-keys)
5. Paste the copied API key into `.env` file as follow: 
``
OPENAI_API_KEY="<PASTE_YOUR_API_KEY>"
``
6. Run the project - `npm run dev`

7. Open browser [http://localhost:3000](http://localhost:3000)

The project should be served on port 3000, in case that port is not available, Next.js will increment port number until available.

&nbsp;
## Home page:
![image](https://user-images.githubusercontent.com/10623307/217327332-9b8afe7b-1286-4d61-b40a-e2da6fbe8435.png)

&nbsp;
## Ask AI:
![image](https://user-images.githubusercontent.com/10623307/216154202-f614c5af-b9ad-47eb-9ae1-b1c3df727006.png)

Running on http://localhost:3000/completion

&nbsp;
## Generate Image from Text:
![image](https://user-images.githubusercontent.com/10623307/216153594-bf8c7a82-79b2-4b90-ad79-424000f5de27.png)

Running on http://localhost:3000/image-creation

&nbsp;
## Generate Variations from Image:
![image](https://user-images.githubusercontent.com/10623307/217328388-fc4ad513-59a0-4cd1-b597-7616849160ac.png)

Running on http://localhost:3000/image-variation