"""OMAR SAT360 | SAT Learning & Exam Intelligence.

The app is deliberately self-contained so the current Streamlit package runs
without the missing legacy ``pages`` package.  It keeps the product surfaces
available from one clear navigation rail and uses only the dependencies already
listed in requirements.txt.
"""

from __future__ import annotations

import html
from pathlib import Path

import pandas as pd
import streamlit as st
import streamlit.components.v1 as components


st.set_page_config(
    page_title="OMAR SAT360 | SAT Learning & Exam Intelligence",
    page_icon="◈",
    layout="wide",
    initial_sidebar_state="expanded",
)


APP_ROOT = Path(__file__).resolve().parent
DATA_DIR = APP_ROOT / "data"

ROUTES = [
    ("Home", "⌂", "Home"),
    ("Learning", "▱", "Learning"),
    ("AI Coach", "◌", "AI Coach"),
    ("Visual Pad", "✎", "Visual Pad"),
    ("Exam Arena", "◎", "Exam Arena"),
    ("Live Studio", "◉", "Live Studio"),
    ("Focus Music", "◒", "Focus Music"),
    ("Review Vault", "▣", "Review Vault"),
    ("Progress", "⌁", "Progress"),
]


def init_state() -> None:
    defaults = {
        "atelier_route": "Home",
        "atelier_score": 1420,
        "atelier_reviewed": 486,
        "atelier_exam_started": False,
        "atelier_exam_answer": None,
        "atelier_exam_feedback": "",
        "atelier_ai_reply": "",
        "atelier_notes": "",
    }
    for key, value in defaults.items():
        st.session_state.setdefault(key, value)


def go_to(route: str) -> None:
    st.session_state.atelier_route = route
    st.rerun()


