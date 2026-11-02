from __future__ import annotations

import re
import sys
from pathlib import Path

from pptx import Presentation
from pptx.enum.text import PP_ALIGN
from pptx.util import Inches


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from pages import last_night_revision as revision  # noqa: E402
from scripts.build_last_night_revision_interactive_slides import (  # noqa: E402
    BLUE,
    DARK,
    GREEN,
    MUTED,
    PINK,
    PURPLE,
    RED,
    SOFT,
    WHITE,
    WIDE_H,
    WIDE_W,
    _add_box,
    _add_footer,
    _add_title,
    _background,
    _blank,
    _bullets,
    _button,
    _clean,
    _option_text,
    _set_text,
)


OUT_DIR = ROOT / "generated_outputs"
OUT_FILE = OUT_DIR / "Omar_Last_Night_Revision_English_Simple_Interactive.pptx"


SIMPLE_RULES = {
    "Subject-verb agreement": (
        "Find the real subject.",
        "Ask: is the subject one thing or many things?",
        "Ignore words between the subject and verb.",
    ),
    "Pronoun agreement": (
        "A pronoun replaces a noun.",
        "The pronoun must match the noun: singular with singular, plural with plural.",
        "If the pronoun could mean two people, the sentence is unclear.",
    ),
    "Pronoun clarity": (
        "A pronoun must point to one clear noun.",
        "If she, he, it, they, or this could refer to two things, rewrite the sentence.",
        "Do not guess who the pronoun means.",
    ),
    "Verb tense": (
        "Use time words to choose the verb tense.",
        "If one past action happened before another past action, use had + verb.",
        "Look for words like before, after, by the time, tomorrow, and yesterday.",
    ),
    "Comma splice": (
        "Two complete sentences cannot be joined by only a comma.",
        "Use a period, semicolon, or comma plus a joining word.",
        "If both sides can stand alone, a comma alone is wrong.",
    ),
    "Colon": (
        "A colon introduces a list or explanation.",
        "The words before the colon should be a complete sentence.",
        "Do not use a colon after an incomplete phrase.",
    ),
    "Semicolon": (
        "A semicolon joins two complete related sentences.",
        "Check that both sides can stand alone.",
        "Do not use a semicolon between a subject and verb.",
    ),
    "Parallelism": (
        "Parallel means matching grammar.",
        "Items in a list should have the same form.",
        "Match -ing with -ing, noun with noun, and verb with verb.",
    ),
    "Modifier": (
        "A modifier describes the noun next to it.",
        "After an opening phrase, the next noun should be the person or thing doing the action.",
        "Do not let an object do a human action.",
    ),
    "Transition": (
        "A transition shows the relationship between ideas.",
        "Ask: is it contrast, result, example, or same idea?",
        "Choose by logic, not by how fancy the word sounds.",
    ),
    "Conciseness": (
        "Good EST English is clear and short.",
        "If two answers mean the same thing, choose the shorter correct one.",
        "Remove repeated or wordy phrases.",
    ),
    "Possession": (
        "Possession means ownership.",
        "One owner usually uses 's. Many owners usually use s'.",
        "First decide if the owner is singular or plural.",
    ),
    "Relative clauses": (
        "A relative clause gives extra information.",
        "Use which for extra information about a thing after a comma.",
        "Use who for people.",
    ),
    "Main idea": (
        "The main idea is the whole point.",
        "Choose the answer that covers the entire passage, not one small detail.",
        "Avoid extreme answers like always, never, every, and only.",
    ),
    "Inference": (
        "An inference is a safe conclusion from the text.",
        "The answer must be supported by the passage.",
        "Do not add your own outside ideas.",
    ),
    "Evidence": (
        "Evidence proves a claim.",
        "Choose the answer that directly supports the statement.",
        "A feeling or opinion is not strong evidence.",
    ),
    "Vocabulary in context": (
        "Vocabulary in context means the word's meaning in this sentence.",
        "Replace the word with each answer and read the sentence again.",
        "Do not choose a meaning that does not fit the sentence.",
    ),
    "Tone": (
        "Tone is the writer's attitude.",
        "Look at the writer's word choice.",
        "Do not make the tone stronger than the text supports.",
    ),
    "Function": (
        "Function means what a sentence does.",
        "Ask: does it explain, give an example, contrast, or conclude?",
        "Do not answer only what the sentence says.",
    ),
    "Articles": (
        "Articles are a, an, and the.",
        "Use an before vowel sounds.",
        "Sound matters more than spelling.",
    ),
    "Prepositions": (
        "Some words use fixed prepositions.",
        "Learn common pairs like interested in, depend on, good at.",
        "Do not translate directly from Arabic.",
    ),
    "Comparison": (
        "Use comparative words for two things.",
        "Use faster, better, more useful, or less clear.",
        "Do not use more + an -er word together.",
    ),
    "Conditionals": (
        "A conditional has an if part and a result part.",
        "For real future results: if + present, will + base verb.",
        "Do not put will directly after if.",
    ),
    "Reported speech": (
        "Reported speech tells what someone said or asked.",
        "Use statement word order after question words.",
        "Do not use question order inside the report.",
    ),
    "Redundancy": (
        "Redundancy means saying the same idea twice.",
        "Keep one clear word and remove the repeated idea.",
        "Unexpected surprise is redundant because a surprise is already unexpected.",
    ),
    "Sentence fragment": (
        "A fragment is not a complete sentence.",
        "A sentence needs a complete thought.",
        "A because-clause alone is usually incomplete.",
    ),
    "Logical conclusion": (
        "A logical question asks what follows from the facts.",
        "Use only the information given.",
        "In experiments, the independent variable is what was changed on purpose.",
    ),
}


