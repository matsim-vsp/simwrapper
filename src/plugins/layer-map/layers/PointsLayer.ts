import { Deck } from '@deck.gl/core'
import { GeoJsonLayer } from '@deck.gl/layers'
import ColorString from 'color-string'

import globalStore from '@/store'
import {
  DataTable,
  DataTableColumn,
  DataType,
  FileSystemConfig,
  VisualizationPlugin,
  DEFAULT_PROJECTION,
  REACT_VIEW_HANDLES,
  Status,
} from '@/Globals'

import HTTPFileSystem from '@/js/HTTPFileSystem'
import DashboardDataManager, { FilterDefinition, checkFilterValue } from '@/js/DashboardDataManager'
import { CircleRadiusDefinition } from '@/components/viz-configurator/CircleRadius.vue'
import { FillColorDefinition } from '@/components/viz-configurator/FillColors.vue'
import { DatasetDefinition } from '@/components/viz-configurator/AddDatasets.vue'
import LegendStore from '@/js/LegendStore'
import Coords from '@/js/Coords'

import BaseLayer from './BaseLayer'
import LayerConfig from './PointsLayerConfig.vue'

interface DeckObject {
  index: number
  target: number[]
  data: any
}

export default class PointsLayer extends BaseLayer {
  features: any[]
  datamanager: DashboardDataManager
  datasets: { [id: string]: DataTable }
  error: string
  layerOptions: any
  key: number

  constructor(
    systemProps: {
      configFromDashboard: any
      datamanager: DashboardDataManager
      datasets: { [id: string]: DataTable }
      root: string
      subfolder: string
      thumbnail: boolean
      yamlConfig: string
      emitter: any
    },
    layerOptions: any
  ) {
    super(systemProps)
    this.key = Math.random() * 1e12
    this.datamanager = systemProps.datamanager
    this.datasets = systemProps.datasets
    this.features = []
    this.layerOptions = layerOptions
    this.error = ''
    this.assembleData()
  }

  getKey() {
    return this.key
  }

  configPanel() {
    return LayerConfig
  }

  updateConfig(options: any) {
    console.log('I GOT IT!', options)
    this.layerOptions = options

    // we're done if options set to 'delete'
    // system will remove this panel automatically
    if (options === 'delete') return

    try {
      this.assembleData()
    } catch (e) {
      console.error(e)
      this.features = []
      this.error = '' + e
    }
  }

  guessInitialParameters() {
    // if we already have a longitude the user has tried to give us something.
    if (this.layerOptions.lon) return

    // if there's just one dataset, maybe it has *lon and *lat columns
    const keys = Object.keys(this.datasets)
    if (keys.length == 1) {
      const dataset = this.datasets[keys[0]]
      const columns = Object.keys(dataset)
      const lon = columns.filter(c => c.toLocaleLowerCase().endsWith('lon'))
      const lat = columns.filter(c => c.toLocaleLowerCase().endsWith('lat'))
      if (lon.length && lat.length) {
        this.layerOptions.lon = `${keys[0]}:${lon[0]}`
        this.layerOptions.lat = `${keys[0]}:${lat[0]}`
      }
    }
  }

