const axios = require('axios');
const githubAPI = 'https://api.github.com';
const token = process.env.GITHUB_TOKEN;
const headers = {
  authorization: 'Bearer ' + token,
};

module.exports = async function getArtifactUrl(owner, repo) {
  const { workflows } = await request(
    `/repos/${owner}/${repo}/actions/workflows`
  );
  const buildWorkflows = workflows.filter(
    (workflow) => workflow.name.toLowerCase() === 'build'
  );

  if (buildWorkflows.length === 0) {
    console.error('No workflow called "build" found... 🤷🏻‍♂️');
  }
  const workflowId = buildWorkflows[0].id;

  const { workflow_runs } = await request(
    `/repos/${owner}/${repo}/actions/workflows/${workflowId}/runs`
  );

  const lastRun = workflow_runs.filter(
    (run) => run.status === 'completed' && run.conclusion === 'success'
  )[0];

  const { artifacts } = await request(
    `/repos/${owner}/${repo}/actions/runs/${lastRun.id}/artifacts`
  );
  return artifacts[0].archive_download_url;
};

async function request(target, method = 'GET') {
  const url = githubAPI + target;
  console.log(`Sending ${method} ${url}`);
  const { data } = await axios.request({
    url,
    method,
    headers,
  });
  console.log(`Received ${method} ${url}`, data);
  return data;
}
