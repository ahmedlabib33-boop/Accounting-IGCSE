from __future__ import annotations

import re
import sys
from pathlib import Path

from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import PP_ALIGN, MSO_AUTO_SIZE
from pptx.util import Inches, Pt


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from pages import last_night_revision as revision  # noqa: E402


OUT_DIR = ROOT / "generated_outputs"
OUT_FILE = OUT_DIR / "Omar_Last_Night_Revision_Interactive_Concepts_Questions.pptx"

WIDE_W = Inches(13.333)
WIDE_H = Inches(7.5)

PINK = RGBColor(230, 90, 170)
PURPLE = RGBColor(125, 74, 235)
DARK = RGBColor(44, 37, 58)
MUTED = RGBColor(100, 88, 115)
BLUE = RGBColor(224, 239, 255)
WHITE = RGBColor(255, 255, 255)
SOFT = RGBColor(255, 245, 251)
GREEN = RGBColor(15, 145, 90)
RED = RGBColor(205, 55, 88)
GOLD = RGBColor(178, 125, 31)


CONCEPT_BANK = {
    "linear": (
        "Linear equations are solved by keeping both sides balanced.",
        "Distribute, combine like terms, move variables to one side, then undo the last operation.",
        "Always substitute the answer back into the original equation.",
    ),
    "system": (
        "A system asks for values that make two equations true at the same time.",
        "Use elimination when terms cancel quickly, or substitution when one variable is already isolated.",
        "Check the requested variable; many traps ask for x but you solve y, or the reverse.",
    ),
    "slope": (
        "Slope measures how fast y changes compared with x.",
        "Use (change in y) / (change in x), keeping coordinate order consistent.",
        "Do not flip the fraction or subtract x and y in different directions.",
    ),
    "percent": (
        "Percent change compares the amount changed to the original value.",
        "Use (new - original) / original, then convert to a percent.",
        "The denominator is the original value, not the new value.",
    ),
    "ratio": (
        "A ratio divides a total into parts.",
        "Add the ratio parts first, find one part, then multiply by the requested part count.",
        "Do not treat one ratio number as the whole total.",
    ),
    "function": (
        "A function rule tells you what output comes from each input.",
        "Replace x with the given value using parentheses, then follow order of operations.",
        "For composition, work from the inside function outward.",
    ),
    "quadratic": (
        "Quadratic questions often use factoring, roots, or the discriminant.",
        "For factoring, find two numbers that multiply to c and add to b. For roots, test both signs when squaring.",
        "Do not forget negative roots or force factoring when the discriminant is negative.",
    ),
    "exponent": (
        "Exponent rules depend on the operation and whether bases match.",
        "Same base multiplication adds powers; division subtracts powers; powers of powers multiply.",
        "Never add or subtract exponents unless the base rule allows it.",
    ),
    "data": (
        "Statistics questions are usually about mean, median, probability, or interpreting a value.",
        "Identify the exact measure requested, then use the definition directly.",
        "Sort data before median, and use favorable outcomes over total for probability.",
    ),
    "geometry": (
        "Geometry questions are formula recognition plus correct dimensions.",
        "Name the shape, write the formula, identify each dimension, then substitute carefully.",
        "Do not confuse perimeter, area, and volume.",
    ),
    "triangle": (
        "Right-triangle questions are usually Pythagorean theorem or trig ratios.",
        "Use a squared plus b squared equals c squared for side lengths. Use SOH-CAH-TOA for trig.",
        "The hypotenuse is always the longest side and is opposite the right angle.",
    ),
    "inequality": (
        "Inequalities solve like equations, with one special rule.",
        "If you multiply or divide by a negative number, reverse the inequality sign.",
        "This sign flip is the main trap.",
    ),
    "absolute": (
        "Absolute value means distance from zero, so two values can satisfy the same distance.",
        "Split |expression| = k into expression = k and expression = -k.",
        "Use both cases unless the problem makes one impossible.",
    ),
    "subject-verb": (
        "Subject-verb agreement depends on the true subject, not nearby words.",
        "Remove prepositional phrases and match the verb to the real subject.",
        "With neither/nor or either/or, the nearer subject often controls the verb.",
    ),
    "pronoun": (
        "A pronoun must match and clearly refer to one noun.",
        "Check whether the noun is singular or plural, then check whether more than one noun could be the reference.",
        "If two nouns could fit, the pronoun is unclear.",
    ),
    "tense": (
        "Verb tense is controlled by time clues and action order.",
        "Use past perfect for the earlier of two past actions, and future forms for future clues.",
        "Do not ignore words such as by the time, tomorrow, before, or after.",
    ),
    "punctuation": (
        "Punctuation is about sentence boundaries and logic.",
        "A semicolon joins two complete sentences. A colon introduces a list or explanation after a complete thought.",
        "A comma alone cannot join two independent clauses.",
    ),
    "parallel": (
        "Parallelism means items in a list must use the same grammar pattern.",
        "Compare each listed item and make the forms match.",
        "Do not mix reviewing, to check, and rests in the same list.",
    ),
    "modifier": (
        "A modifier must sit next to the word it describes.",
        "After an opening modifier, the next noun should be the doer of that action.",
        "Do not attach human actions to objects.",
    ),
    "transition": (
        "Transition questions test logic between ideas.",
        "Decide whether the relationship is contrast, cause-result, example, continuation, or conclusion.",
        "Do not choose a transition because it sounds formal.",
    ),
    "reading": (
        "Reading answers must be supported by the passage.",
        "Find the exact line or idea that proves the answer. Reject extreme or outside-knowledge choices.",
        "A correct answer is usually precise, not dramatic.",
    ),
    "vocabulary": (
        "Vocabulary-in-context asks what the word means in that sentence.",
        "Substitute each choice into the sentence and keep the one that preserves the meaning.",
        "Do not choose a familiar meaning if it does not fit the context.",
    ),
    "grammar": (
        "Grammar questions reward the simplest correct sentence.",
        "Find the tested rule first, then choose the answer that is grammatical, clear, and concise.",
        "Do not keep wordy or ambiguous phrasing.",
    ),
}