def simple_rule(question):
    skill = _clean(question.get("skill"))
    if not skill:
        skill = infer_skill(question)
    return SIMPLE_RULES.get(
        skill,
        (
            "Read the sentence slowly.",
            "Find the rule being tested before checking the choices.",
            "Choose the answer that is clear, correct, and supported.",
        ),
    )


def infer_skill(question):
    text = f"{question.get('question', '')} {question.get('explanation', '')}".lower()
    checks = [
        ("neither", "Subject-verb agreement"),
        ("subject is", "Subject-verb agreement"),
        ("singular", "Subject-verb agreement"),
        ("plural", "Subject-verb agreement"),
        ("pronoun", "Pronoun clarity"),
        ("she", "Pronoun clarity"),
        ("he", "Pronoun clarity"),
        ("they", "Pronoun clarity"),
        ("tense", "Verb tense"),
        ("past perfect", "Verb tense"),
        ("tomorrow", "Verb tense"),
        ("by the time", "Verb tense"),
        ("comma", "Comma splice"),
        ("semicolon", "Semicolon"),
        ("colon", "Colon"),
        ("parallel", "Parallelism"),
        ("modifier", "Modifier"),
        ("walking", "Modifier"),
        ("transition", "Transition"),
        ("however", "Transition"),
        ("therefore", "Transition"),
        ("consequently", "Transition"),
        ("concise", "Conciseness"),
        ("wordy", "Conciseness"),
        ("apostrophe", "Possession"),
        ("belong", "Possession"),
        ("which", "Relative clauses"),
        ("who", "Relative clauses"),
        ("main idea", "Main idea"),
        ("inference", "Inference"),
        ("evidence", "Evidence"),
        ("vocabulary", "Vocabulary in context"),
        ("tone", "Tone"),
        ("function", "Function"),
        ("article", "Articles"),
        ("umbrella", "Articles"),
        ("preposition", "Prepositions"),
        ("interested", "Prepositions"),
        ("than", "Comparison"),
        ("faster", "Comparison"),
        ("conditional", "Conditionals"),
        ("if ", "Conditionals"),
        ("reported", "Reported speech"),
        ("asked where", "Reported speech"),
        ("redundant", "Redundancy"),
        ("fragment", "Sentence fragment"),
        ("independent variable", "Logical conclusion"),
    ]
    for needle, label in checks:
        if needle in text:
            return label
    return "English rule"


