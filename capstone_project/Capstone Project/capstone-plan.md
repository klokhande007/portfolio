# Capstone Project — Jira Ticket Explainer & Grammar Reviewer

## Project Statement

> **This project connects Claude Code to Atlassian (Jira and Confluence) to automate ticket
> documentation. Claude reads each Jira ticket, extracts the useful information, and writes a
> clear explanation and a structured description. Each ticket is then reviewed for grammar
> completeness using a custom RTCCO skill, published as a Confluence page, and summarized in a
> single analysis report. The result is a repeatable, quality-checked workflow that turns thin,
> inconsistent tickets into publish-ready documentation.**

This is capstone-strong because it combines four things you learned: a **connected MCP integration**
(Atlassian), a **reusable skill** (RTCCO grammar review), a **real deliverable** (Confluence pages),
and a **quality report** (the analysis document).

---

## What RTCCO Means

RTCCO is a prompt/skill framework. Every reliable skill has these five parts:

| Letter | Part | In our grammar skill |
|--------|------|----------------------|
| **R** | Role | "Senior technical editor with 10 years of experience" |
| **T** | Task | "Review the text for grammar completeness" |
| **C** | Context | The six review dimensions (grammar, consistency, active voice, terminology, clarity, completeness) |
| **C** | Constraints | Don't rewrite, don't reformat, flag only |
| **O** | Output | A findings table + a readiness verdict |

Your attached `release-notes-review-skill.md` already followed this pattern — it just didn't
label it. See the "Improvements I Made" section at the end.

---

## Step-by-Step: How to Achieve This with Claude

### One-time setup
1. **Confirm the Atlassian MCP connection** is active in Claude Code (run `/mcp` — you should see
   the Atlassian/Jira/Confluence server listed).
2. **Add the grammar skill.** Place `grammar-completeness-skill.md` in your Claude Code skills folder
   (e.g. `.claude/skills/`) so it becomes available as `/grammar-completeness`.

### The workflow (per run)
3. **Extract tickets from Jira.** Ask Claude in plain English, for example:
   > *"List all my Jira tickets in project <KEY> and, for each, pull the Summary, Description, type,
   > status, and acceptance criteria."*

4. **Explain & draft a description for each ticket.** For every ticket, ask Claude to fill a
   **standard template** so output is consistent:
   > *"For each ticket, write: (1) a plain-language Explanation of what it's about, and (2) a
   > structured Description with Problem, Context, Acceptance Criteria, and Doc Impact. Flag any
   > section where the ticket is missing information."*

5. **Run the RTCCO grammar check.** Point the skill at each drafted description:
   > *"Run /grammar-completeness on the description for ticket <KEY>."*
   The skill returns a findings table and a verdict (ready / minor work / major revision).

6. **Publish to Confluence.** Ask Claude to create one page per ticket:
   > *"Create a Confluence page for each ticket in space <SPACE>, titled '<TICKET-KEY> — <Summary>',
   > containing the Explanation, the Description, and the grammar findings table."*

7. **Generate the analysis document** (see next section).

> 💡 Tip: do steps 3–6 for **one ticket first** to confirm it works end to end, then let Claude run
> the whole sprint.

---

## The Analysis Document (like writing-checker's ANALYSIS.md)

Just as `writing-checker` produced an `ANALYSIS.md` of its test results, your project should produce
one **roll-up report** across all tickets. Ask Claude:

> *"Create an `analysis.md` that lists every ticket with its grammar verdict (Ready / Minor / Major),
> the count of issues found, and which tickets were missing information. Add a summary line with the
> totals."*

Suggested shape:

| Ticket | Summary | Grammar Verdict | Issues Found | Missing Info | Confluence Page |
|--------|---------|-----------------|--------------|--------------|-----------------|
| DEMO-1 | Code Description Missing – Documentation | Minor work | 2 | Acceptance criteria | ✅ published |

This single file is your evidence that the workflow ran, was quality-checked, and produced results —
a strong artifact to show in a capstone review.

---

## Do You Need an MCP Server Here? (Your Question)

**Yes — and you already have one.** Two levels:

### 1. MCP is already in your project ✅
The Atlassian connection (Jira + Confluence) **is** an MCP server. That's how Claude reads tickets and
writes pages. So your capstone already demonstrates a working MCP integration — you don't have to build
one from scratch to "count."

### 2. Should you build a *custom* MCP server too? (Optional)
This is where your Module 6 lesson pays off. Remember the **tool vs. skill** distinction:

| | Deterministic **tool** (custom MCP) | AI **skill** (RTCCO) |
|---|---|---|
| Same input → same output? | Yes, always | No, can vary |
| Good for | Objective checks | Judgment calls |
| Example | "Does the ticket have all required fields?" | "Is the grammar clear and complete?" |

➡️ **Grammar quality is a judgment call, so it belongs in a skill — not a deterministic tool.** That's
exactly why the RTCCO **skill** is the right choice here, and it's a great point to make in your writeup.

**If you want to add a custom MCP server anyway** (for extra credit), build a small deterministic one —
like your `writing-checker` — that does an *objective* check the skill can't, for example:
- `check_ticket_fields` → flags tickets missing Summary, Description, or Acceptance Criteria.
- `grade_readability` → reuse the tool you already built, run it on each ticket description.

Then the architecture becomes:
```
Atlassian MCP  → reads tickets / writes Confluence pages   (integration)
Custom MCP     → objective checks (required fields, readability score)  (deterministic tools)
RTCCO skill    → grammar completeness judgment            (AI skill)
Analysis.md    → final roll-up report                     (deliverable)
```
That layered design — integration + deterministic tools + AI skill + a report — is a genuinely
impressive capstone.

---

## Improvements I Made to Your Skill File

Your original `release-notes-review-skill.md` → new `grammar-completeness-skill.md`:

1. **Labeled the RTCCO structure** with clear Role / Task / Context / Constraints / Output headings, so
   it's easy to teach and reuse.
2. **Fixed the broken task line** — *"Review this document at @ARGUMENTS completeness"* became a
   complete sentence: *"Review the text provided at @ARGUMENTS for grammar completeness."*
3. **Retargeted it to grammar completeness** (and to Jira tickets, not just release notes), and swapped
   "User Impact" for a **Completeness** dimension (no fragments, whole ideas) to match the goal.
4. **Cleaned the frontmatter** — replaced the non-standard `compatibility: Only use Model Haiku` with a
   proper `model:` hint and a stronger `description` (which is the "natural query" the client reads to
   decide when to run the skill).
5. **Kept your best parts** — the six-dimension review, the findings table, and the three-way verdict.
