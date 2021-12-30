const { Octokit } = require('@octokit/core')

const GITHUB_TOKEN = process.argv[2]
const WORKFLOW_ID = process.argv[3]

const {
  GITHUB_REPOSITORY,
  GITHUB_RUN_ID,
} = process.env

;(async () => {
  const octokit = new Octokit({ auth: GITHUB_TOKEN })
  const [owner, repo] = GITHUB_REPOSITORY.split('/')

  /**
   * `GITHUB_TOKEN` is associated with bot user "github-actions".
   * When GitHub user "github-actions" merge a PR
   * then no workflows are triggered (even if the workflows track `pull_request` and `push`).
   *
   * That's why we need to manually trigger a workflow of interest.
   **/
  const { data } = await octokit.request('POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches', {
    owner,
    repo,
    workflow_id: WORKFLOW_ID,
  })

  console.log(' Trigger workflow response ')
  console.log(data)
  console.log(' ')
})()