def clean_explanation(text):
    text = _clean(text)
    text = text.replace("Watch-out:", "Trap:")
    text = re.sub(r"[“”]", '"', text)
    text = re.sub(r"\s+", " ", text)
    return text


def answer_parts(q):
    correct = _clean(q.get("correct_answer"))
    options = {letter: _option_text(q, letter) for letter in "ABCD"}
    explanation = clean_explanation(q.get("explanation"))
    rule, move, trap = simple_rule(q)
    return correct, options, explanation, rule, trap


def title_slide(prs):
    slide = _blank(prs)
    _background(slide)
    title = slide.shapes.add_textbox(Inches(0.75), Inches(1.15), Inches(11.9), Inches(1.0))
    _set_text(title, "English Last Night Revision", size=42, bold=True, color=DARK, align=PP_ALIGN.CENTER)
    sub = slide.shapes.add_textbox(Inches(1.3), Inches(2.35), Inches(10.7), Inches(0.7))
    _set_text(
        sub,
        "Simple interactive English rescue deck: learn the rule first, then answer.",
        size=22,
        color=MUTED,
        align=PP_ALIGN.CENTER,
    )
    _button(slide, 5.15, 4.75, 3.0, 0.65, "Start English", fill=PURPLE)
    _add_footer(slide, "English Simple Last Night Revision")
    return slide


def overview_slide(prs, count):
    slide = _blank(prs)
    _background(slide)
    _add_title(slide, "How to Use This", "This version is shorter and easier to follow.")
    _bullets(
        slide,
        1.05,
        1.55,
        11.15,
        4.4,
        [
            "First: read the simple rule.",
            "Second: answer the question.",
            "Third: check the correct answer and explanation.",
            "Fourth: memorize the trap so it does not happen again.",
            f"This deck includes {count} English questions from the app data.",
        ],
        size=25,
    )
    _button(slide, 5.15, 6.35, 3.0, 0.55, "Begin Rules", fill=PINK)
    _add_footer(slide, "English Simple Last Night Revision")
    return slide


def concept_slide(prs, q, step, total):
    slide = _blank(prs)
    _background(slide)
    rule, move, trap = simple_rule(q)
    skill = _clean(q.get("skill")) or infer_skill(q)
    _add_title(slide, f"Simple Rule: {skill}", f"{q.get('question_id')} | Step {step} of {total}")
    r = _add_box(slide, 0.8, 1.55, 11.7, 1.15, "", fill=BLUE)
    _set_text(r, f"1. What to know: {rule}", size=24, bold=True, color=PURPLE, align=PP_ALIGN.CENTER)
    m = _add_box(slide, 0.8, 3.0, 11.7, 1.15, "", fill=WHITE)
    _set_text(m, f"2. What to do: {move}", size=24, bold=True, color=DARK, align=PP_ALIGN.CENTER)
    t = _add_box(slide, 0.8, 4.45, 11.7, 1.15, "", fill=WHITE)
    _set_text(t, f"3. Trap: {trap}", size=24, bold=True, color=RED, align=PP_ALIGN.CENTER)
    start = _button(slide, 5.15, 6.25, 3.0, 0.55, "Try Question", fill=PURPLE)
    _add_footer(slide, "English Simple Last Night Revision")
    return slide, start


def question_slide(prs, q):
    slide = _blank(prs)
    _background(slide)
    _add_title(slide, f"Question {q.get('question_id')}", "Choose the best answer. Click any choice to see the explanation.")
    qbox = _add_box(slide, 0.8, 1.35, 11.7, 1.55, "", fill=WHITE)
    _set_text(qbox, _clean(q.get("question")), size=25, bold=True, color=DARK, align=PP_ALIGN.CENTER)
    buttons = []
    for letter, (x, y) in zip("ABCD", [(0.95, 3.25), (6.85, 3.25), (0.95, 4.65), (6.85, 4.65)]):
        btn = _add_box(slide, x, y, 5.5, 0.95, "", fill=WHITE)
        _set_text(btn, f"{letter}. {_option_text(q, letter)}", size=19, bold=True, color=DARK, align=PP_ALIGN.CENTER)
        buttons.append(btn)
    reveal = _button(slide, 5.15, 6.25, 3.0, 0.55, "Show Answer", fill=PINK)
    _add_footer(slide, "English Simple Last Night Revision")
    return slide, buttons, reveal


