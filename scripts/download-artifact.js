const { Octokit } = require('@octokit/core')

const GITHUB_TOKEN = process.argv[2]
const artifactName = process.argv[3]

const {
  GITHUB_REPOSITORY,
  GITHUB_RUN_ID,
  GITHUB_SHA,
} = process.env

;(async () => {
  const octokit = new Octokit({ auth: GITHUB_TOKEN })
  const [owner, repo] = GITHUB_REPOSITORY.split('/')

  const { data: { artifacts } } = await octokit.request('GET /repos/{owner}/{repo}/actions/artifacts', {
    owner,
    repo,
  })

  const artifact = artifacts.find(({ name }) => name === `${artifactName}-${GITHUB_SHA}`)

  console.log( artifact )
})()
