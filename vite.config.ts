import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import graphql from '@rollup/plugin-graphql'

export default defineConfig({
  resolve: {},
  plugins: [vue({}), graphql()]
})
