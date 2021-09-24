const { Octokit } = require('@octokit/core')
const admZip = require('adm-zip')


const GITHUB_TOKEN = process.argv[2]
const artifactName = process.argv[3]


const {
  GITHUB_SERVER_URL,
  GITHUB_REPOSITORY,
  GITHUB_SHA,
} = process.env

const archiveFormat = 'zip'


;(async () => {
  const octokit = new Octokit({ auth: GITHUB_TOKEN })
  const [owner, repo] = GITHUB_REPOSITORY.split('/')

  const { data: { artifacts } } = await octokit.request('GET /repos/{owner}/{repo}/actions/artifacts', {
    owner,
    repo,
  })

  const artifact = artifacts.find(({ name }) => name === `${artifactName}-${GITHUB_SHA}`)

  const { data } = await octokit.request('GET /repos/{owner}/{repo}/actions/artifacts/{artifact_id}/{archive_format}', {
    owner,
    repo,
    artifact_id: artifact.id,
    archive_format: archiveFormat,
  })


  let runId = ''
  let failedTests = ''

  const zip = new admZip(Buffer.from(data))
  zip.getEntries().forEach((zipEntry) => {
    if (zipEntry.entryName === 'failedRun.txt') {
      const content = zipEntry.getData().toString('utf8')
      runId = content.split('=')[1].trim()
    }

    if (zipEntry.entryName === 'failedTests.txt') {
      const content = zipEntry.getData().toString('utf8')
      failedTests = content.split('\n').join(', ')
    }
  })

  console.log('runId =', [runId])
  console.log('failedTests =', [failedTests])


  const runResponse = await octokit.request('GET /repos/{owner}/{repo}/actions/runs/{run_id}', {
    owner,
    repo,
    run_id: runId,
  })


  const buildArtifactName = `build-${GITHUB_SHA}`
  const buildArtifact = artifacts.find(({ name }) => name === buildArtifactName)
  const suiteId = runResponse.data.check_suite_url.split('/').pop()

  console.log( buildArtifactName )
  console.log( `${GITHUB_SERVER_URL}/${GITHUB_REPOSITORY}/suites/${suiteId}/artifacts/${buildArtifact}` )

})()
