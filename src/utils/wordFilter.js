export function wordFilter(source, target) {
  const _source = source.toLowerCase();
  const _target = target.toLowerCase();

  return _source.split(" ").filter((word) => word.includes(_target));
}
