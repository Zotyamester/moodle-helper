import anthropic
from PyPDF2 import PdfReader
from dotenv import load_dotenv

# Load the environment variables
load_dotenv()

# Get the answer to a question from the AI model in use
def get_answer(question, client):
    message = client.messages.create(
        model="claude-3-opus-20240229",
        max_tokens=1024,
        temperature=0,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": question
                    }
                ]
            }
        ]
    ) 
    return message.content[0].text

# Gather context from a PDF file
def extract_text_from_pdf(pdf_file_path):
    text = ""
    with open(pdf_file_path, "rb") as f:
        pdf = PdfReader(f)
        for page in pdf.pages:
            text += page.extract_text()
    return text

# Read questions from a text file
def extract_questions_from_txt(txt_file_path):
    questions = []
    with open(txt_file_path, "r", encoding="utf8") as f:
        questions = [question.strip() for question in f.read().split("\n\n")]
    return questions

if __name__ == "__main__":
    # Temporarily disable context usage as it is too long to pass to the API
    # context = extract_text_from_pdf("textbook.pdf")
    questions = extract_questions_from_txt("questions.txt")

    client = anthropic.Anthropic()  # ANTHROPIC_API_KEY should contain the API key

    for task_number, question in enumerate(questions, start=1):
        answer = get_answer(question, client)
        print(f"{task_number}: {answer}")

    client.close()
