export const findBank = (banks, id) => {
  const bank = banks.filter((bank) => bank.bank_id === id)
  if (bank.length > 0) return bank[0]
  else return banks[5]
}
