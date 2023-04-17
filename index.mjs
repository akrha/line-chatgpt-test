import line from '@line/bot-sdk';
import { Configuration, OpenAIApi } from "openai";

// LINE Messaging APIのチャンネルアクセストークンを環境変数から取得
const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

// LINE Messaging APIのクライアントの設定
const client = new line.Client({
    channelAccessToken: channelAccessToken
});

// OpenAIのAPIキーを環境変数から取得
const apiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
    apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

export const handler = async (event) => {
    const eventObject = event.events[0];
    if (eventObject.type === 'message' && eventObject.message.type === 'text') {
        // ChatGPTに質問して応答を取得
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: eventObject.message.text } // ユーザーの入力をChatGPTに送信
            ],
        });

        // ChatGPTの応答をLINEに返信
        await client.replyMessage(eventObject.replyToken, {
            type: 'text',
            text: completion.data.choices[0].message.content
        });
    }
};