  assembleData() {
    // data should already be loaded before this layer is mounted

    this.error = ''

    this.guessInitialParameters()

    // position
    const datasetKey = this.layerOptions.lon?.substring(0, this.layerOptions.lon.indexOf(':'))
    const lonCol = this.layerOptions.lon?.substring(1 + this.layerOptions.lon.indexOf(':'))
    const latCol = this.layerOptions.lat?.substring(1 + this.layerOptions.lat.indexOf(':'))
    const dataset = this.datasets[datasetKey]

    try {
      if (!dataset) throw Error(`Point layer cannot load data, are columns correct?`)

      if (!(lonCol in dataset))
        throw Error(`Dataset '${datasetKey}' does not contain column '${lonCol}'`)

      if (!(latCol in dataset))
        throw Error(`Dataset '${datasetKey}' does not contain column '${latCol}'`)
    } catch (e) {
      this.features = []
      return
    }

    const lon = dataset[lonCol].values
    const lat = dataset[latCol].values

    const ignore = ['EPSG:4326', '4326', 'WGS84']

    // projections
    let projection = this.layerOptions.projection || 'WGS84'
    if (Number.isFinite(parseInt(projection))) projection = 'EPSG:' + projection

    let wgs84
    if (this.layerOptions.projection && !(this.layerOptions.projection in ignore)) {
      wgs84 = new Float32Array(lon.length * 2)
      lon.forEach((_: any, i: number) => {
        const ll = Coords.toLngLat(projection, [lon[i], lat[i]])
        wgs84[i * 2] = ll[0]
        wgs84[i * 2 + 1] = ll[1]
      })
      console.log({ wgs84 })
    }

    // radius
    let radius = new Float32Array(lon.length).fill(1) as any

    try {
      const radiusKey = this.layerOptions.radius?.substring(
        0,
        this.layerOptions.radius.indexOf(':')
      )
      const radiusSpec = this.layerOptions.radius?.substring(
        1 + this.layerOptions.radius.indexOf(':')
      )
      if (radiusKey && radiusSpec in this.datasets[radiusKey]) {
        radius = this.datasets[radiusKey][radiusSpec].values
      }
    } catch (e) {
      console.error(e)
    }

    // color
    let color = new Array(lon.length).fill('#33f1b3') as any

    if (typeof this.layerOptions.color == 'string') {
      const colorKey = this.layerOptions.color.substring(0, this.layerOptions.color.indexOf(':'))
      const colorCol = this.layerOptions.color.substring(1 + this.layerOptions.color.indexOf(':'))
      if (colorKey && colorCol in this.datasets[colorKey]) {
        color = this.datasets[colorKey][colorCol].values
      }
    }

    // build geojson
    this.features = []

    for (let i = 0; i < lon.length; i++) {
      const c = ColorString.get.rgb(color[i])
      this.features.push({
        geometry: {
          type: 'Point',
          coordinates: wgs84 ? wgs84.subarray(i * 2, i * 2 + 2) : [lon[i], lat[i]],
        },
        properties: { radius: radius[i], color: c ? c.slice(0, 3) : [64, 64, 64, 64] },
      })
    }
    console.log({ features: this.features })
  }

  deckLayer() {
    const getMapBounds = (viewport: any) => {
      const bounds = viewport.getBounds()
      return {
        west: bounds[0][0],
        south: bounds[0][1],
        east: bounds[1][0],
        north: bounds[1][1],
      }
    }

    if (this.error) throw Error(this.error)

    return new GeoJsonLayer({
      id: 'pointLayer-' + Math.random() * 1e12,
      data: this.features,
      getFillColor: (d: any) => d.properties.color,
      getPointRadius: (d: any) => d.properties.radius,
      stroked: false,
      filled: true,
      autoHighlight: true,
      highlightColor: [255, 0, 224],
      opacity: 1.0,
      pickable: true,
      pointRadiusUnits: 'pixels',
      // pointRadiusMinPixels: 2,
      // pointRadiusMaxPixels: 50,
      // useDevicePixels: isTakingScreenshot,

      // updateTriggers: {
      //   getFillColor: fillColors,
      //   getPointRadius: pointRadii,
      // },
      transitions: {
        getFillColor: 300,
        getPointRadius: 300,
      },
      parameters: { depthTest: false },
      glOptions: {
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
        preserveDrawingBuffer: true,
        fp64: false,
      },
      // filter shapes
      // extensions: [new DataFilterExtension({ filterSize: 1 })],
      // filterRange: [0, 1], // set filter to -1 to filter element out
      // getFilterValue: (_: any, o: DeckObject) => {
      //   return featureFilter[o.index]
      // },
    }) as any
  }
}
