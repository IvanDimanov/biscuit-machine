const { Octokit } = require('@octokit/core')

const GITHUB_TOKEN = process.argv[2]

const {
  GITHUB_REPOSITORY,
  GITHUB_RUN_ID,
} = process.env

;(async () => {
  const octokit = new Octokit({ auth: GITHUB_TOKEN })
  const [owner, repo] = GITHUB_REPOSITORY.split('/')

  const { data } = await octokit.request('GET /repos/{owner}/{repo}/actions/runs/{run_id}', {
    owner,
    repo,
    run_id: GITHUB_RUN_ID,
  })

console.log( data )


  const responseAllArtifacts = await octokit.request('GET /repos/{owner}/{repo}/actions/artifacts', {
    owner,
    repo,
  })

  console.log('    Last 3 saved artifacts')
  console.log('------------------------------')
  console.log(
    responseAllArtifacts.data.artifacts[0],
    responseAllArtifacts.data.artifacts[1],
    responseAllArtifacts.data.artifacts[2],
  )


  const responseRunArtifacts = await octokit.request('GET /repos/{owner}/{repo}/actions/runs/{run_id}/artifacts', {
    owner,
    repo,
    run_id: GITHUB_RUN_ID,
  })

  console.log('    Saved workflow artifacts')
  console.log('--------------------------------')
  console.log(
    responseRunArtifacts.data
  )
})()
