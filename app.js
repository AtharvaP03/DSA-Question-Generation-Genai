const express = require('express');
const bodyParser = require('body-parser');
const random = require('random');
const { GenerativeModel, configure } = require('google-generativeai');

const app = express();
const port = process.env.PORT || 3000;

// Configure Generative AI model (replace with your actual API key)
configure({ api_key: "AI------------------------------------U" });

const dsaTopics = {
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
};

const generateDsaQuestion = async (topic, difficulty = "medium") => {
    const prompt = `
        **Topic:** ${topic}
        **Difficulty:** ${difficulty}

        **Instructions:**
        - This question is commonly encountered in programming competitions and assessments.
        - The problem statement should revolve around a concept or problem related to ${topic}.
        - Provide a concise description of the problem or concept, ensuring clarity and accuracy.
        - Include examples or test cases to illustrate the problem statement effectively.
        - Ensure proper formatting and punctuation for clear presentation.

        Write a question that adheres to the provided instructions.
    `;
    
    try {
        const model = new GenerativeModel('gemini-pro');
        const response = await model.generateContent(prompt);
        return response.text.trim();
    } catch (error) {
        return `Error generating DSA question: ${error.message}`;
    }
};

const generateTestCases = async (question, numTestCases = 10) => {
    const prompt = `
        **Question:** ${question}

        Instructions:
        - Generate ${numTestCases} test cases where input and/or output are numerical values.
        - Each test case should include numerical input values and the expected numerical output.
        - Ensure that the test cases cover various scenarios related to the given question.
        - Use proper formatting and punctuation for readability.

        Example Test Cases:
        Input: [Specify numerical input values here]
        Output: [Specify expected numerical output here]

        Write ${numTestCases} test cases that thoroughly test the problem related to the given question.
    `;

    try {
        const model = new GenerativeModel('gemini-pro');
        const response = await model.generateContent(prompt);
        const testCases = response.text.trim().split("\n\n");

        const parsedCases = [];
        for (const caseText of testCases) {
            const lines = caseText.split('\n');
            if (lines.length >= 2) {
                const inputVal = lines[0].split(": ")[1].trim();
                const outputVal = lines[1].split(": ")[1].trim();
                parsedCases.push({ input: inputVal, output: outputVal });
            }
        }
        return parsedCases;
    } catch (error) {
        return `Error generating test cases: ${error.message}`;
    }
};

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index2', { topics: Object.keys(dsaTopics) });
});

app.post('/generate_dsa_questions', async (req, res) => {
    const { numQuestions = 5, topics = Object.keys(dsaTopics), difficulty = 'medium' } = req.body;

    const generatedQuestions = [];
    for (let i = 0; i < numQuestions; i++) {
        const topic = random.choice(topics);
        const question = await generateDsaQuestion(topic, difficulty);
        const testCases = await generateTestCases(question);
        generatedQuestions.push({ topic, question, testCases });
    }

    res.json({ questions: generatedQuestions });
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
