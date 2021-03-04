let documents = [
  {
    name: "pan_attachment",
    documentId: "1000000290",
    documentTypeId: "1000000036",
  },
  {
    name: "passport",
    documentId: "1000000288",
    documentTypeId: "1000000036",
  },
  {
    name: "voter_card",
    documentId: "1000000289",
    documentTypeId: "1000000036",
  },
  {
    name: "dl",
    documentId: "1000000287",
    documentTypeId: "1000000036",
  },
  {
    name: "address_attachment",
    documentId: "1000000374",
    documentTypeId: "1000000037",
  },
  {
    name: "telephone_bill",
    documentId: "1000000302",
    documentTypeId: "1000000037",
  },
  {
    name: "electricity_bill",
    documentId: "1000000321",
    documentTypeId: "1000000037",
  },
  {
    name: "life_insurance",
    documentId: "1000000366",
    documentTypeId: "1000000037",
  },
  {
    name: "salary_slips_attachment",
    documentId: "1000000307",
    documentTypeId: "1000000043",
  },
  {
    name: "bank_statement_attachment",
    documentId: "1000000308",
    documentTypeId: "1000000044",
  },
  {
    name : 'ITR_attachment',
    documentId : "1000000306",
    documentTypeId : "1000000038"
  },
];

export const getDocumentIdandTypeId = (name) => {
  let document = documents.filter((d) => d.name == name);
  return document;
};
