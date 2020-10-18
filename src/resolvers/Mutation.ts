import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

import { getUserId } from "../utils";

export async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.user.create({
    data: { ...args, password },
  });
  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return { token, user };
}

export async function login(parent, args, context, info) {
  const user = await context.prisma.user.findOne({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error("No such user found!");
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);

  return { token, user };
}

export function createPost(parent, args, context, info) {
  const userId = getUserId(context);
  const newLink = context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  });

  context.pubsub.publish("NEW_LINK", newLink);

  return newLink;
}

export async function updatePost(parent, args, context, info) {
  getUserId(context);
  const link = await context.prisma.link.findOne({ where: { id: args.id } });
  if (!link) {
    throw new Error("No such link found!");
  }

  return context.prisma.link.update({
    where: { id: args.id },
    data: {
      url: args.url,
      description: args.description,
    },
  });
}

export async function deletePost(parent, args, context, info) {
  getUserId(context);
  const link = await context.prisma.link.findOne({ where: { id: args.id } });
  if (!link) {
    throw new Error("No such link found!");
  }

  const status = await context.prisma.link.delete({ where: { id: args.id } });
  if (!status) {
    throw new Error("Delete failed, please try again!");
  } else {
    return "Successfully deleted.";
  }
}
