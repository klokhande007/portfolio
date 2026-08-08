# Steps to Complete the Capstone Project

## Overview

This Capstone project used a custom skill to retrieve Jira tickets, generate TOONS-based documentation drafts, publish the output to Confluence, and create an `analysis.md` report.

---

## Steps

1. Created a `SKILL.md` file in the global `skills` folder.

2. Checked the current directory by running:

   ```bash
   pwd
   ```

3. Connected Atlassian by adding the Atlassian MCP server:

   ```bash
   claude mcp add atlassian --transport sse --url https://mcp.atlassian.com/v1/sse
   ```

   This command adds the Atlassian MCP server so Jira and Confluence can be accessed.

4. Verified that Atlassian was added:

   ```bash
   claude mcp list
   ```

   Or, inside the terminal session:

   ```bash
   /mcp
   ```

   A list is displayed showing the added MCP servers.

5. Reloaded plugins:

   ```bash
   /reload-plugins
   ```

6. Ran the Capstone skill with this instruction:

   ```text
   Use the SKILL.md file for the Capstone skill to process Jira project KiranL_Jira. Select tickets with "Documentation" in the Summary, create TOONS drafts, publish pages under Jira_Tickets in Confluence, and create analysis.md.
   ```

---

## Output Created

### Confluence

Three Confluence pages were created as expected:

1. [SCRUM-9: Release Notes Updates for PD - Documentation - Software Development - Confluence](https://kiranl.atlassian.net/wiki/spaces/SD/pages/3538946/SCRUM-9+Release+Notes+Updates+for+PD+-+Documentation)

2. [SCRUM-10: Patient Banner Updates - Documentation - Software Development - Confluence](https://kiranl.atlassian.net/wiki/spaces/SD/pages/3702785/SCRUM-10+Patient+Banner+Updates+-+Documentation)

3. [SCRUM-11: Code Description Missing - Documentation - Software Development - Confluence](https://kiranl.atlassian.net/wiki/spaces/SD/pages/3670017/SCRUM-11+Code+Description+Missing+-+Documentation)

### Jira

The skill picked the Jira tasks that had **Documentation** in the Summary.

Dashboard link: [For you - Worked on - Jira](https://kiranl.atlassian.net/jira/for-you?continue=https%3A%2F%2Fkiranl.atlassian.net%2Fwelcome%2Fsoftware&tab=workedon)

### Analysis Report

An `analysis.md` file was also created with a summary of the processed tickets and review results.

---

## Result

The Capstone workflow completed successfully. The Jira documentation tickets were selected, TOONS drafts were created, Confluence pages were published, and the analysis report was generated.
