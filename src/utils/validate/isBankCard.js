export default function (bankCard) {
  if (!bankCard) return false
  try {
    bankCard = bankCard.toString()
  } catch (e) {}
  return !!bankCard.trim().match(/^([1-9]{1})(\d{15}|\d{16}|\d{17}|\d{18})$/)
}
