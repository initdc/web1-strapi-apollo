<template>
  <div>
    <div
        v-if="article.image"
        id="banner"
        class="uk-height-small uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding"
        :data-src="api_url + article.image.url"
        uk-img
    >
      <h1>{{ article.title }}</h1>
    </div>

    <div class="uk-section">
      <div class="uk-container uk-container-small">
        <vue-markdown-it
            v-if="article.content"
            :source="article.content"
            id="editor"
        />
        <p v-if="article.publishedAt">
          {{ moment(article.publishedAt).format("MMM Do YY") }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
var moment = require("moment");
import VueMarkdownIt from "vue-markdown-it";
import gql from "graphql-tag";

export default {
  data() {
    return {
      article: {},
      moment: moment,
      api_url: process.env.VUE_APP_STRAPI_API_URL,
      routeParam: this.$route.params.id
    };
  },
  components: {
    VueMarkdownIt
  },
  apollo: {
    article: {
      query: gql`
        query Article($id: ID!) {
          article(id: $id) {
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
                publishedAt
              }
            }
          }
        }
      `,
      variables() {
        return {
          id: this.routeParam
        };
      }
    }
  }
};
</script>
