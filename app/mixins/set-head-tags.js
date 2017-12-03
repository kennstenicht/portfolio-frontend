import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';
import { set, get } from '@ember/object';

export default Mixin.create({
  assetMap: service(),

  afterModel() {
    this.setHeadTags();
  },

  setHeadTags() {
    let image = get(this, 'assetMap').resolve(get(this, 'metaImage'));
    let headTags = new Array();

    if(get(this, 'metaTitle')) {
      const titleTags = [
        // Title Tag
        {
          type: 'title',
          tagId: 'title-tag',
          content: get(this, 'metaTitle')
        },
        // OG Title
        {
          type: 'meta',
          tagId: 'meta-og-title',
          attrs: {
            property: 'og:title',
            content: get(this, 'metaTitle')
          }
        },
        // Twitter Title
        {
           type: 'meta',
           tagId: 'meta-twitter-title',
           attrs: {
             property: 'twitter:title',
             content: get(this, 'metaTitle')
           }
         }
      ]

      headTags = headTags.concat(titleTags);
    }

    if(get(this, 'metaDescription')) {
      let descriptionTags = [
        // Meta Description
        {
          type: 'meta',
          tagId: 'meta-description',
          attrs: {
            name: 'description',
            content: get(this, 'metaDescription')
          }
        },
        // OG Description
        {
          type: 'meta',
          tagId: 'meta-og-description',
          attrs: {
            property: 'og:description',
            content: get(this, 'metaDescription')
          }
        },
        // Twitter Description
       {
          type: 'meta',
          tagId: 'meta-twitter-description',
          attrs: {
            property: 'twitter:description',
            content: get(this, 'metaDescription')
          }
        }
      ];

      headTags = headTags.concat(descriptionTags);
    }

    if(image) {
      let imageTags = [
        // OG Description
        {
          type: 'meta',
          tagId: 'meta-og-image',
          attrs: {
            property: 'og:image',
            content: 'https://wiedenmann.io' + image
          }
        },
        // Twitter Image
        {
          type: 'meta',
          tagId: 'meta-twitter-image',
          attrs: {
            property: 'twitter:image',
            content: 'https://wiedenmann.io' + image
          }
        }
      ];

      headTags = headTags.concat(imageTags);
    }

    if(get(this, 'metaType') == 'article') {
      let articleTags = [
        // OG Type
        {
          type: 'meta',
          tagId: 'meta-og-type',
          attrs: {
            property: 'og:type',
            content: 'article'
          }
        },
        // Article author
        {
          type: 'meta',
          tagId: 'meta-article-author',
          attrs: {
            property: 'article:author',
            content: 'ag—prop'
          }
        }
      ];

      headTags = headTags.concat(articleTags);
    }

    if(get(this, 'headTags')) {
      headTags = get(this, 'headTags').concat(headTags);
    }
    set(this, 'headTags', headTags);
  }
});
