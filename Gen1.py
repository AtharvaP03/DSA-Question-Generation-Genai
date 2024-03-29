from flask import Flask, jsonify, render_template
import random
import google.generativeai as genai

app = Flask(__name__)


dsa_topics = {
    "Arrays": [
        "Dynamic Programming (DP) problems related to arrays.",
        "Sorting algorithms for arrays.",
        "Search algorithms for arrays."
    ],
    "Linked Lists": [
        "Dynamic Programming (DP) problems related to linked lists.",
        "Insertion and deletion operations in linked lists.",
        "Cyclic detection and removal in linked lists."
    ],
    "Stacks and Queues": [
        "Implementing stacks and queues using arrays or linked lists.",
        "Applications of stacks and queues in algorithm design.",
        "Optimizing stack and queue operations for efficiency."
    ],
    "Trees": [
        "Dynamic Programming (DP) problems related to trees.",
        "Traversal algorithms for trees (e.g., inorder, preorder, postorder).",
        "Balancing techniques for binary search trees."
    ]
}

def generate_dsa_question(topic):
    prompt = f"""
    **Topic:** {topic}

    **Instructions:**
    - This question is commonly encountered in programming competitions and assessments.
    - The problem statement should revolve around a concept or problem related to {topic}.
    - Provide a concise description of the problem or concept, ensuring clarity and accuracy.
    - Include examples or test cases to illustrate the problem statement effectively.
    - Ensure proper formatting and punctuation for clear presentation.

    Write a question that adheres to the provided instructions.
    """

    genai.configure(api_key="AI-------------------wlU")
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)

    return response.text.strip()

def generate_test_cases(question, num_test_cases=15):
    prompt = f"""
    **Question:** {question}

    Instructions:
    - Generate {num_test_cases} test cases where input and/or output are numerical values.
    - Each test case should include numerical input values and the expected numerical output.
    - Ensure that the test cases cover various scenarios related to the given question.
    - Use proper formatting and punctuation for readability.

    Example Test Cases:
    Input: [Specify numerical input values here]
    Output: [Specify expected numerical output here]

    Write {num_test_cases} test cases that thoroughly test the problem related to the given question.
    """

    genai.configure(api_key="AI-------------------wlU")
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)

    return response.text.strip()

def generate_multiple_dsa_questions(num_questions=5):
    questions = []
    for i in range(1, num_questions + 1):
        topic = random.choice(list(dsa_topics.keys()))
        question = generate_dsa_question(topic)
        test_cases = generate_test_cases(question)
        formatted_question = f"Question {i}:\nDSA Question: {question}\n(Topic: {topic})\n\nTest Cases:\n{test_cases}"
        questions.append(formatted_question)
    return questions

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_dsa_questions/<int:num_questions>', methods=['GET'])
def generate_dsa_questions(num_questions):
    generated_questions = generate_multiple_dsa_questions(num_questions)
    return jsonify({"questions": generated_questions})

if __name__ == "__main__":
    app.run(debug=True)