def _set_text(box, text, size=22, bold=False, color=DARK, align=None):
    tf = box.text_frame
    tf.clear()
    tf.word_wrap = True
    tf.auto_size = MSO_AUTO_SIZE.TEXT_TO_FIT_SHAPE
    p = tf.paragraphs[0]
    if align is not None:
        p.alignment = align
    run = p.add_run()
    run.text = str(text)
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color
    run.font.name = "Aptos"


def _add_box(slide, x, y, w, h, text="", fill=WHITE, line=RGBColor(244, 205, 224), radius=True):
    shape_type = MSO_SHAPE.ROUNDED_RECTANGLE if radius else MSO_SHAPE.RECTANGLE
    box = slide.shapes.add_shape(shape_type, Inches(x), Inches(y), Inches(w), Inches(h))
    box.fill.solid()
    box.fill.fore_color.rgb = fill
    box.line.color.rgb = line
    box.line.width = Pt(1.2)
    if text:
        _set_text(box, text)
    return box


def _add_title(slide, title, subtitle=None):
    title_box = slide.shapes.add_textbox(Inches(0.55), Inches(0.28), Inches(12.2), Inches(0.58))
    _set_text(title_box, title, size=30, bold=True, color=DARK)
    if subtitle:
        sub = slide.shapes.add_textbox(Inches(0.58), Inches(0.88), Inches(11.9), Inches(0.38))
        _set_text(sub, subtitle, size=15, color=MUTED)


def _add_footer(slide, idx_text="Omar EST Last Night Revision"):
    footer = slide.shapes.add_textbox(Inches(0.55), Inches(7.12), Inches(12.2), Inches(0.25))
    _set_text(footer, idx_text, size=10, color=MUTED, align=PP_ALIGN.RIGHT)


def _button(slide, x, y, w, h, text, target=None, fill=PURPLE, font_color=WHITE):
    btn = _add_box(slide, x, y, w, h, "", fill=fill, line=fill)
    _set_text(btn, text, size=15, bold=True, color=font_color, align=PP_ALIGN.CENTER)
    if target is not None:
        btn.click_action.target_slide = target
    return btn


def _bullets(slide, x, y, w, h, items, size=17, color=DARK):
    box = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = box.text_frame
    tf.clear()
    tf.word_wrap = True
    tf.auto_size = MSO_AUTO_SIZE.TEXT_TO_FIT_SHAPE
    for i, item in enumerate(items):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = str(item)
        p.level = 0
        p.font.size = Pt(size)
        p.font.color.rgb = color
        p.font.name = "Aptos"
    return box


def _clean(text):
    return re.sub(r"\s+", " ", str(text or "")).strip()


def _option_text(q, letter):
    return _clean(q.get(f"option_{letter.lower()}", ""))


