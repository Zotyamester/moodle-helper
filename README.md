# Moodle Quiz Helper

This project contains 2+1 companion scripts with the common goal of ~~cheating~~ *efficient problem solving* in Moodle quizes.

## [browserconsole.js](browserconsole.js)

The simplest script you can think of. The only thing it does is extracting the problemset as text from a Moodle quiz.

To get it working: copy-paste it to the browser's console window.

## [moodle-to-llm.js](moodle-to-llm.js)

A variant of [browserconsole.js](#browserconsolejs) which automates the querying of chatbots by piping the extracted questions to the LLM of your choice.

## [helper.py](helper.py)

A Python script that employs similar tactics to [moodle-to-llm.js](#moodle-to-llmjs), but with using a PDF file as a context (`textbook.pdf`).
The problemset shall be in the project root in `questions.txt`.
