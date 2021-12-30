const { Octokit } = require('@octokit/core')

const GITHUB_TOKEN = process.argv[2]

const {
  GITHUB_REPOSITORY,
  GITHUB_RUN_ID,
  GITHUB_SHA,
} = process.env

;(async () => {
  const octokit = new Octokit({ auth: GITHUB_TOKEN })
  const [owner, repo] = GITHUB_REPOSITORY.split('/')

  const { data } = await octokit.request('GET /repos/{owner}/{repo}/commits/{ref}', {
    owner,
    repo,
    ref: GITHUB_SHA,
  })

console.log( data )

})()
