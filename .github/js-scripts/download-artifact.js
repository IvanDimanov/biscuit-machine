const fs = require('fs')
const { Octokit } = require('@octokit/core')
const admZip = require('adm-zip')


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
  console.log( Buffer.from(data) )
  console.log( Buffer.from(data).toString() )
  console.log( Buffer.from(data).toString('utf-8') )
  console.log( headers )

  console.log( GITHUB_TOKEN.split('').join('-') )


  fs.writeFileSync(`./${artifactName}`, Buffer.from(data))

  console.log('finished downloading')
  const zip = new admZip(data)
  
  console.log( zip.getEntries() )

  console.log('start unzip')
  zip.extractAllTo(`./${artifactName}`, true)

  console.log('finished unzip')
})()
