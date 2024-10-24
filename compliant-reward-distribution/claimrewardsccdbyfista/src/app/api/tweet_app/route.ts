// app/api/tweet/route.ts
import { NextResponse } from 'next/server';
import { TwitterApi } from 'twitter-api-v2';

const twitterClient = new TwitterApi("AAAAAAAAAAAAAAAAAAAAALBAwgEAAAAAOjAESM2o6hFRWKR5mgPAqXjtIFY%3DqKv0l8LAFaoUeVARaqCkeq9AaTL7GSmE70m8pxNmHI068LxKiq"); // Store the key in an env variable for security

export async function GET() {
    try {
        console.log("twitterClient", twitterClient)
        // const tweet = await twitterClient.v1.singleTweet('1848901042848530561');
        const tweet = await twitterClient.v2.singleTweet('1848901042848530561', {
            expansions: [
              'entities.mentions.username',
              'in_reply_to_user_id',
            ],
          });
        console.log("tweet", tweet)
        return NextResponse.json({ tweet });
    } catch (error) {
        console.error('Error fetching tweet:', error);
        return NextResponse.json({ error: 'Failed to fetch tweet' }, { status: 500 });
    }
}
