import type { Request } from "@sveltejs/kit"
import PrismaClient from "$lib/prisma";

const prisma = new PrismaClient();

export const api = async (request: Request<{user: User}>, data?: Record<string, unknown>) => {
  let body = {};
  let status = 500;
  const user = request?.locals?.user;

  if (!user) {
    return {
      status: 401,
      body
    };
  }
  
  switch (request.method.toUpperCase()) {
    case "GET":
      console.time("get");
      body = await prisma.todo.findMany({
        where: {
          userEmail: user.email
        }
      });
      status = 200;
      console.timeEnd("get");
      break;
    case "POST":
      body = await prisma.todo.create({
        data: {
          userEmail: user.email,
          created_at: data.created_at as Date,
          text: data.text as string,
          done: data.done as boolean
        }
      });
      status = 201;
      break;
    case "DELETE":
      body = await prisma.todo.delete({
        where: {
          uid: request.params.uid
        }
      });
      status = 200;
      break;
    case "PATCH":
      console.time("patch");
      body = await prisma.todo.update({
        where: {
          uid: request.params.uid
        },
        data: {
          text: data.text,
          done: data.done
        }
      })
      status = 200;
      console.timeEnd("patch");
      break;
  }

  if (request.method.toUpperCase() !== "GET" &&
    request.headers.accept !== "application/json") {
    return {
      status: 303,
      headers: {
        location: "/"
      }
    }
  }
  return {
    status,
    body
  }
}
