<template>
  <h1>Blog</h1>
  <ul>
    <li v-for="(article, index) in articles.data" :key="index">
      <h2>{{index + 1}}. {{ article.attributes.title }}</h2>
      <img v-if="imgPath(index)" :src="imgPath(index)">
      <p>{{ article.attributes.content }}</p>
    </li>
  </ul>
  <button @click="showMe()">showMe</button>
  <pre>{{ queryValue }}</pre>
</template>

<script>
import {ref} from 'vue'
import {gql} from "graphql-tag";

export default {
  name: "Index",
  components: {},
  apollo: {
    articles: gql`
      query Articles {
        articles {
          data {
            id
            attributes {
              title
              content
              image {
                data {
                  id
                  attributes {
                    url
                  }
                }
              }
              category{
                data{
                  attributes{
                    name
                  }
                }
              }
            }
          }
        }
      }
    `
  },
  setup() {
    let queryValue = ref('')

    return {
      queryValue
    }
  },
  computed: {
  },
  methods: {
    showMe() {
      console.log(this.articles)
      this.queryValue = this.articles

      // const {data} = this.articles
      // const {id, attributes} = data[0]
      // const {image} = attributes
      // this.image = image
      // console.log(attributes)
    },
    imgPath(i) {
      // console.log(i)
      if (this.articles) {
        const baseURL = "//localhost:1337"

        const {data: articlesData} = this.articles
        const {attributes} = articlesData[i]
        // console.log(attributes)
        const {image} = attributes
        const {data: imageData} = image
        if (imageData.length > 0) {
          const {attributes: imageAttr} = imageData[0]
          const {url} = imageAttr
          return baseURL + url
        }
        return undefined
      }
      return undefined
    }
  }
}

</script>

<style scoped>

</style>