def _infer_key(q):
    hay = f"{q.get('skill','')} {q.get('question','')} {q.get('explanation','')}".lower()
    pairs = [
        ("subject-verb", "subject-verb"),
        ("neither", "subject-verb"),
        ("pronoun", "pronoun"),
        ("tense", "tense"),
        ("past perfect", "tense"),
        ("semicolon", "punctuation"),
        ("colon", "punctuation"),
        ("comma", "punctuation"),
        ("parallel", "parallel"),
        ("modifier", "modifier"),
        ("transition", "transition"),
        ("main idea", "reading"),
        ("inference", "reading"),
        ("evidence", "reading"),
        ("tone", "reading"),
        ("function", "reading"),
        ("vocabulary", "vocabulary"),
        ("linear", "linear"),
        ("solve", "linear"),
        ("system", "system"),
        ("slope", "slope"),
        ("percent", "percent"),
        ("ratio", "ratio"),
        ("function", "function"),
        ("quadratic", "quadratic"),
        ("factor", "quadratic"),
        ("x^2", "quadratic"),
        ("exponent", "exponent"),
        ("scientific notation", "exponent"),
        ("mean", "data"),
        ("median", "data"),
        ("probability", "data"),
        ("triangle", "triangle"),
        ("hypotenuse", "triangle"),
        ("sine", "triangle"),
        ("distance", "triangle"),
        ("area", "geometry"),
        ("perimeter", "geometry"),
        ("circle", "geometry"),
        ("circumference", "geometry"),
        ("volume", "geometry"),
        ("inequality", "inequality"),
        (">", "inequality"),
        ("absolute", "absolute"),
    ]
    for needle, key in pairs:
        if needle in hay:
            return key
    return "geometry" if q.get("subject") == "Math" else "grammar"


def _concept(q):
    key = _infer_key(q)
    rule, method, trap = CONCEPT_BANK[key]
    skill = _clean(q.get("skill")) or key.replace("-", " ").title()
    explanation = _clean(q.get("explanation"))
    memorize = _clean(q.get("memorize"))
    if memorize:
        rule = memorize
    elif explanation:
        first = explanation.split(". ")[0].strip()
        if 18 <= len(first) <= 150:
            method = first + "."
    watch = _clean(q.get("trap"))
    if not watch and "Watch-out:" in str(q.get("explanation", "")):
        watch = _clean(str(q.get("explanation", "")).split("Watch-out:", 1)[1])
    if watch:
        trap = watch
    return skill, rule, method, trap


def _answer_block(q):
    correct = _clean(q.get("correct_answer"))
    options = {letter: _option_text(q, letter) for letter in "ABCD"}
    explanation = _clean(q.get("explanation"))
    memorize = _clean(q.get("memorize"))
    trap = _clean(q.get("trap"))
    if not memorize:
        _, memorize, _, _ = _concept(q)
    if not trap and "Watch-out:" in str(q.get("explanation", "")):
        trap = _clean(str(q.get("explanation", "")).split("Watch-out:", 1)[1])
    return correct, options, explanation, memorize, trap


def _blank(prs):
    return prs.slides.add_slide(prs.slide_layouts[6])


def _background(slide):
    slide.background.fill.solid()
    slide.background.fill.fore_color.rgb = SOFT


def _title_slide(prs):
    slide = _blank(prs)
    _background(slide)
    title = slide.shapes.add_textbox(Inches(0.75), Inches(1.1), Inches(11.9), Inches(1.1))
    _set_text(title, "Last Night Revision", size=44, bold=True, color=DARK, align=PP_ALIGN.CENTER)
    sub = slide.shapes.add_textbox(Inches(1.1), Inches(2.28), Inches(11.1), Inches(0.7))
    _set_text(sub, "Interactive 6-Hour EST Rescue Deck: Concept First, Then Questions", size=22, color=MUTED, align=PP_ALIGN.CENTER)
    box = _add_box(slide, 2.05, 3.45, 9.25, 1.35, "Use in PRESENT mode. Read the concept, click Start Question, choose an answer, then reveal the explanation.", fill=BLUE)
    _set_text(box, "Use in PRESENT mode. Read the concept, click Start Question, choose an answer, then reveal the explanation.", size=21, bold=True, color=DARK, align=PP_ALIGN.CENTER)
    _add_footer(slide)
    return slide


def _overview_slide(prs, counts):
    slide = _blank(prs)
    _background(slide)
    _add_title(slide, "How This Interactive Deck Works", "The flow is built for fast rescue learning before the exam.")
    items = [
        "1. Read the concept slide first.",
        "2. Click Start Question.",
        "3. Choose A, B, C, or D.",
        "4. Reveal the correct answer and explanation.",
        "5. Move to the next concept.",
        f"Question coverage: {counts['total']} total MCQs, including Math and English DOCX pack plus rescue practice.",
    ]
    _bullets(slide, 0.9, 1.6, 7.3, 4.5, items, size=21)
    stat = _add_box(slide, 8.6, 1.55, 3.65, 4.15, "", fill=WHITE)
    _set_text(stat, f"{counts['math']} Math\n{counts['english']} English\n{counts['total']} Total\n\nEvery question includes choices, correct answer, explanation, memory rule, and trap warning.", size=23, bold=True, color=PURPLE, align=PP_ALIGN.CENTER)
    _add_footer(slide)
    return slide


