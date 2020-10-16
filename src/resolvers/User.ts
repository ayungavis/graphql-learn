export function links(parent, args, context) {
  return context.prisma.user.fineOne({ where: { id: parent.id } }).links();
}