def inject_theme() -> None:
    st.markdown(
        """
        <style>
        :root {
            --ink: #0b0d10;
            --panel: #12161b;
            --panel-2: #171b20;
            --line: #2b3038;
            --paper: #f1eee7;
            --muted: #a7a7a6;
            --red: #ef4336;
            --blue: #4d8cff;
        }
        .stApp, [data-testid="stAppViewContainer"] { background: var(--ink); color: var(--paper); }
        [data-testid="stHeader"], [data-testid="stToolbar"], #MainMenu, footer { display: none; }
        [data-testid="stSidebar"] { min-width: 280px !important; max-width: 280px !important; }
        [data-testid="stSidebar"] > div:first-child {
            width: 280px !important; background: #0a0c0f; border-right: 1px solid var(--line);
        }
        [data-testid="stSidebar"] [data-testid="stVerticalBlock"] { gap: 0.35rem; }
        [data-testid="stSidebar"] .block-container { padding: 1.4rem 0.8rem 1.2rem !important; }
        .block-container { max-width: 1600px; padding: 1.3rem 1.65rem 2.5rem; }
        h1, h2, h3, p, label, span, div { color: var(--paper); }
        [data-testid="stSidebar"] .stButton > button {
            width: 100%; min-height: 54px; text-align: left; color: #d9d8d4; background: transparent;
            border: 1px solid transparent; border-radius: 12px; font-size: 16px; font-weight: 500;
            padding-left: 0.9rem;
        }
        [data-testid="stSidebar"] .stButton > button:hover {
            color: #fff; border-color: #343941; background: #15191e;
        }
        .stButton > button {
            background: #1a1e24; border: 1px solid #353a43; color: var(--paper); border-radius: 10px;
            min-height: 43px; font-weight: 650;
        }
        .stButton > button:hover { border-color: var(--blue); color: #fff; background: #202833; }
        .stTextInput input, .stTextArea textarea, .stSelectbox div[data-baseweb="select"] > div {
            background: #11151a !important; color: var(--paper) !important; border-color: #363b43 !important;
            border-radius: 10px !important;
        }
        .stTextInput input::placeholder, .stTextArea textarea::placeholder { color: #858a92; }
        .stSelectbox svg { fill: #eae8e3; }
        div[data-testid="stMetric"] { background: var(--panel); border: 1px solid var(--line); border-radius: 14px; padding: 1rem; }
        [data-testid="stDataFrame"] { border: 1px solid var(--line); border-radius: 14px; overflow: hidden; }
        .atelier-brand { padding: 0.55rem 0.9rem 1.35rem; }
        .atelier-brand h1 { margin: 0; font-family: Georgia, 'Times New Roman', serif; font-size: 29px; letter-spacing: -1px; }
        .atelier-brand .rule { width: 34px; height: 2px; background: var(--red); margin-top: 15px; }
        .atelier-profile { position: fixed; left: 0.85rem; bottom: 1.1rem; width: 245px; display: flex; align-items: center;
            gap: 12px; color: #bbb9b5; font-size: 12px; padding: 12px; border-top: 1px solid var(--line); }
        .atelier-avatar { display: grid; place-items: center; width: 34px; height: 34px; border: 1px solid #565961; border-radius: 50%; color: var(--paper); font-size: 17px; }
        .topbar { display:flex; align-items:center; justify-content:space-between; gap:18px; margin: 0 0 1rem; }
        .streak { display:inline-flex; align-items:center; gap:8px; padding:9px 15px; border:1px solid #30343b; border-radius:999px; background:#0d1014; color:#e9e6df; font-size:14px; }
        .streak b { color: var(--red); }
        .filter-tabs { display:flex; align-items:center; border:1px solid #30343b; border-radius:999px; overflow:hidden; background:#0d1014; }
        .filter-tabs span { padding:8px 18px; color:#c5c3bd; font-size:13px; }
        .filter-tabs span:first-child { background:var(--red); color:#fff; border-radius:999px; }
        .hero { position:relative; min-height: 290px; border:1px solid #2a3038; border-radius:18px; overflow:hidden; background:#0e1115; }
        .hero-copy { position:relative; z-index:2; width: 55%; padding: 38px 36px; }
        .hero h2 { margin:0 0 6px; color:#f0ece5; font-family: Georgia, 'Times New Roman', serif; font-size: clamp(46px, 5vw, 78px); line-height:0.96; letter-spacing:-3px; }
        .hero p { margin:0; color:#d4d0c8; font-size:17px; }
        .goal-row { display:flex; gap:30px; align-items:center; margin-top:31px; color:#e4e0da; }
        .goal-ring { display:grid; place-items:center; width:64px; height:64px; border-radius:50%; background:conic-gradient(var(--red) 0 68%, #353941 68% 100%); position:relative; }
        .goal-ring::after { content:''; position:absolute; width:51px; height:51px; border-radius:50%; background:#0e1115; }
        .goal-ring span { z-index:1; font-weight:700; }
        .goal-row small { display:block; color:#a9a7a3; margin-bottom:4px; font-size:12px; }
        .goal-row b { font-size:16px; }
        .goal-row .red { color:var(--red); }
        .bridge { position:absolute; right:0; bottom:0; width:57%; height:100%; opacity:0.93; }
        .bridge .blueprint { opacity:0.38; stroke:#90a1b2; }
        .bridge .structure { stroke:#cac6bd; stroke-width:5; fill:none; }
        .bridge .cable { stroke:#9a9a95; stroke-width:2; }
        .bridge .accent { stroke:#ef4336; stroke-width:4; }
        .bridge-label { fill:#c4c1bb; font: 13px Arial, sans-serif; letter-spacing: 2px; }
        .module-card { min-height: 276px; padding: 1.25rem; border: 1px solid var(--line); border-radius: 16px; background: linear-gradient(145deg, #14181d, #101317); }
        .module-card.short { min-height: 190px; }
        .card-title { display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:0.55rem; }
        .card-title h3 { margin:0; font-size:20px; letter-spacing:-0.5px; }
        .card-icon { color:#e6e2db; margin-right:9px; }
        .chip { border:1px solid #365078; border-radius:7px; color:var(--blue); padding:3px 7px; font-size:11px; }
        .chip.red { color:#ff6d63; border-color:#68312d; }
        .card-sub { color:#aaa9a4; font-size:14px; margin: 0 0 1.1rem; }
        .ai-input { border:1px solid #424751; border-radius:9px; min-height:76px; padding:13px; color:#aaa; font-size:13px; position:relative; }
        .ai-send { position:absolute; right:12px; bottom:10px; width:28px; height:28px; display:grid; place-items:center; border-radius:5px; background:var(--blue); color:#fff; }
        .suggestions { display:flex; flex-wrap:wrap; gap:7px; margin-top:14px; }
        .suggestions span { color:#bcbab6; border:1px solid #3b4048; border-radius:7px; padding:7px 9px; font-size:11px; }
        .focus-ring { width:136px; height:136px; margin: 0 auto 12px; border-radius:50%; display:grid; place-items:center; background:conic-gradient(var(--blue) 0 38%, #343940 38% 100%); }
        .focus-ring div { width:112px; height:112px; display:grid; place-items:center; text-align:center; border-radius:50%; background:#12161a; }
        .focus-ring strong { font-size:29px; display:block; }
        .focus-ring small { color:#ccc9c2; }
        .track { display:flex; justify-content:space-between; align-items:center; padding:9px 11px; border-radius:7px; background:#1b1f24; color:#e6e3dd; font-size:12px; }
        .track small { color:#9b9995; }
        .player { display:flex; justify-content:center; gap:23px; margin-top:15px; color:#dedad3; font-size:20px; }
        .live-time { color:var(--blue); font-size:27px; font-weight:700; margin: 2.1rem 0 1.1rem; }
        .live-copy { color:#e2ded7; margin-bottom:1rem; }
        .live-copy small { color:#a5a39e; }
        .exam-count { text-align:center; padding:27px 0 22px; }
        .exam-count span { color:#b8b6b1; font-size:13px; }
        .exam-count strong { display:block; font-size:38px; letter-spacing:4px; margin:13px 0 0; }
        .exam-count small { color:#aaa8a3; letter-spacing:5px; }
        .red-button { display:block; text-align:center; padding:15px; border-radius:8px; background:var(--red); color:white; font-weight:700; font-size:16px; }
        .review-wrap { display:flex; gap:18px; align-items:center; }
        .mastery { width:84px; height:84px; border-radius:50%; display:grid; place-items:center; background:conic-gradient(var(--red) 0 86%, #363a40 86% 100%); position:relative; }
        .mastery::after { content:''; position:absolute; width:67px; height:67px; border-radius:50%; background:#14181d; }
        .mastery span { color:var(--red); z-index:1; font-size:19px; font-weight:700; }
        .review-copy { color:#a9a7a2; font-size:13px; }
        .review-copy b { display:block; color:#e7e4dd; font-size:17px; margin:4px 0; }
        .chart-card { min-height:190px; padding:1.1rem 1.4rem; border:1px solid var(--line); border-radius:16px; background:linear-gradient(145deg,#14181d,#101317); }
        .chart-head { display:flex; justify-content:space-between; align-items:center; }
        .chart-head h3 { margin:0; font-size:20px; }
        .chart-meta { display:flex; gap:24px; align-items:end; }
        .chart-meta strong { font-size:31px; }
        .chart-meta small { color:#aaa8a3; }
        .trend { width:100%; height:84px; margin-top:8px; }
        .page-heading { margin:0 0 .25rem; font-family: Georgia, 'Times New Roman', serif; font-size:48px; letter-spacing:-1.5px; }
        .page-kicker { color:#a8a6a1; margin-bottom:1.5rem; }
        .surface { background:var(--panel); border:1px solid var(--line); border-radius:16px; padding:1.25rem; }
        .surface h3 { margin-top:0; }
        .note { color:#b2b0ab; font-size:14px; }
        @media (max-width: 900px) {
            [data-testid="stSidebar"] { min-width: 76px !important; max-width: 76px !important; }
            [data-testid="stSidebar"] > div:first-child { width:76px !important; }
            .atelier-brand h1 { font-size:0; } .atelier-brand h1::after { content:'H'; font-size:26px; }
            .atelier-profile { display:none; }
            .hero-copy { width:100%; } .bridge { opacity:0.26; width:100%; }
            .topbar { flex-direction:column; align-items:flex-start; }
        }
        </style>
        """,
        unsafe_allow_html=True,
    )


