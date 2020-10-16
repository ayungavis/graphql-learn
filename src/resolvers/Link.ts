export function postedBy(parent, args, context) {
  return context.prisma.link.fineOne({ where: { id: parent.id } }).postedBy();
}
