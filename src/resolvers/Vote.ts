export function link(parent, args, context) {
  return context.prisma.vote.findOne({ where: { id: parent.id } }).link();
}

export function user(parent, args, context) {
  return context.prisma.vote.findOne({ where: { id: parent.id } }).user();
}