def sidebar() -> None:
    with st.sidebar:
        st.markdown(
            "<div class='atelier-brand'><h1>OMAR SAT360 | SAT Learning &amp; Exam Intelligence</h1><p>Developed for Omar, in Honor of Her Excellency, the Visionary Eng. Ola</p><div class='rule'></div></div>",
            unsafe_allow_html=True,
        )
        for route, icon, label in ROUTES:
            active = route == st.session_state.atelier_route
            button_label = f"{icon}   {label}"
            if st.button(button_label, key=f"nav_{route}", type="primary" if active else "secondary"):
                go_to(route)
        st.markdown(
            "<div class='atelier-profile'><div class='atelier-avatar'>H</div><div>Architect in progress.<br><b>Stay rebellious. Build better.</b></div><div style='margin-left:auto;font-size:22px;'>›</div></div>",
            unsafe_allow_html=True,
        )


def bridge_svg() -> str:
    return """
    <svg class="bridge" viewBox="0 0 750 360" aria-label="Civil engineering bridge sketch" role="img">
      <g class="blueprint" fill="none" stroke-width="1"><path d="M38 42H713M38 92H713M38 142H713M38 192H713M38 242H713M80 24V330M160 24V330M240 24V330M320 24V330M400 24V330M480 24V330M560 24V330M640 24V330"/></g>
      <text x="51" y="45" class="bridge-label">STRUCTURE / 01</text>
      <path class="structure" d="M72 283H689M120 283L205 124L343 283L492 124L646 283"/>
      <path class="structure" d="M205 124V283M492 124V283M72 283L205 124L343 283L492 124L646 283"/>
      <path class="cable" d="M205 124C260 151 300 210 343 283M492 124C441 151 390 210 343 283M205 124L120 283M492 124L646 283"/>
      <path class="accent" d="M72 283H689"/>
      <g fill="#ef4336"><circle cx="205" cy="124" r="8"/><circle cx="492" cy="124" r="8"/></g>
      <path d="M42 310H706" stroke="#777" stroke-width="2" stroke-dasharray="7 8"/>
      <rect x="515" y="232" width="160" height="72" rx="4" fill="#171a1e" stroke="#595b5e"/><path d="M535 283L570 248L605 277L640 241" fill="none" stroke="#cac6bd" stroke-width="2"/>
    </svg>
    """