def _plan_slide(prs):
    slide = _blank(prs)
    _background(slide)
    _add_title(slide, "6-Hour Emergency Plan", "Use this as the order of study if time is very short.")
    y = 1.35
    for item in revision.SIX_HOUR_PLAN:
        box = _add_box(slide, 0.75, y, 11.85, 0.72, "", fill=WHITE)
        _set_text(box, f"{item['hour']}: {item['title']} | {item['mission']} | {item['actions']}", size=15, color=DARK)
        y += 0.84
    _add_footer(slide)
    return slide


def _section_slide(prs, title, subtitle):
    slide = _blank(prs)
    _background(slide)
    t = slide.shapes.add_textbox(Inches(0.8), Inches(2.25), Inches(11.7), Inches(0.85))
    _set_text(t, title, size=38, bold=True, color=DARK, align=PP_ALIGN.CENTER)
    s = slide.shapes.add_textbox(Inches(1.35), Inches(3.2), Inches(10.6), Inches(0.55))
    _set_text(s, subtitle, size=21, color=MUTED, align=PP_ALIGN.CENTER)
    _add_footer(slide)
    return slide


def _concept_slide(prs, q, index, total):
    slide = _blank(prs)
    _background(slide)
    skill, rule, method, trap = _concept(q)
    _add_title(slide, f"Concept First: {skill}", f"{q.get('subject', '')} | {q.get('question_id', '')} | Step {index} of {total}")
    _add_box(slide, 0.75, 1.35, 3.7, 4.55, "Rule", fill=BLUE)
    _add_box(slide, 4.8, 1.35, 3.7, 4.55, "Exam Move", fill=WHITE)
    _add_box(slide, 8.85, 1.35, 3.7, 4.55, "Avoid This Trap", fill=WHITE)
    boxes = [
        (0.95, 2.05, 3.25, 2.9, rule, PURPLE),
        (5.0, 2.05, 3.25, 2.9, method, DARK),
        (9.05, 2.05, 3.25, 2.9, trap, RED),
    ]
    for x, y, w, h, text, color in boxes:
        tb = slide.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
        _set_text(tb, text, size=19, bold=True, color=color, align=PP_ALIGN.CENTER)
    start = _button(slide, 5.0, 6.15, 3.35, 0.58, "Start Question")
    _add_footer(slide)
    return slide, start


def _question_slide(prs, q, deck_name):
    slide = _blank(prs)
    _background(slide)
    _add_title(slide, f"{deck_name}: Question {q.get('question_id', '')}", "Choose an answer. In presentation mode, click any choice to reveal the explanation.")
    qbox = _add_box(slide, 0.85, 1.35, 11.65, 1.28, "", fill=WHITE)
    _set_text(qbox, _clean(q.get("question")), size=23, bold=True, color=DARK, align=PP_ALIGN.CENTER)
    choice_buttons = []
    coords = [(0.95, 3.05), (6.85, 3.05), (0.95, 4.45), (6.85, 4.45)]
    for letter, (x, y) in zip("ABCD", coords):
        opt = _option_text(q, letter)
        btn = _add_box(slide, x, y, 5.5, 0.95, "", fill=WHITE, line=RGBColor(225, 190, 214))
        _set_text(btn, f"{letter}. {opt}", size=18, bold=True, color=DARK, align=PP_ALIGN.CENTER)
        choice_buttons.append(btn)
    reveal = _button(slide, 5.0, 6.18, 3.35, 0.55, "Reveal Answer", fill=PINK)
    _add_footer(slide)
    return slide, choice_buttons, reveal


