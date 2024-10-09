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