def topbar() -> None:
    st.markdown(
        """
        <div class="topbar">
          <div class="streak">♨&nbsp; Streak <b>♨ 12 days</b></div>
          <div class="filter-tabs"><span>All</span><span>Math</span><span>Reading</span><span>Writing</span><span>☷</span></div>
        </div>
        """,
        unsafe_allow_html=True,
    )


def home() -> None:
    topbar()
    st.markdown(
        f"""
        <section class="hero">
          <div class="hero-copy">
            <h2>Build the future.</h2>
            <p>Algebra foundations / Day 12</p>
            <div class="goal-row">
              <div class="goal-ring"><span>68%</span></div>
              <div><small>Today's Goal</small><b class="red">7 / 10</b> topics</div>
              <div><small>Focus</small><b>Algebra &amp; Functions</b></div>
            </div>
          </div>
          {bridge_svg()}
        </section>
        """,
        unsafe_allow_html=True,
    )

    st.write("")
    col1, col2, col3, col4 = st.columns(4, gap="small")
    with col1:
        st.markdown(
            """<div class="module-card"><div class="card-title"><h3>◌ &nbsp;AI Coach</h3><span class="chip">Beta</span></div><p class="card-sub">Ask anything. Get clarity.</p><div class="ai-input">What's challenging you today?<span class="ai-send">➤</span></div><div class="suggestions"><span>Explain quadratic formula</span><span>Factor polynomials?</span><span>Real-world use of functions</span></div></div>""",
            unsafe_allow_html=True,
        )
        if st.button("Open AI Coach", key="home_ai", use_container_width=True):
            go_to("AI Coach")
    with col2:
        st.markdown(
            """<div class="module-card"><div class="card-title"><h3>◒ &nbsp;Focus Music</h3><span class="chip">⌘</span></div><div class="focus-ring"><div><strong>45:00</strong><small>Deep Focus</small></div></div><div class="track">Concrete Mindset <small>Lo-Fi Blueprint</small><span>♡</span></div><div class="player">⌁ &nbsp; ◀ &nbsp; ◉ &nbsp; ▶ &nbsp; ↻</div></div>""",
            unsafe_allow_html=True,
        )
        if st.button("Open focus music", key="home_music", use_container_width=True):
            go_to("Focus Music")
    with col3:
        st.markdown(
            """<div class="module-card"><div class="card-title"><h3>◉ &nbsp;Live Studio</h3><span class="chip">Upcoming</span></div><div class="live-time">Today / 18:30</div><div class="live-copy">Bridge Design Studio<br><small>Forces, Loads &amp; Structures</small></div></div>""",
            unsafe_allow_html=True,
        )
        if st.button("Join session", key="home_live", use_container_width=True):
            go_to("Live Studio")
    with col4:
        st.markdown(
            """<div class="module-card"><div class="card-title"><h3>◎ &nbsp;Exam Arena</h3><span class="chip red">SAT Practice</span></div><div class="exam-count"><span>Next challenge starts in</span><strong>03 : 24 : 17</strong><small>HRS &nbsp;&nbsp; MIN &nbsp;&nbsp; SEC</small></div><div class="red-button">Enter build mode &nbsp; ›</div></div>""",
            unsafe_allow_html=True,
        )
        if st.button("Start a timed exam", key="home_exam", use_container_width=True):
            go_to("Exam Arena")

    st.write("")
    review_col, progress_col = st.columns([1, 3], gap="small")
    with review_col:
        st.markdown(
            """<div class="module-card short"><div class="card-title"><h3>▣ &nbsp;Review Vault</h3></div><div class="review-wrap"><div class="mastery"><span>86%</span></div><div class="review-copy">Mastery<b>486 / 560</b>Items reviewed</div></div></div>""",
            unsafe_allow_html=True,
        )
        if st.button("Open Vault", key="home_review", use_container_width=True):
            go_to("Review Vault")
    with progress_col:
        st.markdown(
            """<div class="chart-card"><div class="chart-head"><h3>⌁ &nbsp;Progress</h3><span class="chip">7 days⌄</span></div><div class="chart-meta"><div><small>Score trend</small><strong>1420</strong> <span style="color:#ef4336;font-size:13px;">+120</span><br><small>vs last 7 days</small></div></div><svg class="trend" viewBox="0 0 760 105" preserveAspectRatio="none"><path d="M10 78 L110 63 L210 47 L290 62 L390 33 L470 58 L570 45 L680 26 L750 12" fill="none" stroke="#4d8cff" stroke-width="3"/><g fill="#4d8cff"><circle cx="10" cy="78" r="4"/><circle cx="110" cy="63" r="4"/><circle cx="210" cy="47" r="4"/><circle cx="290" cy="62" r="4"/><circle cx="390" cy="33" r="4"/><circle cx="470" cy="58" r="4"/><circle cx="570" cy="45" r="4"/><circle cx="680" cy="26" r="4"/><circle cx="750" cy="12" r="4"/></g><path d="M0 95H760M0 63H760M0 31H760" stroke="#2a3038" stroke-width="1"/></svg></div>""",
            unsafe_allow_html=True,
        )
        if st.button("See progress details", key="home_progress", use_container_width=True):
            go_to("Progress")


