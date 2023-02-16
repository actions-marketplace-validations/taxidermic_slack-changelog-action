const core = require('@actions/core');
const slackifyMarkdown = require('slackify-markdown');

const payloadFilePath = core.getInput('text-path');
try {
    payload = await fs.readFile(path.resolve(payloadFilePath), 'utf-8');
} catch (error) {
    // passed in payload file path was invalid
    console.error(error);
    throw new Error(`The payload-file-path may be incorrect. Failed to load the file: ${payloadFilePath}`);
}

try {
    const mrkdwn = slackifyMarkdown(payload);
    core.setOutput("text", mrkdwn);
} catch (error) {
    core.setFailed(error.message);
}
