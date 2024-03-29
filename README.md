
# DSA Question Generator

## Overview
This Flask application generates Data Structures and Algorithms (DSA) questions along with corresponding test cases. It utilizes Google's Generative AI to create questions and test cases based on predefined topics related to DSA.

## Features
- Generates DSA questions from predefined topics including Arrays, Linked Lists, Stacks and Queues, and Trees.
- Automatically generates test cases for each generated question.
- Provides a RESTful API endpoint to generate a specified number of DSA questions.

## Installation
1. Clone the repository:
    ```bash
    git clone <repository_url>
    cd dsa-question-generator
    ```

2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Configure Google Generative AI:
    - Obtain an API key from Google's Generative AI.
   

4. Run the application:
    ```bash
    python Gen1.py
    ```

## Usage
- Access the web interface by navigating to `http://localhost:5000/` in your browser.
- To generate DSA questions programmatically, use the API endpoint:
    - `GET /generate_dsa_questions/<num_questions>`: Generates `<num_questions>` DSA questions and returns them as JSON.

## Dependencies
- Flask: Web application framework for Python.
- Google Generative AI: API for generating natural language content using AI models.

