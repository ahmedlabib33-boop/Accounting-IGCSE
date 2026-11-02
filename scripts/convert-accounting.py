"""One-time conversion of the assigned local app; original snapshot is in backups/."""
from pathlib import Path
import json
root=Path(__file__).resolve().parent.parent
p=root/'app/page.js'
s=p.read_text(encoding='utf-8')
# Preserve the existing screen hierarchy, CSS classes and component design.
replacements={
 'OMAR SAT360 | SAT Learning &amp; Exam Intelligence':'ACCOUNTING 0452 | Learning &amp; Exam Intelligence',
 'OMAR SAT360 | SAT Learning & Exam Intelligence':'ACCOUNTING 0452 | Learning & Exam Intelligence',
 'Developed for Omar, in Honor of Her Excellency, the Visionary Eng. Ola':'Cambridge IGCSE Accounting · 2027–2029 · Independent study app',
 'omar-sat360':'accounting-0452', 'OMAR SAT360':'Accounting 0452', 'OMAR-SAT360-BRIDGE-STUDIO':'ACCOUNTING-0452-STUDY-STUDIO',
 'Omar’s SAT foundation':'Your accounting foundation', 'Engineering mindset':'Accounting confidence',
 'Omar’s Math, Reading, and Writing work':'Cambridge IGCSE Accounting (0452) work',
 'Omar SAT mock-exam results':'Accounting 0452 mock-exam results',
 'Omar SAT mock exam':'Accounting 0452 original mock exam', 'Omar SAT mock-exam bank':'Accounting 0452 original mock-exam bank',
 'Omar lesson banks':'Accounting 0452 lesson bank', 'Omar’s lesson bank':'Accounting 0452 lesson bank',
 'Omar’s collaborator':'your study partner', 'Math &amp; SAT Intelligence':'Accounting &amp; Exam Intelligence',
 'real SAT practice':'syllabus-aligned accounting practice', 'SAT Practice':'0452 Practice',
 'SAT attempt progress chart':'Accounting attempt progress chart',
 'Explain quadratic formula':'Explain double entry', 'How to factor polynomials?':'How do I prepare a trial balance?',
 'How do I improve SAT Reading?':'How do I reconcile a bank statement?',
 'How do I find evidence in SAT Reading?':'How do I calculate gross profit margin?',
 'How do I revise a sentence boundary?':'How do I prepare a partnership appropriation account?',
 'Ask about algebra, a reading passage, or your exam plan…':'Ask about double entry, financial statements, ratios, or your exam plan…',
 'for the SAT. Formula or rule:':'for Cambridge IGCSE Accounting (0452), 2027–2029. Formula or rule:',
 'SAT PRACTICE':'0452 PRACTICE', 'Math, Reading, and Writing':'Accounting',
 'Choose an Omar':'Choose an Accounting', 'SAT rescue':'Accounting revision',
 'Bridge Design Studio':'Accounting Study Studio', 'Bridge Studio':'Study Studio',
 'Forces, loads &amp; structures':'Transactions, statements &amp; decisions',
 'engineering idea':'accounting workings', 'Architect in progress.':'Accountant in progress.',
 'Math & SAT Intelligence':'Accounting & Exam Intelligence',
 '"Math"':'"Accounting"', '["Accounting", "English"]':'["Accounting"]', '["All", "Accounting", "English"]':'["All", "Accounting"]',
 'Math</button>':'Accounting</button>', 'Reading</button>':'Statements</button>', 'Writing</button>':'Ratios</button>',
 }
