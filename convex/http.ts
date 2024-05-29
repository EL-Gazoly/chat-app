import { Webhook } from 'svix'
import { WebhookEvent } from '@clerk/nextjs/server'

import { internal } from './_generated/api'
import { httpAction } from './_generated/server'
import { httpRouter } from 'convex/server'

const validateRequest = async (req : Request) : Promise<WebhookEvent | undefined> => {
    const payload = await req.text()
    const svixHeaders = {
        "svix-id": req.headers.get("svix-id")!,
        "svix-timestamp": req.headers.get("svix-timestamp")!,
        "svix-signature": req.headers.get("svix-signature")!,
    }
   
    const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "whsec_4m5AjCQ67JlZkmEXuM6drcln/J4dv7/4")
    try {
      const event = webhook.verify(payload, svixHeaders) as WebhookEvent
      return event
    }catch(e) {
        console.log("Clrek webhook verification failed", e)
        return
    }
}
const handleClerkWebhook = httpAction(async (ctx, request) => {
  const event = await validateRequest(request);
  if (!event) {
    return new Response("Error occured", { status: 400 });
  }
  console.log("event", event.type, event.data.id)
  switch (event.type) {
    case 'user.created':
    case 'user.updated': {
      const user = await ctx.runQuery(internal.users.getUser, { subject: event.data.id! })
      if (user) {
        console.log('user exists', user)
      } else {
      await ctx.runMutation(internal.users.create, {
        username: event.data.username || event.data.first_name!,
        imageUrl: event.data.image_url!,
        clrekId: event.data.id!,
        email: event.data.email_addresses[0].email_address!,
      })
      break
    }
  }
    case 'user.deleted': {
     console.log('user deleted', event.data.id)
    }
    default: {
      console.log('ignored Clerk webhook event', event.type)
    }
  }
  return new Response(null, { status: 200 });
});

const http = httpRouter();


http.route({
  path: "/clerk-users-webhook",
  method: "POST",
  handler: handleClerkWebhook,
});

export default http;