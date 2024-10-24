// app/api/getTweet/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAALBAwgEAAAAAxux%2FQ%2F1PYImZrrJbLOdQlXrUH38%3D0VfNSIElVKjDvjIZf9Y6NyTaRYb85xtiah4nbFF4zWpdgjesqi"; // Make sure to store this in your environment variables

export async function POST(req: Request) {
    try {
        const { tweetUrl } = await req.json();
        console.log("tweetUrl", tweetUrl)
        const tweetId = tweetUrl.split('/').pop();
        console.log("tweetId", tweetId)
        const response = await axios.get(`https://api.twitter.com/2/tweets/${tweetId}`, {
            headers: {
                'Authorization': `Bearer ${BEARER_TOKEN}`
            },
            params: {
                'tweet.fields': 'text,author_id,created_at'
            }
        });
        console.log("response", response)

        return NextResponse.json(response.data);
    } catch (error) {
        console.log("Error:", error)
        return NextResponse.json({ error: 'Unable to fetch tweet' }, { status: 500 });
    }
}
