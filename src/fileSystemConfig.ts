import { get, set, clear } from 'idb-keyval'
import { FileSystemConfig, FileSystemAPIHandle } from '@/Globals'
import globalStore from '@/store'

// The URL contains the websiteLiveHost, calculated at runtime
const loc = window.location
const webLiveHostname = loc.hostname
const websiteLiveHost = `${loc.protocol}//${webLiveHostname}`

export function addLocalFilesystem(handle: FileSystemAPIHandle, key: string | null) {
  const slug = key || 'fs' + (1 + Object.keys(globalStore.state.localFileHandles).length)

  const system: FileSystemConfig = {
    name: handle.name,
    slug: slug,
    description: 'Local folder',
    handle: handle,
    baseURL: '',
  }

  fileSystems.unshift(system)

  // commit to app state
  globalStore.commit('addLocalFileSystem', { key: system.slug, handle: handle })
  // console.log(globalStore.state.localFileHandles)

  // write it out to indexed-db so we have it on next startup
  console.log('WRITING ALL FILE HANDLES')
  set('fs', globalStore.state.localFileHandles)
  return system.slug
}

const fileSystems: FileSystemConfig[] = [
  {
    name: webLiveHostname + ' live folders',
    slug: 'live',
    description: 'Files served using "simwrapper here"',
    baseURL: websiteLiveHost + ':9039/_f_', // e.g. 'http://localhost:9039/_f_',
    hidden: true,
  },
  {
    name: 'Localhost',
    slug: 'local',
    description: 'Files on this computer, shared with "simwrapper serve"',
    baseURL: 'http://localhost:8000',
    thumbnail: '/simwrapper/images/thumb-localfiles.jpg',
  },
  {
    name: 'Public Scenarios',
    slug: 'public',
    description: 'Simulation results from VSP at TU-Berlin',
    baseURL: 'https://svn.vsp.tu-berlin.de/repos/public-svn/matsim/scenarios/countries',
    thumbnail: '/simwrapper/images/thumb-chart.jpg',
    skipList: ['episim/battery'],
  },
  {
    name: 'RealLabHH',
    slug: 'reallabhh',
    description: 'digital mobility of tomorrow is being tested in a metropolis here and now',
    description_de: 'Digitale Mobilität von morgen im Hier und Jetzt in einer Metropole',
    baseURL: 'https://svn.vsp.tu-berlin.de/repos/public-svn/matsim/scenarios/countries/de/hamburg/hamburg-v2/hamburg-v2.2/viz',
    thumbnail: '/simwrapper/images/thumb-localfiles.jpg',
  },
  {
    name: 'Sample Runs',
    slug: 'sample-runs',
    description: 'Pre-built dashboards for exploration',
    thumbnail: 'images/thumb-localfiles.jpg',
    baseURL: 'https://svn.vsp.tu-berlin.de/repos/public-svn/shared/billy/simwrapper/sample-data',
  },
  {
    name: 'KoMoDnext',
    slug: 'komodnext',
    description: 'Automated driving in the digital test field, Düsseldorf',
    description_de: 'Automatisiertes Fahren im digitalen Testfeld Düsseldorf',
    baseURL:
      'https://svn.vsp.tu-berlin.de/repos/public-svn/matsim/scenarios/countries/de/duesseldorf/projects/komodnext/website',
    thumbnail: '/simwrapper/images/thumb-localfiles.jpg',
    hidden: true,
  },
]

for (let port = 8000; port < 8500; port++) {
  fileSystems.push({
    name: 'Localhost ' + port,
    slug: `${port}`,
    description: 'Localhost ' + port,
    description_de: 'Localhost ' + port,
    baseURL: 'http://localhost:' + port,
    hidden: true,
  })
}

for (let port = 9039; port < 9100; port++) {
  fileSystems.push({
    name: webLiveHostname + port,
    slug: `${port}`,
    description: webLiveHostname + port,
    description_de: webLiveHostname + port,
    baseURL: websiteLiveHost + `:${port}/_f_`, // e.g. 'http://localhost:9039/_f_',
    hidden: true,
  })
}

export default fileSystems
