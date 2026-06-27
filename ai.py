import json
from google import genai
from resources.database import SessionLocal, Base
from resources import database
from config import api

db = SessionLocal()


def format_answers(answers: dict) -> str:
    result = ""
    for question, answer in answers.items():
        result += f"{question}: {answer}\n"
    return result


def parse_ai_summary_response(response_text: str) -> dict:
    if not response_text:
        raise ValueError("empty ai response")

    cleaned = response_text.strip()
    if cleaned.startswith("```json"):
        cleaned = cleaned[len("```json"):].strip()
    if cleaned.startswith("```"):
        cleaned = cleaned[len("```"):].strip()
    if cleaned.endswith("```"):
        cleaned = cleaned[:-3].rstrip()

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        start = cleaned.find("{")
        end = cleaned.rfind("}")
        if start != -1 and end != -1 and end > start:
            return json.loads(cleaned[start:end + 1])
        raise


def get_summary(content: dict):
    with open("resources/prompt_template.txt", "r", encoding="utf-8") as r:
        prompt_template = r.read()
        prompt = prompt_template.replace(
            "{content}",
            json.dumps(content, indent=2)
        )

    client = genai.Client(api_key=api)
    response = client.models.generate_content(
        model="gemma-4-31b-it",
        contents=prompt
    )
    return parse_ai_summary_response(response.text)

