<template lang="pug">
.text-panel-element(:class="{absolute: hasHeight}")
  .scrollable
    .curate-content.markdown(
      v-if="readmeContent"
      v-html="htmlWithProcessedRelativeImageTags"
    )

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import markdown from 'markdown-it'
import markdownTex from 'markdown-it-texmath'
import katex from 'katex'

import globalStore from '@/store'
import { FileSystemConfig } from '@/Globals'
import HTTPFileSystem from '@/js/HTTPFileSystem'

const mdRenderer = new markdown({
  html: true,
  linkify: true,
  typographer: true,
}).use(markdownTex, {
  engine: katex,
  delimiters: 'dollars',
  katexOptions: { macros: { '\\RR': '\\mathbb{R}' } },
})

export default defineComponent({
  name: 'TextPanel',
  props: {
    fileSystemConfig: { type: Object as PropType<FileSystemConfig>, required: true },
    subfolder: { type: String, required: true },
    files: { type: Array, required: true },
    config: { type: Object as any, required: true },
  },

  data: () => {
    return {
      readmeContent: '',
      hasHeight: false,
    }
  },

  computed: {
    fileApi(): HTTPFileSystem {
      return new HTTPFileSystem(this.fileSystemConfig, globalStore)
    },

    htmlWithProcessedRelativeImageTags() {
      const fixed = this.readmeContent.replace(
        /src="\.(\/.*?)"/g,
        (_, path) => `src="${this.fileSystemConfig.baseURL}/${this.subfolder}/${path}"`
      )
      return fixed
    },
  },

  async mounted() {
    try {
      // if height is defined, honor it. Otherwise, panel will stretch to fit content
      this.hasHeight = !!this.config.height

      if (!this.config.content) {
        const fileApi = new HTTPFileSystem(this.fileSystemConfig)
        const filename = `${this.subfolder}/${this.config.file}`
        const text = await fileApi.getFileText(filename)
        this.readmeContent = mdRenderer.render(text)
      } else {
        this.readmeContent = mdRenderer.render(this.config.content)
      }
    } catch (e: any) {
      console.error({ e })
      let error = '' + e
      if (e.statusText) error = e.statusText

      this.readmeContent = `${this.config.file}: ${error}`
    }

    this.$emit('isLoaded')
  },
})
</script>

<style scoped lang="scss">
@import '@/styles.scss';

.text-panel-element {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.25rem 0.5rem;
}

.text-panel-element.absolute {
  position: absolute;
}

.scrollable {
  overflow: auto;
  height: 100%;
  width: 100%;
}
</style>
