export function postedBy(parent, args, context) {
  return context.prisma.link.findOne({ where: { id: parent.id } }).postedBy();
}

export function votes(parent, args, context) {
  return context.prisma.link.findOne({ where: { id: parent.id } }).votes();
}
