export const DEFAULT_MSG = [
  {
    message: `Hello ☀️ Welcome to XXX Dry Cleaning service. Let us care for your clothes by choosing one of the following services 👇`,
    sender: "bot",
  },
  {
    message: "",
    sender: "bot",
    options: [
      {
        text: " Wash & Fold",
        value: "Does your service provide wash and fold?",
      },
      {
        text: " Dry Cleaning",
        value: "Does your service provide dry cleaning?",
      },
      {
        text: " Sewing & Alterations",
        value: "Does your service provide sewing and alterations?",
      },
      {
        text: " Stain Removal",
        value: "Does your service provide stain removal?",
      },
      {
        text: " Special Care Fabric Cleaning",
        value: "Does your service provide special care fabric cleaning?",
      },
      {
        text: " Othersadadadas",
        value: "What other options do you have?",
      },
    ],
  },
]

export const createDefaultMsg = (
  businessName: string,
  questions: { text: string; value: string }[]
) => [
  {
    message: `Hello ☀️ Welcome to ${businessName}. Let us care for your clothes by choosing one of the following services 👇`,
    sender: "bot",
  },
  {
    message: "",
    sender: "bot",
    options: questions.map((question) => ({
      text: question.text,
      value: question.value,
    })),
  },
]