def answer_slide(prs, q):
    slide = _blank(prs)
    _background(slide)
    correct, options, explanation, rule, trap = answer_parts(q)
    _add_title(slide, f"Answer {q.get('question_id')}", "Read this before moving to the next rule.")
    top = _add_box(slide, 0.8, 1.25, 11.7, 0.85, "", fill=BLUE)
    _set_text(top, f"Correct: {correct}. {options.get(correct, '')}", size=27, bold=True, color=GREEN, align=PP_ALIGN.CENTER)
    exp = _add_box(slide, 0.8, 2.4, 7.5, 3.25, "", fill=WHITE)
    _set_text(exp, f"Simple explanation:\n\n{explanation}", size=19, color=DARK, align=PP_ALIGN.CENTER)
    side = _add_box(slide, 8.65, 2.4, 3.85, 3.25, "", fill=WHITE)
    _set_text(side, f"Remember:\n{rule}\n\nTrap:\n{trap}", size=18, bold=True, color=PURPLE, align=PP_ALIGN.CENTER)
    next_btn = _button(slide, 9.15, 6.25, 3.0, 0.55, "Next Rule", fill=PURPLE)
    _add_footer(slide, "English Simple Last Night Revision")
    return slide, next_btn


def final_slide(prs):
    slide = _blank(prs)
    _background(slide)
    _add_title(slide, "Final English Rescue Checklist", "Use this before the exam.")
    _bullets(
        slide,
        1.0,
        1.55,
        11.2,
        4.7,
        [
            "Find the subject and verb first.",
            "Check pronouns: clear noun, correct singular/plural.",
            "Check punctuation: comma, semicolon, colon.",
            "Check transitions by logic: contrast, result, example, same idea.",
            "For reading, choose only what the passage supports.",
            "If stuck, eliminate wrong choices and guess. Do not leave blanks.",
        ],
        size=25,
    )
    _add_footer(slide, "English Simple Last Night Revision")
    return slide


def english_questions():
    pack = revision.load_revision_pack()
    docx = [dict(q, source="Original DOCX English Pack") for q in pack["english_questions"]]
    rescue = [dict(q, source="Original EST-style English Rescue") for q in revision.ENGLISH_RESCUE_QUESTIONS]
    return docx + rescue


def build():
    OUT_DIR.mkdir(exist_ok=True)
    prs = Presentation()
    prs.slide_width = WIDE_W
    prs.slide_height = WIDE_H
    if len(prs.slides):
        prs.slides._sldIdLst.remove(prs.slides._sldIdLst[0])

    questions = english_questions()
    title = title_slide(prs)
    overview = overview_slide(prs, len(questions))
    title.shapes[-2].click_action.target_slide = overview
    previous_next = None
    first_concept = None

    for i, question in enumerate(questions, start=1):
        c_slide, start = concept_slide(prs, question, i, len(questions))
        q_slide, choices, reveal = question_slide(prs, question)
        a_slide, next_btn = answer_slide(prs, question)
        if first_concept is None:
            first_concept = c_slide
        if previous_next is not None:
            previous_next.click_action.target_slide = c_slide
        start.click_action.target_slide = q_slide
        reveal.click_action.target_slide = a_slide
        for choice in choices:
            choice.click_action.target_slide = a_slide
        previous_next = next_btn

    final = final_slide(prs)
    if previous_next is not None:
        previous_next.click_action.target_slide = final
    overview.shapes[-2].click_action.target_slide = first_concept

    prs.save(OUT_FILE)
    return OUT_FILE, len(prs.slides), len(questions)


if __name__ == "__main__":
    path, slides, questions = build()
    print(path)
    print(f"slides={slides}")
    print(f"questions={questions}")