@st.cache_data(show_spinner=False)
def learning_topics(subject: str) -> list[str]:
    filename = DATA_DIR / f"learning_{subject.lower()}_topics.xlsx"
    if not filename.exists():
        return ["Algebra foundations", "Functions", "Problem solving"]
    try:
        frame = pd.read_excel(filename)
        values = frame.iloc[:, 0].dropna().astype(str).tolist()
        return values[:20] or ["Algebra foundations"]
    except Exception:
        return ["Algebra foundations", "Functions", "Problem solving"]


def page_intro(title: str, kicker: str) -> None:
    st.markdown(f"<h1 class='page-heading'>{html.escape(title)}</h1><p class='page-kicker'>{html.escape(kicker)}</p>", unsafe_allow_html=True)


def learning() -> None:
    page_intro("Learning Mode", "Choose a subject, own a concept, then put it under pressure.")
    left, right = st.columns([1, 2], gap="large")
    with left:
        st.markdown("<div class='surface'><h3>Build today’s route</h3>", unsafe_allow_html=True)
        subject = st.selectbox("Subject", ["Math", "English"])
        topic = st.selectbox("Topic", learning_topics(subject))
        difficulty = st.select_slider("Intensity", options=["Warm up", "Focused", "Challenge"], value="Focused")
        if st.button("Start this learning route", type="primary", use_container_width=True):
            st.session_state.atelier_ai_reply = f"Route activated: {topic} / {difficulty}. Start with the model, solve one guided example, then attempt the exit challenge."
        st.markdown("</div>", unsafe_allow_html=True)
    with right:
        st.markdown("<div class='surface'><h3>Concept blueprint</h3><p class='note'>Your lesson appears as a short build sequence: idea → visual model → guided solve → exam-level question.</p><div style='border:1px solid #3a4049;border-radius:12px;padding:22px;margin-top:14px;'><b style='font-size:24px;'>Algebra is a structure.</b><p class='note'>Variables are unknown loads; equations are the balance conditions. Solve by keeping both sides stable.</p><div style='height:5px;background:#ef4336;width:58%;border-radius:99px;'></div></div></div>", unsafe_allow_html=True)
        if st.session_state.atelier_ai_reply:
            st.success(st.session_state.atelier_ai_reply)


