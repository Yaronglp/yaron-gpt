# OpenAI different API capabilities
This project was built to play a little bit with OpenAI API capabilities.

&nbsp;
## Getting Started
1. Clone Project.
2. Install packages by running `npm install`
3. Generate and copy [API key](https://beta.openai.com/account/api-keys) from OpenAI
4. API key can be consumed by `.env` or by `LocalStorage`, for `LocalStorage` method, jump to section 9
5. Create new file and name it `.env`
6. Copy the API key from section 3 and paste it into `.env` file as follow:
``
OPENAI_API_KEY="<PASTE_YOUR_API_KEY>"
``
7. Run the project - `npm run dev`
8. Open browser [http://localhost:3000](http://localhost:3000)
9. If you didn't use the `.env` method, click on `Insert OpenAI key` on the landing page, paste the API key from section 3, and click save
10. Enjoy

The project should be served on port 3000, in case that port is not available, Next.js will increment port number until available.

&nbsp;
## Home page:
![image](https://user-images.githubusercontent.com/10623307/227323185-e3bde282-2090-4763-ac3e-8da638ecf955.png)

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

&nbsp;
## FAQ:

#### Question: Why I'm getting the error message - `You exceeded your current quota, please check your plan and billing details.`
Answer: [Link](https://help.openai.com/en/articles/6614457-why-am-i-getting-an-error-message-stating-that-i-ve-reached-my-usage-limit) for explanation.

