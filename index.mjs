import line from '@line/bot-sdk';

// LINE Messaging APIのチャンネルアクセストークンを環境変数から取得
const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

// LINE Messaging APIのクライアントの設定
const client = new line.Client({
    channelAccessToken: channelAccessToken
});

export const handler = async (event) => {
    const eventObject = event.events[0];
    if (eventObject.type === 'message' && eventObject.message.type === 'text') {
        // TODO:
        await client.replyMessage(eventObject.replyToken, {
            type: 'text',
            text: eventObject.message.text
        });
    }
};