def ai_coach() -> None:
    page_intro("AI Coach", "A direct coach for the step you are stuck on — not a wall of generic answers.")
    st.markdown("<div class='surface'><h3>What are you building through?</h3><p class='note'>Ask in your own words. The coach will give a clear plan, the reason it works, and one next move.</p></div>", unsafe_allow_html=True)
    question = st.text_area("Your question", placeholder="Example: Why does moving a term across the equation change its sign?", height=130)
    if st.button("Ask the AI Coach", type="primary"):
        clean_question = question.strip() or "Explain the algebra step."
        st.session_state.atelier_ai_reply = (
            f"Coach response for: “{clean_question}”\n\n"
            "1. Keep the equation balanced: anything you do on one side must happen on the other.\n"
            "2. Move a term by adding its opposite to both sides — that is why its sign appears to change.\n"
            "3. Next move: write one line showing the same operation on both sides before simplifying."
        )
    if st.session_state.atelier_ai_reply:
        st.markdown("<div class='surface'><h3>Coach plan</h3></div>", unsafe_allow_html=True)
        st.info(st.session_state.atelier_ai_reply)


def visual_pad() -> None:
    page_intro("Visual Pad", "Sketch a model, label the forces, or write the working that makes the answer obvious.")
    st.markdown("<div class='surface'><h3>Freehand build board</h3><p class='note'>Draw directly in the pad. Clear it whenever you want a new problem.</p></div>", unsafe_allow_html=True)
    components.html(
        """
        <div style="background:#11151a;border:1px solid #363b43;border-radius:14px;padding:12px;color:#ebe8e1;font-family:Inter,Arial,sans-serif;">
          <div style="display:flex;gap:10px;align-items:center;margin-bottom:10px;"><b>Visual Pad</b><input id="color" type="color" value="#ef4336" style="margin-left:auto;"><button id="clear" style="background:#252b33;color:#eee;border:1px solid #4a515c;border-radius:7px;padding:7px 12px;">Clear</button></div>
          <canvas id="pad" style="width:100%;height:360px;background:#0c0f13;border-radius:9px;touch-action:none;cursor:crosshair;"></canvas>
        </div>
        <script>
        const canvas=document.getElementById('pad'), ctx=canvas.getContext('2d'); let drawing=false;
        function fit(){const r=canvas.getBoundingClientRect(), d=devicePixelRatio||1; canvas.width=r.width*d; canvas.height=r.height*d; ctx.scale(d,d); ctx.lineCap='round';ctx.lineJoin='round';ctx.lineWidth=3;}
        fit(); addEventListener('resize',fit); const point=e=>{const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}};
        canvas.addEventListener('pointerdown',e=>{drawing=true;canvas.setPointerCapture(e.pointerId);const p=point(e);ctx.beginPath();ctx.moveTo(p.x,p.y)});
        canvas.addEventListener('pointermove',e=>{if(!drawing)return;const p=point(e);ctx.strokeStyle=document.getElementById('color').value;ctx.lineTo(p.x,p.y);ctx.stroke()});
        ['pointerup','pointercancel','pointerleave'].forEach(n=>canvas.addEventListener(n,()=>drawing=false));
        document.getElementById('clear').onclick=()=>ctx.clearRect(0,0,canvas.width,canvas.height);
        </script>
        """,
        height=430,
    )


def exam_arena() -> None:
    page_intro("Exam Arena", "Timed pressure, clean feedback, and no wasted motion.")
    if not st.session_state.atelier_exam_started:
        st.markdown("<div class='surface'><h3>Saturday SAT simulation</h3><p class='note'>Math / 20 questions / 35 minutes. The arena records the result and sends misses to your Review Vault.</p></div>", unsafe_allow_html=True)
        if st.button("Enter build mode", type="primary"):
            st.session_state.atelier_exam_started = True
            st.rerun()
        return
    st.markdown("<div class='surface'><span class='chip red'>QUESTION 01 / 20</span><h3 style='margin-top:18px;'>If 3x + 7 = 22, what is the value of x?</h3></div>", unsafe_allow_html=True)
    answer = st.radio("Choose one answer", ["3", "5", "7", "9"], index=None, horizontal=True)
    if st.button("Lock answer", type="primary"):
        if answer == "5":
            st.session_state.atelier_exam_feedback = "Correct. Subtract 7 from both sides, then divide by 3."
            st.session_state.atelier_score += 10
        elif answer:
            st.session_state.atelier_exam_feedback = "Not yet. Keep both sides balanced: 3x = 15, so x = 5. This is now in your Review Vault."
        else:
            st.session_state.atelier_exam_feedback = "Choose an answer before locking it."
    if st.session_state.atelier_exam_feedback:
        st.info(st.session_state.atelier_exam_feedback)


