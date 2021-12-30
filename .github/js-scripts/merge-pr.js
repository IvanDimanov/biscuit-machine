const { Octokit } = require('@octokit/core')

const GITHUB_TOKEN = process.argv[2]
const PR_NUMBER = process.argv[3]

const {
  GITHUB_REPOSITORY,
  GITHUB_RUN_ID,
} = process.env

;(async () => {
  const octokit = new Octokit({ auth: GITHUB_TOKEN })
  const [owner, repo] = GITHUB_REPOSITORY.split('/')

  const { data } = await octokit.request('PUT /repos/{owner}/{repo}/pulls/{pull_number}/merge', {
    owner,
    repo,
    pull_number: PR_NUMBER,
  })

console.log( data )

})()
