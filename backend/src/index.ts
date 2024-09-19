import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Hono } from 'hono';
import { sign } from 'hono/jwt'

// Create the main Hono app
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
		JWT_SECRET: string,
	}
}>();

app.post('/api/v1/signup', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	try {
		const user = await prisma.user.create({
			data: {
        name : body.name,
				email: body.email,
				password: body.password
			}
		});
		const jwt = await sign({ id: user.id },c.env?.JWT_SECRET);
		return c.json({message:"sign up success",jwt:jwt});
	} catch(e) {
		c.status(403);
		return c.json({ error: "error while signing up" });
	}
})

app.post("/api/v1/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl  : c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const user = await prisma.user.findUnique({
      where:{
        email:body.email
      }
    })
    if(!user) {
      return c.json({error:"user not registered"})
    }
    const jwt = await sign({id : user.id}, c.env.JWT_SECRET)
    return c.json({message: "sign in success", jwt: jwt})
  } catch (error) {
    c.status(422)
    return c.json({error : "sign in error"})
  }
})

app.post("/api/v1/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl : c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  
})


export default app