def live_studio() -> None:
    page_intro("Live Studio", "Real coaching when the structure matters most.")
    c1, c2 = st.columns([1, 1], gap="large")
    with c1:
        st.markdown("<div class='surface'><span class='chip'>UPCOMING</span><h3 style='margin-top:16px;'>Today / 18:30</h3><p class='note'>Bridge Design Studio — Forces, loads, and structure through SAT problem solving.</p></div>", unsafe_allow_html=True)
        st.button("Join session at start time", type="primary", use_container_width=True)
    with c2:
        st.markdown("<div class='surface'><h3>Shared studio notes</h3></div>", unsafe_allow_html=True)
        st.session_state.atelier_notes = st.text_area("Notes for the live session", value=st.session_state.atelier_notes, height=165)
        st.caption("Notes stay in this browser session while you move between modules.")


def focus_music() -> None:
    page_intro("Focus Music", "Set a timebox, lower the noise, and stay inside the work.")
    col1, col2 = st.columns([1, 2], gap="large")
    with col1:
        st.markdown("<div class='surface' style='text-align:center;'><h3>Deep Focus</h3><div class='focus-ring'><div><strong>45:00</strong><small>Focus block</small></div></div><p class='note'>Concrete Mindset / Lo-Fi Blueprint</p></div>", unsafe_allow_html=True)
        st.button("Start 45-minute focus", type="primary", use_container_width=True)
    with col2:
        st.markdown("<div class='surface'><h3>Study soundtrack</h3><p class='note'>Paste a YouTube, Spotify, or SoundCloud link to keep your own focus track close to the work.</p></div>", unsafe_allow_html=True)
        url = st.text_input("Music link", placeholder="https://…")
        if url:
            st.success("Focus link saved for this session. Use it in your browser’s media controls while you study.")


def review_vault() -> None:
    page_intro("Review Vault", "Every miss is a future strength if it is revisited with purpose.")
    st.metric("Mastery", f"{st.session_state.atelier_reviewed} / 560", "86% reviewed")
    frame = pd.DataFrame(
        [
            ("Algebra", "Moving terms across an equation", "Review today", "Focused"),
            ("Reading", "Evidence pairing", "Review tomorrow", "Warm up"),
            ("Math", "Function notation", "Review in 2 days", "Challenge"),
        ],
        columns=["Area", "Mistake pattern", "Next review", "Mode"],
    )
    st.dataframe(frame, use_container_width=True, hide_index=True)
    if st.button("Mark next review complete", type="primary"):
        st.session_state.atelier_reviewed += 1
        st.success("Review recorded. The Vault is getting stronger.")


def progress() -> None:
    page_intro("Progress", "A score trend made from real, repeated work.")
    c1, c2, c3 = st.columns(3)
    c1.metric("Current score", st.session_state.atelier_score, "+120")
    c2.metric("Study streak", "12 days", "+3 days")
    c3.metric("Topics closed", "42", "+6 this week")
    chart_data = pd.DataFrame({"Score": [1180, 1210, 1240, 1225, 1290, 1250, 1280, 1330, st.session_state.atelier_score]})
    st.markdown("<div class='surface'><h3>Score trajectory</h3><p class='note'>The line moves when your routine does.</p></div>", unsafe_allow_html=True)
    st.line_chart(chart_data, height=300, color="#4d8cff")


def render_route() -> None:
    route = st.session_state.atelier_route
    views = {
        "Home": home,
        "Learning": learning,
        "AI Coach": ai_coach,
        "Visual Pad": visual_pad,
        "Exam Arena": exam_arena,
        "Live Studio": live_studio,
        "Focus Music": focus_music,
        "Review Vault": review_vault,
        "Progress": progress,
    }
    views[route]()


init_state()
inject_theme()
sidebar()
render_route()
