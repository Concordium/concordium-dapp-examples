# Cloudflare Turnstile setup

The purpose of this guide is to show how to configure the production domain in Vercel and the Cloudflare Turnstile service.

1. Go to the project in Vercel, then Settings/Domains
   ![step1](images/step1.png)

2. Fill in your domain and click Add.
   ![step2](images/step2.png)

3. Note the table values, To use in the next step.
   ![step3](images/step3.png)

4. Go to the domain management panel, where you or your team has the domain registered, and then DNS Settings. And add a new CNAME record. Fill up with the values from the previous step.
   Name -> Host and Value -> Value .
   ![step4](images/step4.png)
   ![step4b](images/step4b.png)
   ![step4c](images/step4c.png)

5. Go back to the project in Settings/Vercel Domains and wait for it to look like this.
   ![step5](images/step5.png)

6. In your Cloudflare dashboard. Go to Turnstile and fill it in as follows.
   ![step6](images/step6.png)

7. Click on create and copy the sitekey and the secret
   
   ![step7](images/step7.png)

8. Go to the project on Vercel, then navigate to Settings > Environment Variables and update the variables NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY and CLOUDFLARE_TURNSTILE_SECRET.
   ![step8](images/step8.png)

9.  Go to Deployments and click on the three points of the last deployment and then click on redeploy.
   ![step9](images/step9.png)

That's it, the produccion domain and the Cloudfare Human Verification is ready now. 🎉
