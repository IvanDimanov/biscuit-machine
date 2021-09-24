const { Octokit } = require('@octokit/core')

const GITHUB_TOKEN = process.argv[2]
const artifactName = process.argv[3]

const {
  GITHUB_REPOSITORY,
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


  const { data, headers } = await octokit.request('GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}', {
    owner,
    repo,
    artifact_id: artifact.id,
    archive_format: 'zip',
  })

  console.log( data )
  console.log( headers )
})()