def _answer_slide(prs, q, deck_name):
    slide = _blank(prs)
    _background(slide)
    correct, options, explanation, memorize, trap = _answer_block(q)
    _add_title(slide, f"{deck_name}: Answer {q.get('question_id', '')}", "Check the reasoning before moving to the next concept.")
    ans = _add_box(slide, 0.75, 1.25, 12.0, 0.85, "", fill=BLUE)
    _set_text(ans, f"Correct answer: {correct}. {options.get(correct, '')}", size=25, bold=True, color=GREEN, align=PP_ALIGN.CENTER)
    exp = _add_box(slide, 0.75, 2.32, 7.75, 3.55, "", fill=WHITE)
    _set_text(exp, f"Explanation\n\n{explanation}", size=18, color=DARK)
    mem = _add_box(slide, 8.75, 2.32, 4.0, 1.55, "", fill=WHITE)
    _set_text(mem, f"What to memorize\n\n{memorize}", size=16, bold=True, color=PURPLE)
    trap_box = _add_box(slide, 8.75, 4.18, 4.0, 1.69, "", fill=WHITE)
    _set_text(trap_box, f"How to avoid this trap\n\n{trap}", size=16, bold=True, color=RED)
    next_btn = _button(slide, 9.15, 6.18, 3.1, 0.55, "Next Concept", fill=PURPLE)
    _add_footer(slide)
    return slide, next_btn


def _final_slide(prs):
    slide = _blank(prs)
    _background(slide)
    _add_title(slide, "Final 10-Minute Checklist", "Stop learning new chapters. Protect easy points.")
    items = [
        "Never leave blanks: no penalty for wrong answers.",
        "Math: write the formula/equation before using the calculator.",
        "English: check subject, verb, pronoun, punctuation, and transition logic.",
        "Reading: every answer must be supported by the passage.",
        "If stuck after 45-60 seconds, choose the best remaining option and move.",
        "Sleep, ID, calculator, pencils, and calm timing matter.",
    ]
    _bullets(slide, 1.05, 1.55, 11.2, 4.55, items, size=24)
    _add_footer(slide)
    return slide


def _question_sets():
    pack = revision.load_revision_pack()
    math_docx = [dict(q, source="Original DOCX Math Pack") for q in pack["math_questions"]]
    english_docx = [dict(q, source="Original DOCX English Pack") for q in pack["english_questions"]]
    math_rescue = [dict(q, source="Original EST-style Math Rescue") for q in revision.MATH_RESCUE_QUESTIONS]
    english_rescue = [dict(q, source="Original EST-style English Rescue") for q in revision.ENGLISH_RESCUE_QUESTIONS]
    return [
        ("Original DOCX Math Pack", "Math questions from the Last Night Revision Word pack.", math_docx),
        ("Original DOCX English Pack", "English questions from the Last Night Revision Word pack.", english_docx),
        ("Original EST-style Math Rescue", "Extra app rescue math practice.", math_rescue),
        ("Original EST-style English Rescue", "Extra app rescue English practice.", english_rescue),
    ]


def build():
    OUT_DIR.mkdir(exist_ok=True)
    prs = Presentation()
    prs.slide_width = WIDE_W
    prs.slide_height = WIDE_H
    if len(prs.slides):
        prs.slides._sldIdLst.remove(prs.slides._sldIdLst[0])

    sets = _question_sets()
    total = sum(len(items) for _, _, items in sets)
    math = sum(1 for _, _, items in sets for q in items if q.get("subject") == "Math")
    english = total - math

    title = _title_slide(prs)
    overview = _overview_slide(prs, {"total": total, "math": math, "english": english})
    plan = _plan_slide(prs)
    previous_answer_next = None

    first_question_slide = None
    sequence_count = 0
    for section_title, section_subtitle, questions in sets:
        section = _section_slide(prs, section_title, section_subtitle)
        if previous_answer_next is not None:
            previous_answer_next.click_action.target_slide = section
        for q in questions:
            sequence_count += 1
            concept_slide, start_btn = _concept_slide(prs, q, sequence_count, total)
            question_slide, choice_buttons, reveal_btn = _question_slide(prs, q, section_title)
            answer_slide, next_btn = _answer_slide(prs, q, section_title)
            if first_question_slide is None:
                first_question_slide = concept_slide
            start_btn.click_action.target_slide = question_slide
            reveal_btn.click_action.target_slide = answer_slide
            for btn in choice_buttons:
                btn.click_action.target_slide = answer_slide
            previous_answer_next = next_btn

    final = _final_slide(prs)
    if previous_answer_next is not None:
        previous_answer_next.click_action.target_slide = final
    _button(title, 5.1, 5.35, 3.1, 0.62, "Start Deck", target=overview, fill=PURPLE)
    _button(overview, 5.1, 6.1, 3.1, 0.58, "Open Plan", target=plan, fill=PURPLE)
    _button(plan, 5.1, 6.28, 3.1, 0.58, "Start Concepts", target=first_question_slide, fill=PURPLE)

    prs.save(OUT_FILE)
    return OUT_FILE, len(prs.slides), total


if __name__ == "__main__":
    path, slide_count, question_count = build()
    print(path)
    print(f"slides={slide_count}")
    print(f"questions={question_count}")
