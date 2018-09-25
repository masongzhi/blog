export default function(idCard) {
  if (!idCard) return false;
  try {
    idCard = idCard.toString();
  } catch (e) {}
  return !!idCard.trim().match(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/);
}