for a,b in replacements.items(): s=s.replace(a,b)
s=s.replace('/* Removed server-backed Live Studio implementation.', '/* Removed server-backed Live Studio implementation.')
# Remove the already-commented, inactive Supabase implementation to avoid ambiguity.
start=s.index('/* Removed server-backed Live Studio implementation.')
end=s.index('function liveRoomSlug',start)
s=s[:start]+s[end:]
s=s.replace('.filter((item) => item.lessonTitle === lesson?.title).slice(0, 2)', '.filter((item) => item.lessonTitle === lesson?.title)')
s=s.replace('matchingPractice[practiceIndex] || data?.practice?.[practiceIndex] || null','matchingPractice[practiceIndex] || null')
s=s.replace('setResult(item); markComplete();','setResult(item); if (item.correct) markComplete();')
s=s.replace('<p className="lesson-explanation">{lesson.explanation}</p>', '<p className="lesson-explanation">{lesson.explanation}</p><p className="lesson-source">Syllabus section {lesson.section} · <a href="https://www.cambridgeinternational.org/Images/718141-2027-2029-syllabus.pdf" target="_blank" rel="noreferrer">Official Cambridge syllabus</a></p>')
s=s.replace('function ExamPage(', 'function MultipleChoiceExam(')
s=s.replace('55 * 60','90 * 60')
s=s.replace('const [loading, setLoading] = useState(false);\n  useEffect(() => { let active = true; setExams', 'const [loading, setLoading] = useState(false);\n  const submitGuard = useRef(false);\n  useEffect(() => { let active = true; setExams')
s=s.replace('setSeconds(90 * 60); fetchJson', 'setSeconds(90 * 60); submitGuard.current = false; fetchJson')
s=s.replace('if (!questions.length) return;\n    setLoading(true);', 'if (!questions.length || submitGuard.current) return;\n    submitGuard.current = true;\n    setLoading(true);')
s=s.replace('examId, score: graded.score', 'examId, paper: 1, marking: "Automatic", score: graded.score')
s=s.replace('} catch (requestError) { setError(requestError.message); } finally { setLoading(false); }\n  };\n  return <FeaturePage eyebrow="Exam arena"', '} catch (requestError) { submitGuard.current = false; setError(requestError.message); } finally { setLoading(false); }\n  };\n  const submitRef = useRef(submit);\n  submitRef.current = submit;\n  useEffect(() => { if (seconds === 0 && questions.length && !result && !loading && !error) submitRef.current(); }, [seconds, questions.length, result, loading, error]);\n  return <FeaturePage eyebrow="Exam arena"')
s=s.replace('setSeconds(90 * 60); }}>Try this exam again','setSeconds(90 * 60); submitGuard.current = false; }}>Try this exam again')
s=s.replace('Choose an Accounting 0452 original mock exam, answer one question at a time, and save the result in this browser.', 'Paper 1 · 40 questions · 90 minutes · 40 marks · 30% weighting. Original practice sampled from the lesson bank; not an official Cambridge paper.')
# Replace unrelated revision deck downloads with verified official source links.
start=s.index('<div className="revision-downloads">')
end=s.index('</div></div><div className="vault-filter">',start)
s=s[:start]+'''<div className="revision-downloads"><span>Accounting 0452 · 2027–2029</span><a href="https://www.cambridgeinternational.org/Images/718141-2027-2029-syllabus.pdf" target="_blank" rel="noreferrer">Official syllabus &amp; ratio formulas <Icon name="external" size={16}/></a><a href="https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-accounting-0452/past-papers/" target="_blank" rel="noreferrer">Official papers &amp; mark schemes <Icon name="external" size={16}/></a><a href="/accounting-revision.html" target="_blank" rel="noreferrer">Accounting revision handbook <Icon name="external" size={16}/></a>'''+s[end:]
# Accurate lesson progress; retain screen structure.
s=s.replace('Math.max(1, completed)} day{completed === 1 ? "" : "s"}', 'completed} lesson{completed === 1 ? "" : "s"}')
s=s.replace('<span>Streak</span>', '<span>Completed</span>')
s=s.replace('Math.min(100, completed * 5)', 'Math.round(completed / '+str(44)+' * 100)')
s=s.replace('Latest score</span><strong>{latest || "—"}', 'Latest score</span><strong>{study.attempts.length ? latest : "—"}')
p.write_text(s,encoding='utf-8')
pkg=json.loads((root/'package.json').read_text())
pkg['name']='accounting-igcse-0452'
for key in ['predev','prebuild','content:build']:pkg['scripts'][key]='node scripts/build-accounting-content.mjs'
pkg['scripts']['content:check']='node scripts/build-accounting-content.mjs --check'
pkg['scripts']['lint']='eslint app scripts/build-accounting-content.mjs data/accounting'
pkg['scripts']['test']='node --test scripts/accounting.test.mjs'
(root/'package.json').write_text(json.dumps(pkg,indent=2)+'\n')
lock=json.loads((root/'package-lock.json').read_text());lock['name']=pkg['name'];lock['packages']['']['name']=pkg['name']
(root/'package-lock.json').write_text(json.dumps(lock,indent=2)+'\n')
layout=root/'app/layout.js';v=layout.read_text();v=v.replace('OMAR SAT360 | SAT Learning & Exam Intelligence','Accounting 0452 | Learning & Exam Intelligence').replace('Developed for Omar, in Honor of Her Excellency, the Visionary Eng. Ola','Independent Cambridge IGCSE Accounting (0452) study app for 2027–2029');layout.write_text(v)
coach=root/'app/api/coach/route.js';v=coach.read_text();a=v.index('const SYSTEM_PROMPT =');b=v.index('\n\nexport async',a)
v=v[:a]+'''const SYSTEM_PROMPT = `You are an independent Cambridge IGCSE Accounting (0452) tutor for exams in 2027–2029. Teach the next useful step using a rule, a worked accounting example and a short check question. Use correct debit/credit terminology and show calculations. Cover bookkeeping, verification, adjustments, financial statements, ratios, concepts, ethics, technology and sustainability. Distinguish cash from profit, capital from revenue and profit allocation from expenses. ROCE uses profit before interest; capital employed for the specified company formula is issued shares plus reserves plus non-current liabilities. Use 365 days for turnover periods. Do not claim Cambridge endorsement or invent official grade thresholds or papers. If uncertain about the syllabus or a marking point, say so and refer to the official syllabus. Keep answers under 250 words unless more detail is requested. This is educational accounting, not personal financial advice.`;'''+v[b:];coach.write_text(v)
ignore=root/'.gitignore';v=ignore.read_text();v+='\nbackups/\napp/_data/accounting-content.json\n';ignore.write_text(v)
print('Converted assigned app screens, metadata, build scripts and coach prompt.')
