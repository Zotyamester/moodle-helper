// Copy this code and paste it in the browser console of the quiz page.

let questions = [];

$(".formulation").each(function (_, formulation) {
  const questionText = $(".qtext", formulation).text();
  const options = $(".answer", formulation).text();

  const question = `${questionText}\n${options}`;
  questions.push(question);
});

const mergedQuestions = questions.join("\n");
console.log(mergedQuestions);
