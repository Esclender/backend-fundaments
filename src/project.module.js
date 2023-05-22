export let contacts = [
  {
    id: 1,
    name: "Esclender",
    phone_number: "+51928590695"
  },
  {
    id: 2,
    name: "Gerson",
    phone_number: "+51925590687"
  },
  {
    id: 3,
    name: "Eduardo",
    phone_number: "+519285475210"
  }
]

export function setContacts (newOne) {
  contacts = newOne

  return contacts
}
